import {
  buildContactSummary,
  buildWhatsAppUrl,
  isContactService,
  validateContact,
} from "@/composables/contact/contactHelpers";
import type { ContactField, ContactValues } from "@/composables/contact/types";
const fields: ContactField[] = [
  "name",
  "phone",
  "service",
  "petName",
  "message",
  "consent",
];
type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
const control = (
  form: HTMLFormElement,
  name: ContactField,
): FormControl | null => {
  const element = form.elements.namedItem(name);
  return element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
    ? element
    : null;
};
const readValues = (form: HTMLFormElement): ContactValues => {
  const data = new FormData(form);
  const text = (name: ContactField): string => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  return {
    name: text("name"),
    phone: text("phone"),
    service: text("service"),
    petName: text("petName"),
    message: text("message"),
    consent: data.has("consent"),
  };
};
export const initContact = (): (() => void) => {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const review = document.querySelector<HTMLElement>("#contact-review");
  const summary = document.querySelector<HTMLElement>("#contact-summary");
  const whatsapp =
    document.querySelector<HTMLAnchorElement>("#contact-whatsapp");
  const edit = document.querySelector<HTMLButtonElement>("[data-edit-request]");
  const status = document.querySelector<HTMLElement>("#contact-status");
  if (
    !form ||
    !review ||
    !summary ||
    !whatsapp ||
    !edit ||
    !status ||
    form.dataset.contactReady === "true"
  )
    return () => {};
  form.dataset.contactReady = "true";
  const submit = form.querySelector<HTMLButtonElement>("[data-contact-submit]");
  const initialService = new URLSearchParams(window.location.search).get(
    "servicio",
  );
  const service = control(form, "service");
  if (initialService && isContactService(initialService) && service)
    service.value = initialService;
  const clearValidity = (event: Event) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement
    )
      event.target.setCustomValidity("");
    status.textContent = "";
  };
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    fields.forEach((field) => control(form, field)?.setCustomValidity(""));
    if (!form.reportValidity()) return;
    const result = validateContact(readValues(form));
    if (!result.valid) {
      fields.forEach((field) => {
        const error = result.errors[field];
        if (error) control(form, field)?.setCustomValidity(error);
      });
      const first = fields.find((field) => result.errors[field]);
      status.textContent = first
        ? (result.errors[first] ?? "Revisa tu solicitud.")
        : "Revisa tu solicitud.";
      if (first) control(form, first)?.focus();
      form.reportValidity();
      return;
    }
    const url = buildWhatsAppUrl(form.dataset.whatsapp ?? "", result.request);
    if (!url) {
      status.textContent =
        "No se pudo preparar WhatsApp. Puedes usar el teléfono de contacto del hospital.";
      return;
    }
    summary.textContent = buildContactSummary(result.request);
    whatsapp.href = url;
    form.hidden = true;
    review.hidden = false;
    review.setAttribute("tabindex", "-1");
    review.setAttribute("role", "region");
    review.setAttribute("aria-label", "Revisión de tu solicitud");
    status.textContent =
      "Revisa tu solicitud antes de continuar en WhatsApp. Aún no se ha enviado ni confirmado una cita.";
    review.focus();
  };
  const onEdit = () => {
    review.hidden = true;
    form.hidden = false;
    whatsapp.removeAttribute("href");
    status.textContent = "Puedes editar tu solicitud antes de continuar.";
    control(form, "name")?.focus();
  };
  form.addEventListener("submit", onSubmit);
  form.addEventListener("input", clearValidity);
  form.addEventListener("change", clearValidity);
  edit.addEventListener("click", onEdit);
  submit?.removeAttribute("disabled");
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("input", clearValidity);
    form.removeEventListener("change", clearValidity);
    edit.removeEventListener("click", onEdit);
    submit?.setAttribute("disabled", "");
    delete form.dataset.contactReady;
  };
};

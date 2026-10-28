import type {
  ContactErrors,
  ContactRequest,
  ContactService,
  ContactValidation,
  ContactValues,
} from "@/composables/contact/types";
export const contactServiceLabels: Record<ContactService, string> = {
  urgencias: "Urgencias veterinarias",
  "consulta-general": "Consulta general",
  "consulta-especializada": "Consulta especializada",
  cirugias: "Cirugías general y especializada",
  "anestesia-inhalada": "Anestesia inhalada",
  ecografia: "Ecografía especializada",
  radiografia: "Radiografía",
  laboratorio: "Laboratorio",
  hospitalizacion: "Hospitalización",
  "hospitalizacion-virales": "Hospitalización de pacientes virales",
  "medicina-preventiva": "Medicina preventiva",
  farmacia: "Farmacia veterinaria",
};
export const isContactService = (value: string): value is ContactService =>
  Object.hasOwn(contactServiceLabels, value);
const cleanLine = (value: string): string => value.trim().replace(/\s+/g, " ");
export const validateContact = (values: ContactValues): ContactValidation => {
  const errors: ContactErrors = {};
  const name = cleanLine(values.name);
  const phone = cleanLine(values.phone);
  const petName = cleanLine(values.petName);
  const message = values.message.trim();
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || name.length > 80)
    errors.name = "Escribe tu nombre entre 2 y 80 caracteres.";
  if (
    !/^\+?[\d\s().-]+$/.test(phone) ||
    digits.length < 7 ||
    digits.length > 15
  )
    errors.phone = "Escribe un teléfono válido de 7 a 15 dígitos.";
  if (!isContactService(values.service))
    errors.service = "Selecciona uno de los servicios disponibles.";
  if (petName.length > 80)
    errors.petName =
      "El nombre de tu mascota debe tener como máximo 80 caracteres.";
  if (message.length > 1200)
    errors.message = "El mensaje debe tener como máximo 1200 caracteres.";
  if (!values.consent)
    errors.consent = "Confirma tu autorización antes de preparar la solicitud.";
  if (Object.keys(errors).length || !isContactService(values.service))
    return { valid: false, request: null, errors };
  return {
    valid: true,
    request: {
      name,
      phone,
      service: values.service,
      petName,
      message,
      consent: true,
    },
    errors,
  };
};
export const buildContactSummary = (request: ContactRequest): string =>
  [
    `Nombre: ${request.name}`,
    `Teléfono: ${request.phone}`,
    `Servicio de interés: ${contactServiceLabels[request.service]}`,
    request.petName ? `Nombre de la mascota: ${request.petName}` : "",
    request.message ? `Mensaje: ${request.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
export const buildWhatsAppUrl = (
  destination: string,
  request: ContactRequest,
): string | null => {
  const phone = destination.replace(/^\+/, "");
  if (!/^\d{10,15}$/.test(phone)) return null;
  const message = `Hola, Hospital Veterinario de Santa Mónica. Quisiera comunicarme sobre este servicio.\n\n${buildContactSummary(request)}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

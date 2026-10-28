import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildContactSummary,
  buildWhatsAppUrl,
  contactServiceLabels,
  isContactService,
  validateContact,
} from "./contactHelpers.ts";
import type {
  ContactRequest,
  ContactValues,
} from "@/composables/contact/types";
const valid: ContactValues = {
  name: " Ana María ",
  phone: "+57 321 555 1234",
  service: "consulta-general",
  petName: "Luna",
  message: "Quisiera conocer el servicio.",
  consent: true,
};
const request = (): ContactRequest => {
  const result = validateContact(valid);
  if (!result.valid) throw new Error("La solicitud de prueba debe ser válida");
  return result.request;
};
test("normaliza campos sin inventar nombres ni datos de la mascota", () => {
  const value = request();
  assert.equal(value.name, "Ana María");
  assert.equal(value.petName, "Luna");
  const without = validateContact({ ...valid, petName: "", message: "" });
  assert.equal(without.valid, true);
  if (without.valid) {
    const summary = buildContactSummary(without.request);
    assert.equal(summary.includes("Nombre de la mascota:"), false);
    assert.equal(summary.includes("Mensaje:"), false);
  }
});
test("valida nombre, teléfono, servicio y consentimiento obligatorios", () => {
  const result = validateContact({
    ...valid,
    name: "",
    phone: "abc",
    service: "inventado",
    consent: false,
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.service);
  assert.ok(result.errors.consent);
});
test("admite exactamente los doce servicios verificados y rechaza claves de prototipo", () => {
  assert.equal(Object.keys(contactServiceLabels).length, 12);
  for (const service of Object.keys(contactServiceLabels))
    assert.equal(validateContact({ ...valid, service }).valid, true);
  assert.equal(isContactService("__proto__"), false);
  assert.equal(isContactService("toString"), false);
});
test("limita la longitud de teléfono, nombre, mascota y mensaje", () => {
  const result = validateContact({
    ...valid,
    name: "a".repeat(81),
    phone: "1234567890123456",
    petName: "a".repeat(81),
    message: "a".repeat(1201),
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.petName);
  assert.ok(result.errors.message);
});
test("prepara WhatsApp para el número oficial sin confirmar citas", () => {
  const url = buildWhatsAppUrl("573215665926", request());
  assert.ok(url);
  if (!url) throw new Error("Se esperaba una URL");
  const parsed = new URL(url);
  assert.equal(parsed.origin, "https://wa.me");
  assert.equal(parsed.pathname, "/573215665926");
  const text = parsed.searchParams.get("text") ?? "";
  assert.ok(text.includes("Ana María"));
  assert.ok(text.includes("Consulta general"));
  assert.equal(text.includes("Autorizo"), false);
  assert.equal(text.includes("cita confirmada"), false);
  assert.equal(text.includes("reservada"), false);
});
test("HTML, signos y saltos de línea permanecen como texto codificado", () => {
  const message =
    "Consulta & revisión + <script>alert(1)</script> #mascota\nSin envío automático";
  const url = buildWhatsAppUrl("+573215665926", { ...request(), message });
  if (!url) throw new Error("Se esperaba una URL");
  const parsed = new URL(url);
  assert.deepEqual([...parsed.searchParams.keys()], ["text"]);
  assert.ok(parsed.searchParams.get("text")?.includes(message));
});
test("destinos inválidos nunca producen un enlace navegable", () => {
  for (const destination of [
    "javascript:alert(1)",
    "123",
    "573215665926?text=otro",
    "https://example.com",
    "573215665926&x=1",
  ])
    assert.equal(buildWhatsAppUrl(destination, request()), null);
});

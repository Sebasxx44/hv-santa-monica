export type ContactService =
  | "urgencias"
  | "consulta-general"
  | "consulta-especializada"
  | "cirugias"
  | "anestesia-inhalada"
  | "ecografia"
  | "radiografia"
  | "laboratorio"
  | "hospitalizacion"
  | "hospitalizacion-virales"
  | "medicina-preventiva"
  | "farmacia";
export interface ContactValues {
  name: string;
  phone: string;
  service: string;
  petName: string;
  message: string;
  consent: boolean;
}
export interface ContactRequest {
  name: string;
  phone: string;
  service: ContactService;
  petName: string;
  message: string;
  consent: true;
}
export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactValidation =
  | { valid: true; request: ContactRequest; errors: ContactErrors }
  | { valid: false; request: null; errors: ContactErrors };

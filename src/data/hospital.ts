export const specialties = [
  "Ortopedista",
  "Neurología",
  "Endocrinología",
  "Oncología",
  "Gastroenterología",
] as const;

export const hospital = {
  name: "Hospital Veterinario de Santa Mónica",
  phone: "3215665926",
  phoneDisplay: "+57 321 566 5926",
  whatsapp: "573215665926",
  whatsappShortUrl: "https://wa.link/oh5zvs",
  email: "servicioalcliente@hvdesantamonica.com.co",
  address: "Carrera 19 # 17 B11 · Santa Mónica",
  city: "Dosquebradas, Risaralda",
  hours: "Atención las 24 horas, los 7 días",
  generalConsultation: "Consulta general sin cita previa, por orden de llegada.",
  mapUrl: "https://maps.app.goo.gl/KQanEHaEQcM6pAbA8",
  facebook: "https://www.facebook.com/hvdesantamonica",
  instagram: "https://www.instagram.com/hvdesantamonica",
  mission: "Brindar atención veterinaria las 24 horas con profesionalismo, calidez y una mirada integral. Trabajamos por el bienestar de cada paciente, con actualización continua, un equipo comprometido y cercanía con las familias que nos confían su cuidado.",
  vision: "Ser un hospital veterinario de referencia en la región por la calidad de la atención, la infraestructura y el trabajo médico. Queremos acompañar a las familias y contribuir a una cultura de cuidado responsable de los animales.",
  specialties,
} as const;

export const services = [
  { id: "urgencias", title: "Urgencias veterinarias", description: "Atención para situaciones urgentes de las mascotas, con servicio disponible las 24 horas.", group: "24h", icon: "pulse" },
  { id: "consulta-general", title: "Consulta general", description: "Valoración veterinaria general sin cita previa. La atención se realiza por orden de llegada.", group: "24h", icon: "stethoscope" },
  { id: "consulta-especializada", title: "Consulta de especialidad", description: "Consulta con ortopedista y en neurología, endocrinología, oncología y gastroenterología. Consulta la disponibilidad con el hospital.", group: "24h", icon: "shield" },
  { id: "cirugias", title: "Cirugía general y especializada", description: "Procedimientos de cirugía general y especializada, de acuerdo con la valoración y las necesidades del paciente.", group: "24h", icon: "plus" },
  { id: "anestesia-inhalada", title: "Anestesia inhalada", description: "Servicio de anestesia inhalada para los procedimientos en los que el equipo médico la indique.", group: "24h", icon: "oxygen" },
  { id: "ecografia", title: "Ecografía especializada", description: "Estudios por imágenes para evaluar órganos internos, gestación y seguimiento, según la indicación veterinaria.", group: "24h", icon: "ultrasound" },
  { id: "radiografia", title: "Radiografía", description: "Apoyo por imágenes para valorar huesos, articulaciones, tórax y abdomen, de acuerdo con cada caso.", group: "7dias", icon: "scan" },
  { id: "laboratorio", title: "Laboratorio", description: "Apoyo diagnóstico con pruebas como hemograma, química sanguínea y análisis de orina, según la valoración clínica.", group: "7dias", icon: "lab" },
  { id: "hospitalizacion", title: "Hospitalización", description: "Cuidados dentro del hospital con monitoreo, tratamiento y acompañamiento del equipo veterinario.", group: "7dias", icon: "hospital" },
  { id: "hospitalizacion-virales", title: "Hospitalización de pacientes virales", description: "Servicio de hospitalización para pacientes con enfermedades virales que requieren cuidado en el hospital.", group: "7dias", icon: "shield" },
  { id: "medicina-preventiva", title: "Medicina preventiva", description: "Revisiones y orientación para el cuidado de las mascotas, de acuerdo con sus necesidades y su etapa de vida.", group: "7dias", icon: "calendar" },
  { id: "farmacia", title: "Farmacia veterinaria", description: "Farmacia veterinaria para acompañar los tratamientos indicados por los profesionales.", group: "7dias", icon: "pill" },
] as const;

export type HospitalServiceId = typeof services[number]["id"];

export const values = [
  { title: "Empatía", description: "Escuchamos a las familias y tratamos a cada paciente con compasión y respeto." },
  { title: "Calidez humana", description: "Buscamos que las mascotas y sus cuidadores se sientan acompañados y en confianza." },
  { title: "Exigencia profesional", description: "Trabajamos con atención a la calidad y a la formación continua del equipo." },
  { title: "Innovación", description: "Integramos prácticas y tecnología al servicio del cuidado de la salud animal." },
  { title: "Trabajo en equipo", description: "Coordinamos nuestros esfuerzos para acompañar cada proceso de atención." },
  { title: "Compromiso", description: "Nos dedicamos al bienestar de las mascotas con un trato cercano y personalizado." },
] as const;

export const publishedFigures = [
  { value: "24", label: "Horas disponibles" },
  { value: "16", label: "Especialistas" },
] as const;

export const faqs = [
  { question: "¿Atienden las 24 horas?", answer: "Sí. El Hospital Veterinario de Santa Mónica publica servicio 24/7, con atención de urgencias y consulta general." },
  { question: "¿Necesito cita para una consulta general?", answer: "No. La consulta general se atiende sin cita previa y por orden de llegada." },
  { question: "¿Cómo consulto por una especialidad?", answer: "Puedes comunicarte por teléfono o WhatsApp para conocer la disponibilidad de ortopedista, neurología, endocrinología, oncología o gastroenterología." },
  { question: "¿Dónde está el hospital?", answer: "En Carrera 19 # 17 B11, barrio Santa Mónica, Dosquebradas, Risaralda. Puedes abrir la ubicación desde los enlaces de contacto." },
  { question: "¿Qué servicios tienen durante la semana?", answer: "El sitio del hospital presenta radiografía, laboratorio, hospitalización, hospitalización de pacientes virales, medicina preventiva y farmacia veterinaria en el grupo de servicios de los 7 días." },
  { question: "¿Cómo puedo escribir al hospital?", answer: "Puedes llamar al 3215665926, continuar en WhatsApp o escribir a servicioalcliente@hvdesantamonica.com.co. La solicitud de la página se revisa antes de abrir WhatsApp y no se envía automáticamente." },
] as const;

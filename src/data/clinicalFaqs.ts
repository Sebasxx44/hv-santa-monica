// — Tipos —
export interface ClinicalFaq {
  question: string;
  answer: string;
}

export interface ClinicalSource {
  label: string;
  url: string;
}

// — Temas clínicos del inicio original, contrastados con las fuentes de abajo —
// Atención 24/7 y consulta sin cita se mantienen en las preguntas logísticas.
export const clinicalFaqs: ClinicalFaq[] = [
  {
    question: '¿Para qué sirve una radiografía veterinaria?',
    answer: 'Ayuda a valorar fracturas, articulaciones, algunos cuerpos extraños y alteraciones del tórax o el abdomen, incluidos los pulmones. El veterinario decide si es adecuada ante dolor o dificultad para caminar o respirar y la interpreta junto con la valoración clínica.',
  },
  {
    question: '¿Qué cambios pueden indicar que mi mascota tiene dolor?',
    answer: 'Menos apetito, aislamiento, irritabilidad, postura encorvada, cojera, jadeo excesivo, vocalizaciones o rechazo al contacto pueden acompañar al dolor. Si observas estos cambios, busca valoración veterinaria para conocer su causa.',
  },
  {
    question: '¿Cuándo debo llevar a mi mascota a urgencias?',
    answer: 'Busca atención inmediata ante dificultad para respirar, convulsiones, pérdida de conciencia, sangrado activo, posible intoxicación, dolor intenso, abdomen que se hincha repentinamente, caídas desde altura o accidentes de tránsito. El vómito persistente y la diarrea con sangre también requieren valoración urgente; si tienes dudas, comunícate con el hospital.',
  },
  {
    question: '¿Cada cuánto conviene una revisión veterinaria?',
    answer: 'Como orientación, las revisiones suelen programarse cada 6 a 12 meses, aunque la mascota parezca estar bien; la frecuencia se ajusta a su edad, salud y necesidades. Estas visitas permiten revisar posibles cambios y actualizar el plan de vacunación y desparasitación.',
  },
  {
    question: '¿Cómo se decide si necesita exámenes de laboratorio?',
    answer: 'Ante vómitos, diarrea, falta de apetito, pérdida de peso, debilidad, fiebre o cambios de comportamiento, el veterinario puede indicar hemograma, química sanguínea o análisis de orina. También pueden ser útiles antes de una cirugía, durante tratamientos prolongados o en pacientes mayores, según la valoración.',
  },
  {
    question: '¿Qué hago si no quiere comer o ha vomitado varias veces?',
    answer: 'Acude a urgencias si el vómito persiste, contiene sangre o se acompaña de diarrea o decaimiento. Los vómitos repetidos y la pérdida de apetito pueden tener distintas causas, entre ellas problemas digestivos o intoxicaciones, y necesitan valoración veterinaria pronta.',
  },
  {
    question: '¿Qué se revisa en una consulta general?',
    answer: 'Se revisan los antecedentes, los síntomas, el peso y los signos vitales, junto con un examen físico que incluye piel, oídos, ojos, boca y auscultación del corazón y los pulmones. Según los hallazgos, el veterinario puede recomendar laboratorio, radiografía o ecografía como estudios complementarios.',
  },
  {
    question: '¿Para qué puede recomendarse una ecografía?',
    answer: 'Permite observar órganos internos, como hígado, riñones, bazo, vejiga, útero y próstata, sin una intervención quirúrgica. Puede apoyar la evaluación de urgencias, la gestación y el seguimiento de tratamientos; su indicación y preparación dependen del caso.',
  },
  {
    question: '¿Qué vacunas debo revisar para mi perro o gato?',
    answer: 'En perros se revisa la protección frente a parvovirosis, moquillo, hepatitis, leptospirosis y rabia; en gatos, frente a panleucopenia, calicivirus, rinotraqueítis y rabia. El veterinario define las vacunas y los refuerzos según la edad, los antecedentes, el riesgo de exposición y la normativa aplicable.',
  },
  {
    question: '¿Cómo funciona la hospitalización veterinaria?',
    answer: 'Se indica cuando el paciente necesita vigilancia y cuidados que no pueden realizarse adecuadamente en casa. Según su estado, el plan puede incluir medicamentos intravenosos, fluidoterapia, control del dolor, monitoreo y exámenes de seguimiento.',
  },
];

// — Procedencia y contraste clínico: no acreditan afiliación del hospital —
export const clinicalSources: ClinicalSource[] = [
  {
    label: 'Hospital Veterinario Santa Mónica · preguntas originales',
    url: 'https://www.hvdesantamonica.com.co/',
  },
  {
    label: 'AAHA · cómo reconocer el dolor en perros y gatos',
    url: 'https://www.aaha.org/resources/pain-management-for-pets/',
  },
  {
    label: 'AAHA · señales de una urgencia veterinaria',
    url: 'https://www.aaha.org/resources/help-is-this-a-pet-emergency/',
  },
  {
    label: 'AAHA · pruebas y seguimiento preventivo',
    url: 'https://www.aaha.org/resources/why-your-pet-needs-annual-wellness-testing/',
  },
  {
    label: 'WSAVA · guías de vacunación de perros y gatos de 2024',
    url: 'https://wsava.org/wp-content/uploads/2024/04/WSAVA-Vaccination-guidelines-2024.pdf',
  },
  {
    label: 'AAHA · fluidoterapia individualizada y seguimiento',
    url: 'https://www.aaha.org/resources/2024-aaha-fluid-therapy-guidelines-for-dogs-and-cats/section-3-fluids-for-replacement-and-maintenance/',
  },
  {
    label: 'UC Davis Veterinary Medicine · ecografía de pequeños animales',
    url: 'https://behavior.vetmed.ucdavis.edu/hospital/diagnostic-imaging/small-animal/ultrasound',
  },
  {
    label: 'Kansas State Veterinary Health Center · revisión y pruebas complementarias',
    url: 'https://www.ksvhc.org/services/pet-health-center/wellness-exam.html',
  },
  {
    label: 'AVMA · primeros auxilios, copia de archivo publicada por MVMA',
    url: 'https://assets-002.noviams.com/novi-file-uploads/mvma/pdfs-and-documents/pet_emergencies/First_Aid_Tips_for_Pet_Owner-f3cf0ce4.pdf',
  },
];

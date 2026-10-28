// — Tipos —
export interface ArchiveEntry {
  title: string;
  path: string;
  date: string;
  dateLabel: string;
  author: string;
  category: string;
  categoryPath: string;
  sourceUrl: string;
  summary: string;
}

export interface TestimonialReview {
  id: string;
  author: string;
  initials: string;
  relativeDate: string;
  summary: string;
  image: string;
  sourceUrl: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
}

export interface TestimonialEvidence {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceUrl: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
}

export interface FamilyLetter {
  id: string;
  family: string;
  title: string;
  summary: string;
  evidence: TestimonialEvidence[];
}

// — Archivo editorial —
export const archiveEntry: ArchiveEntry = {
  title: 'Hello world!',
  path: '/2024/12/12/hello-world/',
  date: '2024-12-12',
  dateLabel: '12 de diciembre de 2024',
  author: 'admin',
  category: 'Uncategorized',
  categoryPath: '/category/uncategorized/',
  sourceUrl: 'https://www.hvdesantamonica.com.co/2024/12/12/hello-world/',
  summary: 'La entrada de bienvenida de la instalación original de WordPress, conservada como parte del archivo del sitio.',
};

export const archiveSource = 'https://www.hvdesantamonica.com.co/blog-de-actualidad/';


// — Reseñas y cartas: resúmenes de las evidencias publicadas, sin citas atribuidas —
export const testimonialReviews: TestimonialReview[] = [
  {
    "id": "review-01",
    "author": "wilmar lopez",
    "initials": "WL",
    "relativeDate": "Hace 2 meses",
    "summary": "Valora la atención y calidad humana con sus mascotas.",
    "image": "/images/reviews/review-01.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-1.png",
    "thumbnail": "/images/reviews/review-01-480.webp",
    "alt": "Captura de la reseña de wilmar lopez publicada en el sitio original.",
    "width": 690,
    "height": 280
  },
  {
    "id": "review-02",
    "author": "Jorge Andrés Grajales",
    "initials": "JG",
    "relativeDate": "Hace 5 meses",
    "summary": "Destaca cariño, profesionalismo y dedicación del equipo.",
    "image": "/images/reviews/review-02.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-2.png",
    "thumbnail": "/images/reviews/review-02-480.webp",
    "alt": "Captura de la reseña de Jorge Andrés Grajales publicada en el sitio original.",
    "width": 697,
    "height": 192
  },
  {
    "id": "review-03",
    "author": "Yasmín Dávila Moreno",
    "initials": "YM",
    "relativeDate": "Hace 3 meses",
    "summary": "Agradece los cuidados durante la recuperación de Lucas.",
    "image": "/images/reviews/review-03.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-3.png",
    "thumbnail": "/images/reviews/review-03-480.webp",
    "alt": "Captura de la reseña de Yasmín Dávila Moreno publicada en el sitio original.",
    "width": 679,
    "height": 219
  },
  {
    "id": "review-04",
    "author": "Jose Davila",
    "initials": "JD",
    "relativeDate": "Hace 3 meses",
    "summary": "Reconoce atención oportuna y acompañamiento a la familia de Lucas.",
    "image": "/images/reviews/review-04.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-4.png",
    "thumbnail": "/images/reviews/review-04-480.webp",
    "alt": "Captura de la reseña de Jose Davila publicada en el sitio original.",
    "width": 678,
    "height": 250
  },
  {
    "id": "review-05",
    "author": "Natalia Alzate",
    "initials": "NA",
    "relativeDate": "Hace 3 meses",
    "summary": "Agradece el apoyo al paciente Lucas y su familia.",
    "image": "/images/reviews/review-05.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-5.png",
    "thumbnail": "/images/reviews/review-05-480.webp",
    "alt": "Captura de la reseña de Natalia Alzate publicada en el sitio original.",
    "width": 676,
    "height": 219
  },
  {
    "id": "review-06",
    "author": "Camilo Andres Del Rio Varila",
    "initials": "CV",
    "relativeDate": "Hace 2 meses",
    "summary": "Valora el servicio de 24 horas y sus profesionales.",
    "image": "/images/reviews/review-06.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-6.png",
    "thumbnail": "/images/reviews/review-06-480.webp",
    "alt": "Captura de la reseña de Camilo Andres Del Rio Varila publicada en el sitio original.",
    "width": 676,
    "height": 180
  },
  {
    "id": "review-07",
    "author": "carmenza guerrero",
    "initials": "CG",
    "relativeDate": "Hace 2 meses",
    "summary": "Agradece la atención prestada a su mascota.",
    "image": "/images/reviews/review-07.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-7.png",
    "thumbnail": "/images/reviews/review-07-480.webp",
    "alt": "Captura de la reseña de carmenza guerrero publicada en el sitio original.",
    "width": 675,
    "height": 193
  },
  {
    "id": "review-08",
    "author": "Valentina Gualdron",
    "initials": "VG",
    "relativeDate": "Hace 3 meses",
    "summary": "Destaca amabilidad y trato al paciente y al cuidador.",
    "image": "/images/reviews/review-08.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-8.png",
    "thumbnail": "/images/reviews/review-08-480.webp",
    "alt": "Captura de la reseña de Valentina Gualdron publicada en el sitio original.",
    "width": 690,
    "height": 173
  },
  {
    "id": "review-09",
    "author": "Carolina Mazuera",
    "initials": "CM",
    "relativeDate": "Hace 8 meses",
    "summary": "Destaca servicios integrales, información y a la doctora Karen Suarez.",
    "image": "/images/reviews/review-09.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-9.png",
    "thumbnail": "/images/reviews/review-09-480.webp",
    "alt": "Captura de la reseña de Carolina Mazuera publicada en el sitio original.",
    "width": 678,
    "height": 203
  },
  {
    "id": "review-10",
    "author": "Healthy Pets",
    "initials": "HP",
    "relativeDate": "Hace 2 meses",
    "summary": "Expresa una valoración positiva de la atención.",
    "image": "/images/reviews/review-10.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-10.png",
    "thumbnail": "/images/reviews/review-10-480.webp",
    "alt": "Captura de la reseña de Healthy Pets publicada en el sitio original.",
    "width": 673,
    "height": 149
  },
  {
    "id": "review-11",
    "author": "Myriam Echeverry Mejía",
    "initials": "MM",
    "relativeDate": "Hace 8 meses",
    "summary": "Agradece atención a su gata e informes en video.",
    "image": "/images/reviews/review-11.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-11.png",
    "thumbnail": "/images/reviews/review-11-480.webp",
    "alt": "Captura de la reseña de Myriam Echeverry Mejía publicada en el sitio original.",
    "width": 688,
    "height": 422
  },
  {
    "id": "review-12",
    "author": "Nicolas Garcia",
    "initials": "NG",
    "relativeDate": "Hace un año",
    "summary": "Valora la atención y los servicios especializados.",
    "image": "/images/reviews/review-12.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura-12.png",
    "thumbnail": "/images/reviews/review-12-480.webp",
    "alt": "Captura de la reseña de Nicolas Garcia publicada en el sitio original.",
    "width": 666,
    "height": 238
  },
  {
    "id": "review-13",
    "author": "camila davila moreno",
    "initials": "CM",
    "relativeDate": "Hace 3 meses",
    "summary": "Agradece la recuperación de Lucas y el acompañamiento familiar.",
    "image": "/images/reviews/review-13.webp",
    "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/Captura.png",
    "thumbnail": "/images/reviews/review-13-480.webp",
    "alt": "Captura de la reseña de camila davila moreno publicada en el sitio original.",
    "width": 688,
    "height": 578
  }
];

export const familyLetters: FamilyLetter[] = [
  {
    "id": "athena",
    "family": "Athena y su familia",
    "title": "Gracias por acompañarnos.",
    "summary": "Agradecimiento por los cuidados recibidos durante una enfermedad y el regreso a casa.",
    "evidence": [
      {
        "id": "review-14",
        "title": "Carta de Athena · imagen 1",
        "description": "Agradecimiento por los cuidados recibidos durante una enfermedad y el regreso a casa.",
        "image": "/images/reviews/review-14.webp",
        "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-10.43.06-PM.jpeg",
        "thumbnail": "/images/reviews/review-14-480.webp",
        "alt": "Fotografía de una carta de agradecimiento publicada en el sitio original.",
        "width": 1280,
        "height": 720
      },
      {
        "id": "review-15",
        "title": "Carta de Athena · imagen 2",
        "description": "Agradecimiento por los cuidados recibidos durante una enfermedad y el regreso a casa.",
        "image": "/images/reviews/review-15.webp",
        "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-10.43.25-PM.jpeg",
        "thumbnail": "/images/reviews/review-15-480.webp",
        "alt": "Fotografía de una carta de agradecimiento publicada en el sitio original.",
        "width": 720,
        "height": 1280
      }
    ]
  },
  {
    "id": "lucas",
    "family": "Lucas y la familia de Lucas",
    "title": "Volver a casa, juntos.",
    "summary": "Reconoce el acompañamiento durante la hospitalización y la vuelta a casa.",
    "evidence": [
      {
        "id": "review-16",
        "title": "Un recuerdo de Lucas",
        "description": "Ilustración de Lucas compartida en el archivo del hospital.",
        "image": "/images/reviews/review-16.webp",
        "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-10.45.58-PM.jpeg",
        "thumbnail": "/images/reviews/review-16-480.webp",
        "alt": "Recuerdo ilustrado publicado en testimonios del sitio original.",
        "width": 853,
        "height": 1280
      },
      {
        "id": "review-17",
        "title": "Carta de Lucas",
        "description": "Reconoce el acompañamiento durante la hospitalización y la vuelta a casa.",
        "image": "/images/reviews/review-17.webp",
        "sourceUrl": "https://www.hvdesantamonica.com.co/wp-content/uploads/2026/03/WhatsApp-Image-2025-12-11-at-10.46.18-PM.jpeg",
        "thumbnail": "/images/reviews/review-17-480.webp",
        "alt": "Fotografía de una carta de agradecimiento publicada en el sitio original.",
        "width": 720,
        "height": 1280
      }
    ]
  }
];

export const testimonialEvidence: TestimonialEvidence[] = [
  ...testimonialReviews.map((review) => ({
    id: review.id, title: `Reseña de ${review.author}`, description: review.summary,
    image: review.image, sourceUrl: review.sourceUrl, thumbnail: review.thumbnail,
    alt: review.alt, width: review.width, height: review.height,
  })),
  ...familyLetters.flatMap((letter) => letter.evidence),
];

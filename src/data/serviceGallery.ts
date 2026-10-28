export interface ServiceGalleryPhoto {
  id: string;
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const serviceGalleries: Record<"24h" | "7dias", ServiceGalleryPhoto[]> = {
  "24h": [
    {
      "id": "service-gallery-01",
      "src": "/images/services/service-01-960.webp",
      "srcset": "/images/services/service-01-480.webp 480w, /images/services/service-01-960.webp 960w, /images/services/service-01-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Tres integrantes del equipo acompañan una atención veterinaria junto a una mesa clínica.",
      "caption": "El equipo durante una atención veterinaria."
    },
    {
      "id": "service-gallery-02",
      "src": "/images/services/service-02-960.webp",
      "srcset": "/images/services/service-02-480.webp 480w, /images/services/service-02-960.webp 960w, /images/services/service-02-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Dos integrantes del equipo junto a equipos de atención del hospital.",
      "caption": "Personas y equipos al servicio del cuidado."
    },
    {
      "id": "service-gallery-03",
      "src": "/images/services/service-03-960.webp",
      "srcset": "/images/services/service-03-480.webp 480w, /images/services/service-03-960.webp 960w, /images/services/service-03-1600.webp 1600w",
      "width": 960,
      "height": 816,
      "alt": "Revisión de un gato con acompañamiento de dos integrantes del equipo.",
      "caption": "Acompañamiento durante la revisión de una mascota."
    },
    {
      "id": "service-gallery-04",
      "src": "/images/services/service-04-960.webp",
      "srcset": "/images/services/service-04-480.webp 480w, /images/services/service-04-960.webp 960w, /images/services/service-04-1125.webp 1125w",
      "width": 960,
      "height": 1165,
      "alt": "Perro de pelaje oscuro con una pañoleta de colores.",
      "caption": "Una mascota en el hospital."
    },
    {
      "id": "service-gallery-05",
      "src": "/images/services/service-05-960.webp",
      "srcset": "/images/services/service-05-480.webp 480w, /images/services/service-05-960.webp 960w, /images/services/service-05-1156.webp 1156w",
      "width": 960,
      "height": 1134,
      "alt": "Integrante del equipo atiende a un perro sobre una mesa veterinaria.",
      "caption": "Atención de una mascota en una mesa clínica."
    },
    {
      "id": "service-gallery-06",
      "src": "/images/services/service-06-960.webp",
      "srcset": "/images/services/service-06-480.webp 480w, /images/services/service-06-960.webp 960w, /images/services/service-06-1037.webp 1037w",
      "width": 960,
      "height": 1264,
      "alt": "Integrante del equipo con guantes durante una atención veterinaria.",
      "caption": "Cuidado durante un procedimiento veterinario."
    }
  ],
  "7dias": [
    {
      "id": "service-gallery-07",
      "src": "/images/services/service-07-960.webp",
      "srcset": "/images/services/service-07-480.webp 480w, /images/services/service-07-960.webp 960w, /images/services/service-07-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Cuatro integrantes del equipo junto a la marca del Hospital Veterinario de Santa Mónica.",
      "caption": "Un equipo que trabaja por su bienestar."
    },
    {
      "id": "service-gallery-08",
      "src": "/images/services/service-08-960.webp",
      "srcset": "/images/services/service-08-480.webp 480w, /images/services/service-08-960.webp 960w, /images/services/service-08-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Integrantes del equipo acompañan una atención en una mesa del hospital.",
      "caption": "Trabajo coordinado en la atención veterinaria."
    },
    {
      "id": "service-gallery-09",
      "src": "/images/services/service-09-960.webp",
      "srcset": "/images/services/service-09-480.webp 480w, /images/services/service-09-960.webp 960w, /images/services/service-09-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Integrante del hospital en un mostrador junto a productos veterinarios.",
      "caption": "Un espacio de atención y productos veterinarios."
    },
    {
      "id": "service-gallery-10",
      "src": "/images/services/service-10-960.webp",
      "srcset": "/images/services/service-10-480.webp 480w, /images/services/service-10-960.webp 960w, /images/services/service-10-1600.webp 1600w",
      "width": 960,
      "height": 640,
      "alt": "Tres integrantes del equipo sostienen un perro blanco frente a la marca del hospital.",
      "caption": "Equipo y mascotas en Santa Mónica."
    },
    {
      "id": "service-gallery-11",
      "src": "/images/services/service-11-960.webp",
      "srcset": "/images/services/service-11-480.webp 480w, /images/services/service-11-960.webp 960w, /images/services/service-11-1179.webp 1179w",
      "width": 960,
      "height": 1111,
      "alt": "Perro de pelaje blanco y café mirando hacia la cámara.",
      "caption": "Una mascota de la galería original del hospital."
    },
    {
      "id": "service-gallery-12",
      "src": "/images/services/service-12-960.webp",
      "srcset": "/images/services/service-12-480.webp 480w, /images/services/service-12-960.webp 960w, /images/services/service-12-1302.webp 1302w",
      "width": 960,
      "height": 1006,
      "alt": "Perro de pelaje oscuro apoyado junto a una mesa de atención.",
      "caption": "Cercanía en un espacio de atención."
    },
    {
      "id": "service-gallery-13",
      "src": "/images/services/service-13-960.webp",
      "srcset": "/images/services/service-13-480.webp 480w, /images/services/service-13-960.webp 960w, /images/services/service-13-1307.webp 1307w",
      "width": 960,
      "height": 1003,
      "alt": "Integrantes del equipo con indumentaria quirúrgica durante un procedimiento.",
      "caption": "Trabajo del equipo durante un procedimiento."
    }
  ]
};

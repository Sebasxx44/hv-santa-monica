# Hospital Veterinario de Santa Mónica

Rediseño conceptual en español del [sitio original](https://www.hvdesantamonica.com.co/). Conserva sus ocho rutas de sitemap, la categoría sin indexación y la redirección del autor. No se inventaron artículos veterinarios para sustituir la entrada inicial de WordPress.

Astro7, TypeScript6, CSS propio y SVG. Paleta original verificada: `#027B76`, `#067A73`, `#29C4A9`, `#2C3D49` y blanco. Fuentes Outfit y Nunito Sans locales. Fotografías reales del hospital, con procedencia en los manifiestos de `public/images`.

## Desarrollo

Node24+. `npm install`, `npm run dev`. `npm run build` genera `dist/`; `npm run typecheck` comprueba tipos y `npm test`, después de compilar, valida contacto, rutas, enlaces e indexación.

## Experiencia

Recorrido vectorial conectado al scroll, apariciones progresivas, filtros de servicios y visor accesible de evidencias. La animación de scroll se limita a30fps y respeta movimiento reducido. Las 13 reseñas y las 2 cartas se distinguen; las 17 piezas del archivo original se pueden consultar completas.

El formulario prepara una solicitud local y muestra el resumen antes de continuar en el WhatsApp publicado por el hospital. No envía, almacena ni confirma una cita automáticamente. Se conserva la atención de consulta general sin cita, por orden de llegada.

Publicación: [hv-santa-monica-sebaz.vercel.app](https://hv-santa-monica-sebaz.vercel.app/).

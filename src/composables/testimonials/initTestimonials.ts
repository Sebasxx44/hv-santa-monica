import { testimonialEvidence } from '@/data/archive';
import { createTestimonialViewer } from '@/composables/testimonials/createTestimonialViewer';

export const initTestimonials = (): void => {
  // — Referencias de la vista —
  const dialog = document.querySelector<HTMLDialogElement>('[data-testimonial-dialog]');
  const image = dialog?.querySelector<HTMLImageElement>('[data-viewer-image]');
  const title = dialog?.querySelector<HTMLElement>('[data-viewer-title]');
  const description = dialog?.querySelector<HTMLElement>('[data-viewer-description]');
  const counter = dialog?.querySelector<HTMLElement>('[data-viewer-counter]');
  const source = dialog?.querySelector<HTMLAnchorElement>('[data-viewer-source]');
  const close = dialog?.querySelector<HTMLButtonElement>('[data-viewer-close]');
  const previous = dialog?.querySelector<HTMLButtonElement>('[data-viewer-previous]');
  const next = dialog?.querySelector<HTMLButtonElement>('[data-viewer-next]');
  if (!dialog || !image || !title || !description || !counter || !source || !close || !previous || !next || dialog.dataset.initialized === 'true') return;
  if (typeof dialog.showModal !== 'function') return;
  dialog.dataset.initialized = 'true';

  // — Apertura progresiva: el enlace conserva su destino sin JavaScript —
  const viewer = createTestimonialViewer({ dialog, image, title, description, counter, source, close, previous, next }, testimonialEvidence);
  document.querySelectorAll<HTMLAnchorElement>('[data-testimonial-open]').forEach((trigger) => {
    trigger.addEventListener('click', (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const id = trigger.dataset.testimonialOpen;
      if (!id) return;
      event.preventDefault();
      viewer.open(id, trigger);
    });
  });
};

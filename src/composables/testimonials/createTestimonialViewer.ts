import type { TestimonialEvidence } from '@/data/archive';
import type { TestimonialDialogElements, TestimonialViewer } from '@/composables/testimonials/types';

export const createTestimonialViewer = (elements: TestimonialDialogElements, evidence: TestimonialEvidence[]): TestimonialViewer => {
  // — Estado de la selección y el foco —
  let activeIndex = 0;
  let activeTrigger: HTMLAnchorElement | null = null;
  let previousOverflow = '';

  // — Presentación del documento —
  const render = (): void => {
    const item = evidence[activeIndex];
    if (!item) return;
    elements.image.src = item.image;
    elements.image.alt = item.alt;
    elements.image.width = item.width;
    elements.image.height = item.height;
    elements.title.textContent = item.title;
    elements.description.textContent = item.description;
    elements.counter.textContent = `${activeIndex + 1} / ${evidence.length}`;
    elements.source.href = item.sourceUrl;
    elements.source.setAttribute('aria-label', `Abrir la imagen original: ${item.title}`);
  };

  const step = (direction: number): void => {
    if (evidence.length === 0) return;
    activeIndex = (activeIndex + direction + evidence.length) % evidence.length;
    render();
  };

  const open = (id: string, trigger: HTMLAnchorElement): void => {
    const index = evidence.findIndex((item) => item.id === id);
    if (index < 0 || elements.dialog.open) return;
    activeIndex = index;
    activeTrigger = trigger;
    render();
    previousOverflow = document.body.style.overflow;
    elements.dialog.showModal();
    document.body.style.overflow = 'hidden';
    elements.close.focus({ preventScroll: true });
  };

  // — Controles nativos y recuperación del foco —
  elements.close.addEventListener('click', () => elements.dialog.close());
  elements.previous.addEventListener('click', () => step(-1));
  elements.next.addEventListener('click', () => step(1));
  elements.dialog.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    step(event.key === 'ArrowLeft' ? -1 : 1);
  });
  elements.dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target !== elements.dialog) return;
    const bounds = elements.dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) elements.dialog.close();
  });
  elements.dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    elements.image.removeAttribute('src');
    if (activeTrigger?.isConnected) activeTrigger.focus({ preventScroll: true });
    activeTrigger = null;
  });

  return { open };
};

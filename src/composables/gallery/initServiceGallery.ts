import { initGalleryViewer } from '@/composables/gallery/galleryViewer';

const initGallery = (root: HTMLElement): (() => void) => {
  const stage = root.querySelector<HTMLElement>('[data-gallery-stage]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-gallery-slide]')];
  const thumbs = [...root.querySelectorAll<HTMLAnchorElement>('[data-gallery-thumb]')];
  const counter = root.querySelector<HTMLElement>('[data-gallery-counter]');
  const description = root.querySelector<HTMLElement>('[data-gallery-description]');
  const previous = root.querySelector<HTMLButtonElement>('[data-gallery-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-gallery-next]');
  const expand = root.querySelector<HTMLAnchorElement>('[data-gallery-expand]');
  const controls = root.querySelector<HTMLElement>('[data-gallery-enhanced]');
  if (!stage || !slides.length || root.dataset.galleryReady) return () => {};
  root.dataset.galleryReady = 'true';
  const viewer = initGalleryViewer(root);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let scrollTimer = 0;

  const update = (selected: number) => {
    index = Math.max(0, Math.min(slides.length - 1, selected));
    const image = slides[index].querySelector<HTMLImageElement>('img');
    const caption = slides[index].querySelector<HTMLElement>('[data-gallery-caption]')?.textContent?.split(' · Foto ')[0] ?? '';
    thumbs.forEach((thumb, i) => {
      if (i === index) thumb.setAttribute('aria-current', 'true');
      else thumb.removeAttribute('aria-current');
    });
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
    if (description) description.textContent = caption;
    if (expand && image) expand.href = image.getAttribute('src') ?? image.src;
  };
  const select = (selected: number, animate = true) => {
    update((selected + slides.length) % slides.length);
    stage.scrollTo({ left: index * stage.clientWidth, behavior: animate && !motion.matches ? 'smooth' : 'instant' });
  };
  const onThumbnail = (event: MouseEvent) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLAnchorElement) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(thumbs.indexOf(target));
  };
  const onPrevious = () => select(index - 1);
  const onNext = () => select(index + 1);
  const onKey = (event: KeyboardEvent) => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(slides.length - 1);
    else select(index + (event.key === 'ArrowRight' ? 1 : -1));
  };
  const onScroll = () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => update(Math.round(stage.scrollLeft / Math.max(stage.clientWidth, 1))), 130);
  };
  const onExpand = (event: MouseEvent) => {
    const image = slides[index].querySelector<HTMLImageElement>('img');
    if (!image || !expand || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (viewer.open({ src: image.getAttribute('src') ?? image.src, srcset: image.srcset, alt: image.alt, caption: description?.textContent ?? image.alt }, expand)) event.preventDefault();
  };
  const observer = new ResizeObserver(() => select(index, false));
  observer.observe(stage);
  thumbs.forEach(thumb => thumb.addEventListener('click', onThumbnail));
  previous?.addEventListener('click', onPrevious);
  next?.addEventListener('click', onNext);
  stage.addEventListener('keydown', onKey);
  stage.addEventListener('scroll', onScroll, { passive: true });
  expand?.addEventListener('click', onExpand);
  if (controls) controls.hidden = false;
  update(0);
  return () => {
    window.clearTimeout(scrollTimer);
    observer.disconnect();
    viewer.cleanup();
    thumbs.forEach(thumb => thumb.removeEventListener('click', onThumbnail));
    previous?.removeEventListener('click', onPrevious);
    next?.removeEventListener('click', onNext);
    stage.removeEventListener('keydown', onKey);
    stage.removeEventListener('scroll', onScroll);
    expand?.removeEventListener('click', onExpand);
    if (controls) controls.hidden = true;
    delete root.dataset.galleryReady;
  };
};

export const initServiceGalleries = (): (() => void) => {
  const cleanups = [...document.querySelectorAll<HTMLElement>('[data-service-gallery]')].map(initGallery);
  return () => cleanups.forEach(cleanup => cleanup());
};

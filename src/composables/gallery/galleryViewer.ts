export interface GalleryImage {
  src: string;
  srcset: string;
  alt: string;
  caption: string;
}

export const initGalleryViewer = (root: HTMLElement) => {
  const dialog = root.querySelector<HTMLDialogElement>('[data-gallery-viewer]');
  const image = root.querySelector<HTMLImageElement>('[data-gallery-full-image]');
  const caption = root.querySelector<HTMLElement>('[data-gallery-full-caption]');
  const close = root.querySelector<HTMLButtonElement>('[data-gallery-close]');
  let opener: HTMLElement | null = null;

  const onClose = () => opener?.focus();
  const onCloseClick = () => dialog?.close();
  const onBackdrop = (event: MouseEvent) => {
    if (event.target !== dialog || !dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  };
  dialog?.addEventListener('close', onClose);
  dialog?.addEventListener('click', onBackdrop);
  close?.addEventListener('click', onCloseClick);

  return {
    open: (photo: GalleryImage, trigger: HTMLElement): boolean => {
      if (!dialog || !image || !caption || typeof dialog.showModal !== 'function') return false;
      opener = trigger;
      image.src = photo.src;
      image.srcset = photo.srcset;
      image.alt = photo.alt;
      caption.textContent = photo.caption;
      dialog.showModal();
      close?.focus();
      return true;
    },
    cleanup: () => {
      if (dialog?.open) {
        dialog.close();
        opener?.focus();
      }
      dialog?.removeEventListener('close', onClose);
      dialog?.removeEventListener('click', onBackdrop);
      close?.removeEventListener('click', onCloseClick);
    },
  };
};

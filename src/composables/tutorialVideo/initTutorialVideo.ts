export type TutorialVideoCleanup = () => void;

export const initTutorialVideo = (): TutorialVideoCleanup => {
  // — Referencias y alternativa sin JavaScript —
  const dialog = document.querySelector<HTMLDialogElement>('[data-tutorial-dialog]');
  const trigger = document.querySelector<HTMLButtonElement>('[data-tutorial-open]');
  const fallback = document.querySelector<HTMLAnchorElement>('[data-tutorial-fallback]');
  const video = dialog?.querySelector<HTMLVideoElement>('[data-tutorial-video]');
  const close = dialog?.querySelector<HTMLButtonElement>('[data-tutorial-close]');
  const status = dialog?.querySelector<HTMLElement>('[data-tutorial-status]');
  if (!dialog || !trigger || !fallback || !video || !close || !status || !video.dataset.src || typeof dialog.showModal !== 'function' || dialog.dataset.tutorialReady === 'true') return () => {};

  // — Estado del modal y del foco —
  let opener: HTMLButtonElement | null = null;
  let previousOverflow = '';
  let scrollLocked = false;
  let loaded = false;
  let destroyed = false;
  let playbackVersion = 0;

  // — Carga y reproducción sólo tras la apertura voluntaria —
  const onOpen = (): void => {
    if (dialog.open) return;
    opener = trigger;
    status.textContent = '';
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    scrollLocked = true;
    close.focus({ preventScroll: true });
    video.muted = true;
    if (!loaded || video.error) {
      video.src = video.dataset.src ?? '';
      video.load();
      loaded = true;
    }
    video.currentTime = 0;
    const version = ++playbackVersion;
    void video.play().then(() => {
      if (destroyed || !dialog.open) video.pause();
    }).catch(() => {
      if (destroyed || !dialog.open || version !== playbackVersion) return;
      status.textContent = video.error
        ? 'No se pudo cargar la guía. Puedes cerrar el visor y volver a intentarlo.'
        : 'Pulsa Reproducir en los controles del video para iniciar la guía.';
    });
  };

  const onClose = (): void => {
    playbackVersion += 1;
    video.pause();
    if (scrollLocked) {
      document.body.style.overflow = previousOverflow;
      scrollLocked = false;
    }
    if (opener?.isConnected) opener.focus({ preventScroll: true });
    opener = null;
  };
  const onCloseClick = (): void => dialog.close();
  const onBackdrop = (event: MouseEvent): void => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  };
  const onVideoError = (): void => {
    if (dialog.open) status.textContent = 'No se pudo cargar la guía. Puedes cerrar el visor y volver a intentarlo.';
  };

  // — Montaje progresivo y cierre nativo con Escape —
  trigger.addEventListener('click', onOpen);
  close.addEventListener('click', onCloseClick);
  dialog.addEventListener('close', onClose);
  dialog.addEventListener('click', onBackdrop);
  video.addEventListener('error', onVideoError);
  dialog.dataset.tutorialReady = 'true';
  trigger.hidden = false;
  fallback.hidden = true;

  // — Limpieza completa, incluido un modal que siga abierto —
  return () => {
    destroyed = true;
    if (dialog.open) dialog.close();
    onClose();
    trigger.removeEventListener('click', onOpen);
    close.removeEventListener('click', onCloseClick);
    dialog.removeEventListener('close', onClose);
    dialog.removeEventListener('click', onBackdrop);
    video.removeEventListener('error', onVideoError);
    trigger.hidden = true;
    fallback.hidden = false;
    delete dialog.dataset.tutorialReady;
  };
};

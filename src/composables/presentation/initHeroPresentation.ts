import { shouldPlayPresentation } from '@/composables/presentation/playbackPolicy';
import type { PresentationCleanup, PresentationNavigator, PresentationPlayback } from '@/composables/presentation/types';

export const initHeroPresentation = (): PresentationCleanup => {
  // — Referencias de la presentación —
  const root = document.querySelector<HTMLElement>('[data-hero-presentation]');
  const video = root?.querySelector<HTMLVideoElement>('[data-presentation-video]');
  const toggle = root?.querySelector<HTMLButtonElement>('[data-presentation-toggle]');
  const label = root?.querySelector<HTMLElement>('[data-presentation-label]');
  const status = root?.querySelector<HTMLElement>('[data-presentation-status]');
  const controls = root?.querySelector<HTMLElement>('[data-presentation-controls]');
  if (!root || !video || !toggle || !label || !status || !controls || root.dataset.presentationReady === 'true') return () => {};
  const icons = [...toggle.querySelectorAll<HTMLElement>('[data-presentation-icon]')];
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as PresentationNavigator).connection;

  // — Estado: la pausa del usuario prevalece sobre la reproducción automática —
  const state: PresentationPlayback = {
    visible: false,
    pageVisible: !document.hidden,
    reducedMotion: preference.matches,
    saveData: connection?.saveData === true,
    ended: video.ended,
    intent: 'auto',
  };
  let destroyed = false;
  let playbackVersion = 0;
  const originalControls = video.controls;
  const originalMuted = video.muted;

  // — Controles y estado accesible —
  const renderControl = (): void => {
    const mode = video.ended ? 'replay' : video.paused ? 'play' : 'pause';
    label.textContent = mode === 'replay' ? 'Repetir' : mode === 'play' ? 'Reproducir' : 'Pausar';
    toggle.setAttribute('aria-label', `${label.textContent} la presentación de Santa Mónica`);
    icons.forEach((icon) => icon.toggleAttribute('hidden', icon.dataset.presentationIcon !== mode));
    root.dataset.playback = mode;
  };

  const syncPlayback = async (): Promise<void> => {
    const version = ++playbackVersion;
    if (!shouldPlayPresentation(state)) {
      video.pause();
      renderControl();
      return;
    }
    try {
      await video.play();
      if (destroyed || !shouldPlayPresentation(state)) video.pause();
    } catch {
      if (destroyed || version !== playbackVersion) return;
      state.intent = 'pause';
      status.textContent = video.error
        ? 'La presentación no está disponible en este momento. Puedes volver a intentarlo.'
        : 'Pulsa Reproducir para iniciar la presentación.';
    }
    if (!destroyed) renderControl();
  };

  const onToggle = (): void => {
    status.textContent = '';
    if (!video.paused && !video.ended) state.intent = 'pause';
    else {
      state.intent = 'play';
      state.ended = false;
      if (video.error) video.load();
      if (video.ended) video.currentTime = 0;
    }
    void syncPlayback();
  };
  const onEnded = (): void => {
    state.ended = true;
    renderControl();
  };
  const onPause = (): void => {
    if (!destroyed && !video.ended && shouldPlayPresentation(state)) state.intent = 'pause';
    renderControl();
  };
  const onError = (): void => {
    state.intent = 'pause';
    status.textContent = 'La presentación no está disponible en este momento. Puedes volver a intentarlo.';
    renderControl();
  };

  // — Visibilidad y preferencias: no reproducir fuera de la vista —
  const onPageVisibility = (): void => {
    state.pageVisible = !document.hidden;
    void syncPlayback();
  };
  const onPreferences = (): void => {
    state.reducedMotion = preference.matches;
    state.saveData = connection?.saveData === true;
    void syncPlayback();
  };
  const onViewport = (): void => {
    const bounds = root.getBoundingClientRect();
    state.visible = bounds.bottom > 0 && bounds.top < window.innerHeight && bounds.right > 0 && bounds.left < window.innerWidth;
    void syncPlayback();
  };
  const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
    void syncPlayback();
  }, { threshold: [0, 0.3] });

  // — Montaje progresivo: conservar controles nativos si el script no se ejecuta —
  toggle.addEventListener('click', onToggle);
  video.addEventListener('play', renderControl);
  video.addEventListener('pause', onPause);
  video.addEventListener('ended', onEnded);
  video.addEventListener('error', onError);
  preference.addEventListener('change', onPreferences);
  connection?.addEventListener('change', onPreferences);
  document.addEventListener('visibilitychange', onPageVisibility);
  video.muted = true;
  video.controls = false;
  controls.hidden = false;
  root.dataset.presentationReady = 'true';
  renderControl();
  if (observer) observer.observe(root);
  else {
    window.addEventListener('scroll', onViewport, { passive: true });
    window.addEventListener('resize', onViewport, { passive: true });
    onViewport();
  }

  // — Limpieza: detener medios y recuperar la alternativa nativa —
  return () => {
    destroyed = true;
    playbackVersion += 1;
    observer?.disconnect();
    window.removeEventListener('scroll', onViewport);
    window.removeEventListener('resize', onViewport);
    document.removeEventListener('visibilitychange', onPageVisibility);
    preference.removeEventListener('change', onPreferences);
    connection?.removeEventListener('change', onPreferences);
    toggle.removeEventListener('click', onToggle);
    video.removeEventListener('play', renderControl);
    video.removeEventListener('pause', onPause);
    video.removeEventListener('ended', onEnded);
    video.removeEventListener('error', onError);
    video.pause();
    video.controls = originalControls;
    video.muted = originalMuted;
    controls.hidden = true;
    delete root.dataset.presentationReady;
    delete root.dataset.playback;
  };
};

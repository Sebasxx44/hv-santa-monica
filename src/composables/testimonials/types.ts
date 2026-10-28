// — Elementos del visor —
export interface TestimonialDialogElements {
  dialog: HTMLDialogElement;
  image: HTMLImageElement;
  title: HTMLElement;
  description: HTMLElement;
  counter: HTMLElement;
  source: HTMLAnchorElement;
  close: HTMLButtonElement;
  previous: HTMLButtonElement;
  next: HTMLButtonElement;
}

export interface TestimonialViewer {
  open: (id: string, trigger: HTMLAnchorElement) => void;
}

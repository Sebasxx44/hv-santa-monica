type ServiceGroup = "all" | "24h" | "7dias";
const normalize = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
const isGroup = (value: string | undefined): value is ServiceGroup =>
  value === "all" || value === "24h" || value === "7dias";
export const initServiceFilters = (): (() => void) => {
  const cards = [
    ...document.querySelectorAll<HTMLElement>("[data-service-card]"),
  ];
  const buttons = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-service-filter]"),
  ];
  const search = document.querySelector<HTMLInputElement>("#service-search");
  const status = document.querySelector<HTMLElement>("#service-results");
  const sections = [...document.querySelectorAll<HTMLElement>("[data-service-group]")];
  if (!cards.length) return () => {};
  let group: ServiceGroup = "all";
  const update = () => {
    const query = normalize(search?.value ?? "");
    let count = 0;
    cards.forEach((card) => {
      const belongs =
        group === "all" ||
        (card.dataset.group ?? "").split(/\s+/).includes(group);
      const matches =
        !query ||
        normalize(card.dataset.search ?? card.textContent ?? "").includes(
          query,
        );
      card.hidden = !(belongs && matches);
      if (!card.hidden) count++;
    });
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.serviceFilter === group),
      ),
    );
    sections.forEach((section) => {
      section.hidden = ![...section.querySelectorAll<HTMLElement>("[data-service-card]")].some((card) => !card.hidden);
    });
    if (status)
      status.textContent = count
        ? `${count} ${count === 1 ? "servicio encontrado" : "servicios encontrados"}`
        : "No encontramos servicios con esos filtros.";
  };
  const onFilter = (event: MouseEvent) => {
    const button = event.currentTarget;
    if (
      button instanceof HTMLButtonElement &&
      isGroup(button.dataset.serviceFilter)
    ) {
      group = button.dataset.serviceFilter;
      update();
    }
  };
  buttons.forEach((button) => button.addEventListener("click", onFilter));
  search?.addEventListener("input", update);
  update();
  return () => {
    buttons.forEach((button) => button.removeEventListener("click", onFilter));
    search?.removeEventListener("input", update);
    cards.forEach((card) => {
      card.hidden = false;
    });
    sections.forEach((section) => { section.hidden = false; });
  };
};

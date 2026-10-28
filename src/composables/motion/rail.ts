import { nodeProgress, pageProgress } from "@/composables/motion/progress";
import type { ScrollMotion } from "@/composables/motion/types";
export const initCareRail = (reduced: boolean): ScrollMotion => {
  const root = document.documentElement;
  const rails = [
    ...document.querySelectorAll<HTMLElement | SVGElement>("[data-care-rail]"),
  ];
  const paths = [
    ...document.querySelectorAll<SVGPathElement>("[data-care-path]"),
  ];
  const nodes = [...document.querySelectorAll<HTMLElement>("[data-care-node]")];
  paths.forEach((path) => {
    path.setAttribute("pathLength", "1");
    path.style.strokeDasharray = "1";
    path.style.strokeDashoffset = "1";
  });
  const update = () => {
    const progress = reduced
      ? 1
      : pageProgress(window.scrollY, window.innerHeight, root.scrollHeight);
    const value = progress.toFixed(4);
    root.dataset.careProgress = value;
    root.style.setProperty("--care-progress", value);
    rails.forEach((rail) => {
      rail.dataset.careProgress = value;
      rail.style.setProperty("--care-progress", value);
    });
    paths.forEach((path) => {
      path.style.strokeDashoffset = (1 - progress).toFixed(4);
    });
    nodes.forEach((node) => {
      const box = node.getBoundingClientRect();
      const local = reduced
        ? 1
        : nodeProgress(box.top, box.height, window.innerHeight);
      node.dataset.careProgress = local.toFixed(4);
      node.style.setProperty("--care-progress", local.toFixed(4));
    });
  };
  update();
  return { update, cleanup: () => {} };
};

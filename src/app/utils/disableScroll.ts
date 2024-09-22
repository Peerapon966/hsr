// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
const preventKeys: { [key: number]: number } = {
  32: 1,
  33: 1,
  34: 1,
  35: 1,
  36: 1,
  37: 1,
  38: 1,
  39: 1,
  40: 1,
};

const preventDefault = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

const preventScrollKeys = (e: KeyboardEvent) => {
  if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;
  if (preventKeys[e.keyCode]) {
    preventDefault(e);
  }
};

export function disableScroll(component: HTMLElement) {
  component.addEventListener("wheel", preventDefault, {
    passive: false,
  });
  component.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}

export function disableScrollWithKeyDown() {
  window.addEventListener("keydown", preventScrollKeys, false);
}

export function enableScroll(component: HTMLElement) {
  component.removeEventListener("wheel", preventDefault, false);
  component.removeEventListener("touchmove", preventDefault);
}

export function enableScrollWithKeyDown() {
  window.removeEventListener("keydown", preventScrollKeys, false);
}

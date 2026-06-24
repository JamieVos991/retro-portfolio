const clock = document.querySelector("#clock");
let topZ = 20;
let activeDrag = null;

function setClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  clock.textContent = time;
  clock.dateTime = now.toISOString();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function bringForward(element) {
  topZ += 1;
  element.style.zIndex = String(topZ);
}

function openWindow(id) {
  const windowElement = document.querySelector(`[data-window-id="${id}"]`);

  if (!windowElement) {
    return;
  }

  windowElement.classList.add("open");
  bringForward(windowElement);
}

function beginDrag(event, element, handle) {
  if (event.button !== 0) {
    return;
  }

  const rect = element.getBoundingClientRect();
  const parentRect = element.offsetParent.getBoundingClientRect();

  activeDrag = {
    element,
    pointerId: event.pointerId,
    parentRect,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    maxX: parentRect.width - rect.width,
    maxY: parentRect.height - rect.height,
  };

  element.classList.add("dragging");
  bringForward(element);
  handle.setPointerCapture(event.pointerId);
}

function moveDrag(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
    return;
  }

  const x = event.clientX - activeDrag.parentRect.left - activeDrag.offsetX;
  const y = event.clientY - activeDrag.parentRect.top - activeDrag.offsetY;

  activeDrag.element.style.left = `${clamp(x, 0, activeDrag.maxX)}px`;
  activeDrag.element.style.top = `${clamp(y, 0, activeDrag.maxY)}px`;
}

function endDrag(event) {
  if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
    return;
  }

  activeDrag.element.classList.remove("dragging");
  activeDrag = null;
}

document.querySelectorAll(".btn-desktop").forEach((icon) => {
  icon.addEventListener("click", () => {
    openWindow(icon.dataset.window);
  });
});

document.querySelectorAll("article[data-window-id]").forEach((windowElement) => {
  const titlebar = windowElement.querySelector("header");
  const close = windowElement.querySelector("header > button");

  windowElement.addEventListener("pointerdown", () => bringForward(windowElement));

  titlebar.addEventListener("pointerdown", (event) => {
    if (event.target === close) {
      return;
    }

    beginDrag(event, windowElement, titlebar);
  });

  titlebar.addEventListener("pointermove", moveDrag);
  titlebar.addEventListener("pointerup", endDrag);

  close.addEventListener("click", () => {
    windowElement.classList.remove("open");
  });
});

document.querySelectorAll(".chip-panel").forEach((panel) => {
  const chips = panel.querySelectorAll(".tool-chip");
  const description = panel.querySelector(".tool-description");

  if (!description) {
    return;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => {
        const isActive = item === chip;

        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      description.textContent = chip.dataset.description;
    });
  });
});

const welcomeWindow = document.querySelector('[data-window-id="welcome"]');
if (welcomeWindow) bringForward(welcomeWindow);

setClock();
setInterval(setClock, 1000 * 20);

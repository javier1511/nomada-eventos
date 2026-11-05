/** Pestañas accesibles para consultar cada propuesta sin recargar la página. */
export class PackageTabs {
  /** @param {HTMLElement} root Sección con botones data-tab y paneles data-panel. */
  constructor(root) {
    this.root = root;
    this.tabs = Array.from(root.querySelectorAll("[data-tab]"));
    this.panels = Array.from(root.querySelectorAll("[data-panel]"));
  }

  /** Habilita semántica de pestañas y navegación con flechas, Inicio y Fin. */
  init() {
    this.root.querySelector("[data-tabs]").setAttribute("role", "tablist");
    this.tabs.forEach((tab, index) => {
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", `panel-${tab.dataset.tab}`);
      tab.addEventListener("click", () => this.select(index));
      tab.addEventListener("keydown", (event) => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % this.tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + this.tabs.length) % this.tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = this.tabs.length - 1;
        else return;
        event.preventDefault();
        this.select(next);
        this.tabs[next].focus();
      });
    });
    this.panels.forEach((panel) => {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `tab-${panel.dataset.panel}`);
      panel.tabIndex = 0;
    });
    this.select(0);
  }

  /** @param {number} index Índice activo; deja un único panel visible y un tab enfocable. */
  select(index) {
    this.tabs.forEach((tab, position) => {
      const active = position === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    this.panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== this.tabs[index].dataset.tab;
    });
  }
}

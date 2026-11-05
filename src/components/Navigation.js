/** Navegación responsiva; conserva enlaces utilizables sin JavaScript. */
export class Navigation {
  /** @param {HTMLElement} root Cabecera que contiene botón y navegación. */
  constructor(root) {
    this.root = root;
    this.button = root.querySelector("[data-menu-toggle]");
    this.navigation = root.querySelector("[data-navigation]");
    this.mobile = window.matchMedia("(max-width: 900px)");
  }

  /** Conecta apertura, cierre por Escape, clic exterior y cambios de ancho. */
  init() {
    this.button.addEventListener("click", () => {
      this.setOpen(this.button.getAttribute("aria-expanded") !== "true");
    });
    this.navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) this.setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.button.getAttribute("aria-expanded") === "true") {
        this.setOpen(false);
        this.button.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!this.root.contains(event.target)) this.setOpen(false);
    });
    // Salir de la cabecera con Tab también cierra el desplegable móvil.
    this.root.addEventListener("focusout", (event) => {
      if (!this.root.contains(event.relatedTarget)) this.setOpen(false);
    });
    window.addEventListener("resize", () => {
      if (!this.mobile.matches) this.setOpen(false);
    });
  }

  /** @param {boolean} open Estado deseado; actualiza apariencia y accesibilidad. */
  setOpen(open) {
    this.button.setAttribute("aria-expanded", String(open));
    this.button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    this.navigation.classList.toggle("is-open", open);
  }
}

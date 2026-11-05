/** Visor de fotografías reales; usa dialog nativo para contener el foco del teclado. */
export class Gallery {
  /** @param {HTMLElement} root Sección que contiene enlaces a las imágenes originales. */
  constructor(root) {
    this.items = Array.from(root.querySelectorAll("[data-gallery-item]"));
    this.dialog = document.querySelector("[data-gallery-dialog]");
    this.image = this.dialog.querySelector("[data-gallery-image]");
    this.caption = this.dialog.querySelector("#gallery-caption");
    this.counter = this.dialog.querySelector("[data-gallery-counter]");
    this.currentIndex = 0;
    this.opener = null;
  }

  /** Conecta controles. Sin soporte de dialog, los enlaces abren las fotos normalmente. */
  init() {
    if (typeof this.dialog.showModal !== "function") return;
    this.items.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        this.opener = item;
        this.showImage(index);
        this.dialog.showModal();
        document.body.classList.add("modal-open");
      });
    });
    this.dialog.querySelector("[data-gallery-close]").addEventListener("click", () => this.dialog.close());
    this.dialog.querySelector("[data-gallery-previous]").addEventListener("click", () => this.showImage(this.currentIndex - 1));
    this.dialog.querySelector("[data-gallery-next]").addEventListener("click", () => this.showImage(this.currentIndex + 1));
    this.dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        this.showImage(this.currentIndex + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
    this.dialog.addEventListener("click", (event) => {
      // Cierra sólo al pulsar fuera del rectángulo del visor, no al tocar su espacio interno.
      const rect = this.dialog.getBoundingClientRect();
      if (event.target === this.dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) this.dialog.close();
    });
    this.dialog.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (this.opener) this.opener.focus();
    });
  }

  /** @param {number} index Índice solicitado; recorrido circular, texto seguro con textContent. */
  showImage(index) {
    this.currentIndex = (index + this.items.length) % this.items.length;
    const item = this.items[this.currentIndex];
    this.image.src = item.href;
    this.image.alt = item.querySelector("img").alt;
    this.caption.textContent = item.dataset.caption;
    this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
  }
}

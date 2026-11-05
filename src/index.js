import "./styles/main.css";
import { Navigation } from "./components/Navigation";
import { PackageTabs } from "./components/PackageTabs";
import { Gallery } from "./components/Gallery";

/**
 * Inicializa los componentes independientes cuando el HTML ya está disponible.
 * El script se carga con defer. El contenido principal sigue siendo HTML accesible
 * sin JavaScript; sólo el menú móvil, las pestañas y el visor lo requieren.
 */
function initializeSite() {
  document.documentElement.classList.add("js");
  new Navigation(document.querySelector("[data-header]")).init();
  new PackageTabs(document.querySelector("[data-packages]")).init();
  new Gallery(document.querySelector("[data-gallery]")).init();
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
}

initializeSite();

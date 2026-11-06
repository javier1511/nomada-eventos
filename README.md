# Nómada · Buffet y Salón de Eventos

Sitio responsivo construido a partir de la presentación proporcionada, con sus fotografías y datos de contacto. HTML, CSS y JavaScript modular con clases reutilizables, Webpack y Babel. No usa React ni dependencias de interfaz adicionales.

## Ejecutar el proyecto

Requiere **Node.js 22 LTS** y npm. Desde la carpeta que contiene `package.json`:

```bash
npm ci
npm run dev
```

Abre `http://localhost:8080`. `npm ci` instala exactamente las versiones del archivo `package-lock.json`. Si modificas las dependencias, usa `npm install` para actualizarlo.

En PowerShell, si Windows bloquea `npm.ps1`, usa `npm.cmd ci` y `npm.cmd run dev`; no es necesario cambiar la política de ejecución.

## Compilar

Linux, macOS o Git Bash:

```bash
npm run build
```

Windows / PowerShell / CMD:

```powershell
npm.cmd run build:windows
```

Ambos generan `dist/`. Se conserva el comando original `rm -rf dist && webpack --mode production`; el comando adicional para Windows aprovecha `output.clean: true` y no necesita `rm`. El ZIP incluye una compilación lista para revisar; vuelve a compilar después de editar archivos fuente.

## Subir a GitHub

1. Crea un repositorio y coloca **el contenido de esta carpeta** en su raíz: `package.json`, `src/`, las configuraciones y `.github/` deben quedar al mismo nivel.
2. Incluye `package-lock.json`, `.gitignore` y `.github/workflows/`. No subas `node_modules`, archivos `.env` ni credenciales.
3. El workflow **Verificar compilación** instala y compila en cada push y pull request.
4. Subir código al repositorio no publica por sí mismo el sitio. Para publicarlo, sigue el apartado de GitHub Pages.

## Publicar con GitHub Pages (opcional)

1. En el repositorio abre **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Abre **Actions → Publicar en GitHub Pages → Run workflow** y selecciona la rama con este proyecto.
3. El workflow instala con `npm ci`, ejecuta `npm run build` y publica `dist/`.
4. Al finalizar, GitHub muestra la URL del sitio. Para publicar cambios posteriores, vuelve a ejecutar ese workflow.

La publicación es manual para que subir una modificación no la ponga automáticamente en línea. La verificación de compilación sí es automática. El uso de GitHub Pages depende de las funciones habilitadas para tu cuenta y repositorio.

Los recursos usan rutas relativas, por lo que funcionan tanto en `https://usuario.github.io/repositorio/` como en la raíz de un dominio. No necesitas reemplazar el nombre del repositorio dentro de Webpack.

Documentación oficial: [workflows para GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Archivos principales

| Archivo | Función |
| --- | --- |
| `src/index.html` | Contenido, secciones, paquetes y estructura semántica. |
| `src/index.js` | Inicializa los componentes del sitio. |
| `src/styles/main.css` | Diseño, estados interactivos y reglas responsivas. |
| `src/config/site.cjs` | Teléfono, WhatsApp, correo y dirección. |
| `src/components/Navigation.js` | Menú móvil, cierre con Escape y navegación. |
| `src/components/PackageTabs.js` | Paquetes con pestañas y control por teclado. |
| `src/components/Gallery.js` | Visor de fotos, flechas, cierre y retorno del foco. |
| `src/assets/` | Fotografías y logotipo extraídos del PDF original. |
| `webpack.config.js` | Entradas, recursos, servidor y compilación. |
| `babel.config.json` | Transformación de JavaScript e integración de core-js. |
| `docs/CONFIGURACION.md` | Cambios respecto a la configuración proporcionada. |

## Editar contenido y contacto

- Cambia datos públicos en `src/config/site.cjs` y recompila. La plantilla HTML utiliza estos datos para generar los enlaces directos de contacto.
- Cambia textos y paquetes en `src/index.html`; colores y tamaños están en `src/styles/main.css`.
- Las fotos pertenecen al material suministrado. Se extrajeron y optimizaron para web; no son fotografías generadas de un salón ficticio.
- Se corrigieron erratas y duplicados evidentes del PDF. No se inventaron precios, horarios de apertura ni testimonios. Los sectores se nombraron a partir de los eventos descritos.

## Contacto directo

La sección de contacto ofrece enlaces para abrir WhatsApp, el correo y consultar la ubicación. “Cotiza tu evento” del encabezado y “Llámanos · 833 206 5451” abren WhatsApp al mismo número. No hay formulario, campos de captura ni componente `ContactForm`. Los botones de consulta de paquetes llevan a esta sección.

El correo se abre en la aplicación del visitante. El sitio no recibe ni almacena datos y no necesita backend.

## Diseño y compatibilidad

Títulos en Playfair Display y textos en DM Sans, con tamaños aumentados para escritorio y móvil. Las fuentes WOFF2 están incluidas y sus licencias se encuentran en `src/assets/fonts/`.

- Adaptación para móvil, tablet y escritorio, con puntos de ajuste a 360, 650, 900 y 1100 px.
- Icono de menú móvil más compacto: marco de 32 px y líneas de 14 px, con un área táctil de 44 × 44 px.
- Navegación por teclado, texto alternativo y respeto de movimiento reducido.
- Sin JavaScript permanecen disponibles contenido, fotografías y enlaces directos de contacto. Los paquetes se muestran completos.
- JavaScript emitido con sintaxis ES5 como en la configuración original. **Esto no promete compatibilidad completa con Internet Explorer**: el diseño usa CSS moderno. En navegadores sin `dialog`, las fotos se abren por su enlace normal.
- La galería y navegación se pueden probar sin comunicarse con el negocio. No se ha enviado ninguna consulta de prueba.

## Entrega

El proyecto se entrega para que lo subas a tu repositorio. No se ha publicado en GitHub ni configurado un dominio. El archivo `docs/VERIFICACION.md` registra las comprobaciones realizadas y sus límites.

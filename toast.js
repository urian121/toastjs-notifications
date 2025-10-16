/**
 * ToastJS Notifications
 * ==========================================
 *
 * La librería de notificaciones toast más elegante y minimalista para tu aplicación web.
 * Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional.
 *
 * @version     1.11.14
 * @author      Urian Viera
 * @website     https://www.urianviera.com
 * @youtube     https://www.youtube.com/WebDeveloperUrianViera
 * @email       urian1213viera@gmail.com
 * @donate      https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE
 * @license     MIT
 * @copyright   © 2025 Urian Viera. Todos los derechos reservados.
 */

(function (global) {
  "use strict";

  // Constructor principal
  function ToastJS(options = {}) {
    this.options = {
      // Posición y duración por defecto
      position: options.position || "top-right",
      duration: options.duration ?? 8000,
      closeOnClick: options.closeOnClick ?? false,
      ...options,
    };
    this.container = null;
    this.init();
  }

  // Métodos del prototipo
  ToastJS.prototype = {
    init: function () {
      this.injectStyles();
      this.createContainer();
    },

    // Inyectar CSS en el DOM
    injectStyles: function () {
      if (document.getElementById("toastjs-styles")) return;

      const link = document.createElement("link");
      link.id = "toastjs-styles";
      link.rel = "stylesheet";

      // Detectar si estamos usando CDN
      const currentScript =
        document.currentScript ||
        (function () {
          const scripts = document.getElementsByTagName("script");
          return scripts[scripts.length - 1];
        })();

      const scriptSrc = currentScript?.src || "";

      // Si es CDN, usar la ruta correcta
      if (scriptSrc.includes("cdn.jsdelivr.net/npm/toastjs-notifications")) {
        // Usar siempre la última versión del CSS minificado desde jsDelivr (carpeta dist)
        link.href = "https://cdn.jsdelivr.net/npm/toastjs-notifications@latest/dist/toast-notifications.min.css";
        document.head.appendChild(link);
        return;
      }

      if (scriptSrc.includes("unpkg.com/toastjs-notifications")) {
        // Usar siempre la última versión del CSS minificado desde unpkg (carpeta dist)
        link.href = "https://unpkg.com/toastjs-notifications@latest/dist/toast-notifications.min.css";
        document.head.appendChild(link);
        return;
      }

      // Para uso local: cuando el script se carga desde archivos locales
      if (scriptSrc.includes("toast.js") || scriptSrc.includes("toast-notifications.min.js")) {
        // Directorio donde está el JS
        const lastSlash = scriptSrc.lastIndexOf("/");
        const basePath = lastSlash > -1 ? scriptSrc.substring(0, lastSlash) : "";

        // Si el JS está en /js, intentamos buscar el CSS en /css. De lo contrario, junto al JS.
        if (basePath.endsWith("/js")) {
          const root = basePath.slice(0, -3); // Remover '/js'
          // Preferir CSS minificado si existe; si no, hacer fallback al no minificado
          link.href = `${root}/css/toast-notifications.min.css`;
          link.onerror = function () {
            this.onerror = null;
            this.href = `${root}/css/toast-notifications.css`;
          };
        } else if (basePath.endsWith("/dist")) {
          // Si el JS se carga desde /dist, buscar el CSS minificado junto al JS
          link.href = `${basePath}/toast-notifications.min.css`;
        } else {
          // Preferir minificado si existe, sino fallback al no minificado
          const minHref = basePath ? `${basePath}/toast-notifications.min.css` : "toast-notifications.min.css";
          const normalHref = basePath ? `${basePath}/toast-notifications.css` : "toast-notifications.css";
          link.href = minHref;
          link.onerror = function () {
            this.onerror = null;
            this.href = normalHref;
          };
        }

        document.head.appendChild(link);
        return;
      }

      // Fallback: preferir minificado, si falla cargar no minificado en el mismo directorio
      link.href = "toast-notifications.min.css";
      link.onerror = function () {
        this.onerror = null;
        this.href = "toast-notifications.css";
      };
      document.head.appendChild(link);
    },

    createContainer: function (position = this.options.position) {
      // Normalizar posición: bottom-center ya no es soportada, usar bottom-right
      const normalizedPosition = position === "bottom-center" ? "bottom-right" : position;

      // 1) Revisar si ya existe un contenedor global con el id esperado
      const containers = document.querySelectorAll('#toastjs-container');
      if (containers.length > 0) {
        // Si hay más de uno, eliminar duplicados y quedarnos con el primero
        for (let i = 1; i < containers.length; i++) {
          containers[i].remove();
        }
        this.container = containers[0];
        this.container.className = `toastjs-container ${normalizedPosition}`;
        return;
      }

      // 2) Si la instancia ya tiene referencia, reutilizarla (y asegurar el id único)
      if (this.container) {
        // Si por alguna razón el id no está, asignarlo y usarla como global única
        this.container.id = 'toastjs-container';
        this.container.className = `toastjs-container ${normalizedPosition}`;
        // Asegurar que esté en el DOM
        if (!document.body.contains(this.container)) {
          document.body.appendChild(this.container);
        }
        return;
      }

      // 3) Crear un contenedor nuevo, único y global
      this.container = document.createElement("div");
      this.container.className = `toastjs-container ${normalizedPosition}`;
      this.container.id = "toastjs-container";
      document.body.appendChild(this.container);
    },

    show: function (message, type = "info", options = {}) {

      const config = {
        success: {
          icon: `<svg class="checkmark success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
    </svg>`,
          class: "success",
        },
        warning: {
          icon: `<svg class="checkmark warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <line class="checkmark__check" x1="26" y1="16" x2="26" y2="30" />
      <circle class="checkmark__dot" cx="26" cy="36" r="2" />
    </svg>`,
          class: "warning",
        },
        error: {
          icon: `<svg class="checkmark error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <line class="checkmark__check" x1="16" y1="16" x2="36" y2="36" />
      <line class="checkmark__check" x1="36" y1="16" x2="16" y2="36" />
    </svg>`,
          class: "error",
        },
        info: {
          icon: `<svg class="checkmark info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <line class="checkmark__check" x1="26" y1="20" x2="26" y2="34" />
      <circle class="checkmark__dot" cx="26" cy="16" r="2" />
    </svg>`,
          class: "info",
        },
      };

      const toastConfig = config[type] || config.info;
      const duration = options.duration ?? this.options.duration;
      const position = options.position ?? this.options.position;

      // Actualiza el contenedor para la nueva posición
      this.createContainer(position);

      const toast = document.createElement("div");
      toast.className = `my-toast ${toastConfig.class}`;

      const progressMarkup = '<div class="toast-progress-bar"></div>';

      toast.innerHTML = `
        ${toastConfig.icon}
        <div class="toast-content">${message}</div>
        <span class="close-toast" aria-label="Cerrar notificación" tabindex="0">×</span>
        ${progressMarkup}
      `;

      // Rol accesible por tipo
      toast.setAttribute("role", type === "info" ? "status" : "alert");

      const closeBtn = toast.querySelector(".close-toast");
      closeBtn.addEventListener("click", () => this.remove(toast));
      if (options.closeOnClick ?? this.options.closeOnClick) {
        toast.addEventListener("click", (e) => {
          // Evita doble disparo si se hace click en el botón de cierre
          if (!e.target.classList.contains("close-toast")) this.remove(toast);
        });
      }

      // Configurar la duración de la animación de la barra de progreso
      if (duration > 0) {
        // Aplicar la duración personalizada a la animación
        toast.style.setProperty("--progress-duration", `${duration}ms`);

        setTimeout(() => {
          if (toast.parentNode) this.remove(toast);
        }, duration);
      }

      // Insertar según la posición
      if (position.includes("bottom")) {
        this.container.appendChild(toast);
      } else {
        this.container.insertBefore(toast, this.container.firstChild);
      }

      return toast;
    },

    remove: function (toast) {
      // Añade la clase de salida
      toast.classList.add("toastjs-fade-out");

      // Handler que solo reacciona a la animación del propio toast
      const onAnimationEnd = (e) => {
        // Ignora animaciones que provienen de elementos hijos (por ejemplo, la barra de progreso)
        if (e.target !== toast) return;
        // Una vez termina la animación de salida del toast, lo removemos del DOM
        toast.removeEventListener("animationend", onAnimationEnd);
        if (toast.parentNode) {
          toast.remove();
        }
      };

      // Escucha el final de la animación (sin "once" para no perder el evento por bubbling de hijos)
      toast.addEventListener("animationend", onAnimationEnd);

      // Fallback: en caso de que el evento animationend no se dispare, asegura la eliminación
      // El tiempo debe ser mayor al de la animación de salida (0.3s) para no cortar la animación
      setTimeout(() => {
        if (toast && toast.parentNode) {
          toast.removeEventListener("animationend", onAnimationEnd);
          toast.remove();
        }
      }, 600);
    },
  };

  // Asignación dinámica de métodos de conveniencia al prototipo
  ["info", "success", "warning", "error"].forEach(function (type) {
    ToastJS.prototype[type] = function (message, options) {
      return this.show(message, type, options);
    };
  });

  // Crear instancia global por defecto
  const defaultToast = new ToastJS();

  // API global
  const showToast = {
    // Crear nueva instancia
    create: function (options) {
      return new ToastJS(options);
    },

    // Métodos de la instancia por defecto
    show: function (message, type, options) {
      return defaultToast.show(message, type, options);
    },
  };

  // Asignación dinámica de métodos de conveniencia a la API global
  ["info", "success", "warning", "error"].forEach(function (type) {
    showToast[type] = function (message, options) {
      return defaultToast.show(message, type, options);
    };
  });

  // Exportar para diferentes entornos
  if (typeof module !== "undefined" && module.exports) {
    module.exports = showToast;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return showToast;
    });
  } else {
    global.showToast = showToast;
    global.ToastJS = ToastJS;
  }
})(typeof window !== "undefined" ? window : this);

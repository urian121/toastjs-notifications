/**
 * ToastJS Notifications
 * ==========================================
 *
 * La librería de notificaciones toast más elegante y minimalista para tu aplicación web.
 * Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional.
 *
 * @version     1.11.7
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

  const ANIMATION_DURATION = 10000; // 10 seconds

  // Constructor principal
  function ToastJS(options = {}) {
    this.options = {
      position: options.position || "top-right",
      duration: options.duration || 4000,
      maxToasts: options.maxToasts || 5,
      ...options,
    };
    this.container = null;
    this.toastCount = 0;
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

      // Detectar ruta del script actual (funciona con CDN o local)
      const currentScript =
        document.currentScript ||
        (function () {
          const scripts = document.getElementsByTagName("script");
          return scripts[scripts.length - 1];
        })();

      const scriptSrc = currentScript?.src || "";
      const basePath = scriptSrc.substring(0, scriptSrc.lastIndexOf("/"));

      link.href = `${basePath}/toast.css`;

      document.head.appendChild(link);
    },

    createContainer: function (position = this.options.position) {
      // Si el contenedor ya existe, actualizamos su clase
      if (this.container) {
        this.container.className = `toastjs-container ${position}`;
        return;
      }

      this.container = document.createElement("div");
      this.container.className = `toastjs-container ${position}`;
      this.container.id = "toastjs-container";
      document.body.appendChild(this.container);
    },

    show: function (message, type = "info", options = {}) {
      if (this.toastCount >= this.options.maxToasts) {
        this.removeOldest();
      }

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
      toast.innerHTML = `
        ${toastConfig.icon}
        <div class="toast-content">${message}</div>
        <span class="close-toast">×</span>
        <div class="toast-progress-bar"></div>
      `;

      const closeBtn = toast.querySelector(".close-toast");
      closeBtn.addEventListener("click", () => this.remove(toast));

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

      this.toastCount++;
      return toast;
    },

    remove: function (toast) {
      toast.classList.add("toastjs-fade-out");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
          this.toastCount--;
        }
      }, ANIMATION_DURATION);
    },

    removeOldest: function () {
      const oldestToast = this.container.querySelector(".my-toast");
      if (oldestToast) {
        this.remove(oldestToast);
      }
    },

    // Métodos de conveniencia
    info: function (message, options) {
      return this.show(message, "info", options);
    },

    success: function (message, options) {
      return this.show(message, "success", options);
    },

    warning: function (message, options) {
      return this.show(message, "warning", options);
    },

    error: function (message, options) {
      return this.show(message, "error", options);
    },
  };

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

    info: function (message, options) {
      return defaultToast.info(message, options);
    },

    success: function (message, options) {
      return defaultToast.success(message, options);
    },

    warning: function (message, options) {
      return defaultToast.warning(message, options);
    },

    error: function (message, options) {
      return defaultToast.error(message, options);
    },
  };

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

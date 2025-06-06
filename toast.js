/**
 * ToastJS Notifications
 * ==========================================
 *
 * La librería de notificaciones toast más elegante y minimalista para tu aplicación web.
 * Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional.
 *
 * @version     1.0.9
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

  const ANIMATION_DURATION = 1000;

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

    injectStyles: function () {
      if (document.getElementById("toastjs-styles")) return;

      const styles = `
    /* Base container styles */
    .toastjs-container {
      position: fixed;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 1000;
      max-width: 450px;
      width: calc(100% - 40px);
      pointer-events: none;
    }

    /* Position variants */
    .toastjs-container.top-left {
      top: 20px;
      left: 20px;
    }

    .toastjs-container.top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .toastjs-container.top-right {
      top: 20px;
      right: 20px;
    }

    .toastjs-container.bottom-left {
      bottom: 20px;
      left: 20px;
      flex-direction: column-reverse;
    }

    .toastjs-container.bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      flex-direction: column-reverse;
    }

    .toastjs-container.bottom-right {
      bottom: 20px;
      right: 20px;
      flex-direction: column-reverse;
    }

    .toastjs-container.center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .toastjs-container {
        width: calc(100% - 20px);
        max-width: none;
      }

      .toastjs-container.top-left,
      .toastjs-container.top-center,
      .toastjs-container.top-right {
        top: 10px;
        left: 10px;
        right: 10px;
        transform: none;
      }

      .toastjs-container.bottom-left,
      .toastjs-container.bottom-center,
      .toastjs-container.bottom-right {
        bottom: 10px;
        left: 10px;
        right: 10px;
        transform: none;
      }

      .toastjs-container.center {
        top: 50%;
        left: 10px;
        right: 10px;
        transform: translateY(-50%);
      }

      .my_toast {
        font-size: 13px;
        padding: 14px 48px 14px 46px;
      }

      .toast-icon {
        width: 18px;
        height: 18px;
        font-size: 11px;
        left: 14px;
      }

      .close-toast {
        width: 18px;
        height: 18px;
        font-size: 13px;
        right: 10px;
        top: 10px;
      }
    }

    @media (max-width: 480px) {
      .toastjs-container {
        width: calc(100% - 16px);
      }

      .toastjs-container.top-left,
      .toastjs-container.top-center,
      .toastjs-container.top-right {
        left: 8px;
        right: 8px;
        top: 8px;
      }

      .toastjs-container.bottom-left,
      .toastjs-container.bottom-center,
      .toastjs-container.bottom-right {
        left: 8px;
        right: 8px;
        bottom: 8px;
      }

      .toastjs-container.center {
        left: 8px;
        right: 8px;
      }

      .my_toast {
        font-size: 12px;
        padding: 12px 44px 12px 42px;
        border-radius: 10px;
      }

      .toast-icon {
        width: 16px;
        height: 16px;
        font-size: 10px;
        left: 12px;
      }

      .close-toast {
        width: 16px;
        height: 16px;
        font-size: 12px;
        right: 8px;
        top: 8px;
      }
    }

    .my_toast {
      position: relative;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-left: 4px solid #6366f1;
      color: #374151;
      font-weight: 400;
      font-size: 14px;
      padding: 16px 52px 16px 52px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
      animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      opacity: 1;
      min-height: 20px;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      pointer-events: auto;
    }

    .toast-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background: #6366f1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
    }

    .toast-content {
      flex: 1;
      line-height: 1.4;
      word-wrap: break-word;
      word-break: break-word;
      hyphens: auto;
      padding-right: 8px;
    }

    .close-toast {
      position: absolute;
      top: 6px;
      right: 12px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      color: #9ca3af;
      transition: all 0.2s ease;
      background: transparent;
    }

    .close-toast:hover {
      color: #333;
      transform: scale(1.1);
    }

    /* Animations for different positions */
    @keyframes slideInLeft {
      0% {
        opacity: 0;
        transform: translateX(-100px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(100px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes slideInTop {
      0% {
        opacity: 0;
        transform: translateY(-100px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideInBottom {
      0% {
        opacity: 0;
        transform: translateY(100px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .toastjs-fade-out {
      animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes slideOutLeft {
      to {
        opacity: 0;
        transform: translateX(-100px) scale(0.9);
      }
    }

    /* Variantes de toast */
    .my_toast.success {
      border-left-color: #10b981;
    }

    .my_toast.success .toast-icon {
      background: #10b981;
    }

    .my_toast.warning {
      border-left-color: #f59e0b;
    }

    .my_toast.warning .toast-icon {
      background: #f59e0b;
    }

    .my_toast.error {
      border-left-color: #ef4444;
    }

    .my_toast.error .toast-icon {
      background: #ef4444;
    }
    `;

      const styleSheet = document.createElement("style");
      styleSheet.id = "toastjs-styles";
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
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
        info: { icon: "🔔", class: "info" },
        success: { icon: "✓", class: "success" },
        warning: { icon: "⚠", class: "warning" },
        error: { icon: "✕", class: "error" },
      };

      const toastConfig = config[type] || config.info;
      const duration = options.duration ?? this.options.duration;
      const position = options.position ?? this.options.position;

      // Actualiza el contenedor para la nueva posición
      this.createContainer(position);

      const toast = document.createElement("div");
      toast.className = `my_toast ${toastConfig.class}`;
      toast.innerHTML = `
        <div class="toast-icon">${toastConfig.icon}</div>
        <div class="toast-content">${message}</div>
        <span class="close-toast">×</span>
      `;

      const closeBtn = toast.querySelector(".close-toast");
      closeBtn.addEventListener("click", () => this.remove(toast));

      if (duration > 0) {
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
      const oldestToast = this.container.querySelector(".my_toast");
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

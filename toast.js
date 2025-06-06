/**
 * ToastJS Notifications
 * ==========================================
 *
 * La librería de notificaciones toast más elegante y minimalista para tu aplicación web.
 * Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional.
 *
 * @version     1.10.2
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
      gap: 4px;
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
      .close-toast {
        width: 16px;
        height: 16px;
        font-size: 12px;
        right: 8px;
        top: 8px;
      }
    }

    .my_toast {
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      background: rgba(255, 255, 255, 0.95);
      color: #374151;
      font-weight: 400;
      font-size: 15px;
      padding: 16px 52px 16px 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
      animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      opacity: 1;
      min-height: 20px;
      width: 100%;
      box-sizing: border-box;
      pointer-events: auto;
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
      top: 2px;
      right: 8px;
      font-size: 25px;
      font-weight: 500;
      cursor: pointer;
      color: #333;
      transition: all 0.2s ease;
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

  /* Barra de progreso */
  .toast-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0 0 12px 12px;
    overflow: hidden;
    width: 100%;
  }

  .toast-progress-bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: currentColor;
    width: 100%;
    transform: translateX(-100%);
    animation: progress-animation var(--progress-duration, 4000ms) linear forwards;
  }

  /* Animación de la barra de progreso */
  @keyframes progress-animation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  /* Colores específicos para cada tipo de toast */
  .my_toast.success .toast-progress-bar::before {
    background: #10b981;
  }

  .my_toast.warning .toast-progress-bar::before {
    background: #f59e0b;
  }

  .my_toast.error .toast-progress-bar::before {
    background: #ff5e53;
  }

  .my_toast.info .toast-progress-bar::before {
    background: #6366f1;
  }

  /* SVG */
    .checkmark {
    width: 30px;
    height: 30px;
    margin-right: 6px;
    flex-shrink: 0;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px currentColor;
    animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
    position: relative;
  }

  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    fill: #fff;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark__check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  .checkmark__dot {
    fill: currentColor;
    opacity: 0;
    animation: fadeIn 0.3s ease 1s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes scale {
    0%, 100% {
      transform: none;
    }

    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px currentColor;
    }
  }

  @keyframes fadeIn {
    100% {
      opacity: 1;
    }
  }

  /* Colores por tipo */
  .checkmark.success {
    stroke: #10b981;
    color: #10b981;
  }

  .checkmark.warning {
    stroke: #ff9800;
    color: #ff9800;
  }

  .checkmark.error {
    stroke: #f44336;
    color: #f44336;
  }

  .checkmark.info {
    stroke: #6366f1;
    color: #6366f1;
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
      toast.className = `my_toast ${toastConfig.class}`;
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

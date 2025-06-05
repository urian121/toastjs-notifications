/**
 * ToastJS - Modern Toast Notification Library
 * Version: 1.0.0
 * Author: Urian Viera
 * License: MIT
 */

(function (global) {
  "use strict";

  // Constructor principal
  function ToastJS(options = {}) {
    this.options = {
      position: options.position || "top-left",
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
    #toastjs-container {
      position: fixed;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 1000;
      max-width: 450px;
      width: calc(100% - 40px);
    }

    @media (max-width: 768px) {
      #toastjs-container {
        left: 10px;
        right: 10px;
        top: 10px;
        width: calc(100% - 20px);
        max-width: none;
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
      #toastjs-container {
        left: 8px;
        right: 8px;
        top: 8px;
        width: calc(100% - 16px);
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
    }

    .toast-icon {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 35px;
      height: 35px;
      background: #6366f1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
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
      font-size: 25px;
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

    .fade-out {
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

    createContainer: function () {
      if (this.container) return;

      this.container = document.createElement("div");
      this.container.className = `toastjs-container ${this.options.position}`;
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
      const duration = options.duration || this.options.duration;

      const toast = document.createElement("div");
      toast.className = `my_toast ${toastConfig.class}`;
      toast.innerHTML = `
        <div class="toast-icon">${toastConfig.icon}</div>
        <div class="toast-content">${message}</div>
        <span class="close-toast">×</span>
      `;


      // Event listeners
      const closeBtn = toast.querySelector(".close-toast");
      closeBtn.addEventListener("click", () => this.remove(toast));

      // Auto-remove
      if (duration > 0) {
        setTimeout(() => {
          if (toast.parentNode) {
            this.remove(toast);
          }
        }, duration);
      }

      // Add to container
      if (this.options.position.includes("bottom")) {
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
      }, 300);
    },

    removeOldest: function () {
      const oldestToast = this.container.querySelector(".toast");
      if (oldestToast) {
        this.remove(oldestToast);
      }
    },

    clear: function () {
      const toasts = this.container.querySelectorAll(".toast");
      toasts.forEach((toast) => this.remove(toast));
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
  const Toast = {
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

    clear: function () {
      return defaultToast.clear();
    },
  };

  // Exportar para diferentes entornos
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Toast;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return Toast;
    });
  } else {
    global.Toast = Toast;
    global.ToastJS = ToastJS;
  }
})(typeof window !== "undefined" ? window : this);

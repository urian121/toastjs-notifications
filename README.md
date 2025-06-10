# 🎉 ToastJS Notifications

[![npm version](https://img.shields.io/npm/v/toastjs-notifications.svg?style=flat-square)](https://www.npmjs.com/package/toastjs-notifications)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/toastjs-notifications)
[![npm](https://img.shields.io/npm/dt/toastjs-notifications.svg)](https://www.npmjs.com/package/toastjs-notifications)

**ToastJS Notifications** es la librería de notificaciones toast más elegante y minimalista para tu aplicación web. Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional.

![demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/toastjs-notifications.gif)

## 📦 Instalación

### 📦 npm

```bash
npm install toastjs-notifications
```

### 📦 CDN
Puedes usar **ToastJS Notifications** a través de CDN. Aquí tienes dos opciones:


#### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/toastjs-notifications@1.11.11/toast-notifications.min.js"></script>
```

#### unpkg

```html
<script src="https://unpkg.com/toastjs-notifications@1.11.11/toast-notifications.min.js"></script>
```

## 🚀 Uso Básico

Puedes usar ToastJS Notifications de la siguiente manera:

```javascript
// Mostrar diferentes tipos de notificaciones
showToast.info("Mensaje de información"); // Notificación de información
showToast.success("¡Éxito!"); // Notificación de éxito
showToast.warning("Advertencia"); // Notificación de advertencia
showToast.error("Error"); // Notificación de error
```

## 🎨 Posicionamiento Dinámico

Ahora puedes definir la posición directamente desde el objeto de opciones en cada llamada:

```javascript
showToast.error("Error crítico", {
  duration: 2000,
  position: "top-center",
});

showToast.success("Guardado exitoso", {
  position: "bottom-right",
});
```

### Posiciones disponibles:

Estas son las posiciones disponibles para los **ToastJS Notifications**:

- `top-left`
- `top-center`
- `top-right` (por defecto)
- `bottom-left`
- `bottom-center`
- `bottom-right`

### Duración Personalizada por Toast

```javascript
// Toast con duración de 2 segundos
showToast.warning("Duración personalizada", { duration: 2000 });

// Toast persistente (requiere cierre manual)
showToast.info("Este mensaje no se cierra solo", { duration: 0 });
```

## 📱 Características

- 🎯 Diseño moderno y responsive
- 🌈 Tipos: `info`, `success`, `warning`, `error`
- 📍 Posicionamiento dinámico por toast o instancia
- ⚡ Animaciones suaves
- 🎨 Personalizable
- 🚀 Sin dependencias externas
- 💪 Soporte para múltiples instancias

## 📝 Ejemplo Completo

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ToastJS Notifications - Demo</title>
  </head>
  <body>
    <!-- Botón de demostración que muestra un toast de éxito -->
    <button id="show-toast">Mostrar Toast</button>

    <!-- Incluimos la librería ToastJS desde el CDN -->
    <script src="https://cdn.jsdelivr.net/npm/toastjs-notifications@1.11.11/toast-notifications.min.js"></script>

    <!-- Código de inicialización -->
    <script>
      document.getElementById("show-toast").addEventListener("click", () => {
        // Mostramos un mensaje de bienvenida 8 segundos después de que la página cargue
        showToast.success("¡Bienvenido a ToastJS Notifications! 🎉", {
          duration: 8000, // Duración en milisegundos
          position: "top-center", // Posición del toast
        });
      });
    </script>
  </body>
</html>
```

## 🤝 Únete y Contribuye

¿Tienes una idea o encontraste un bug? ¡Contribuye!

🔗 GitHub: [github.com/urian121/toastjs-notifications](https://github.com/urian121/toastjs-notifications)

## 👨‍💻 Desarrollador

**Urian Viera**  
🌐 [urianviera.com](https://www.urianviera.com)  
📺 [YouTube](https://www.youtube.com/WebDeveloperUrianViera)  
💌 [urian1213viera@gmail.com](mailto:urian1213viera@gmail.com)  
☕ [Apóyame en PayPal](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)

## 🪪 Licencia

MIT © 2025 Urian Viera

[![GitHub](https://img.shields.io/badge/GitHub-urian121/toastjs--notifications-181717?logo=github&style=flat-square)](https://github.com/urian121/toastjs-notifications)

## 🙌 Agradecimientos

Gracias a todos los **Devs** 👨‍💻 que han usado y apoyado **ToastJS Notifications**. Tu feedback es clave para mejorar la librería.
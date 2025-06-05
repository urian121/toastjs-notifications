# 🎉 ToastJS - Modern Toast Notifications Library

[![npm version](https://img.shields.io/npm/v/toastjs-notifications.svg?style=flat-square)](https://www.npmjs.com/package/toastjs-notifications)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/toastjs-notifications)
[![npm](https://img.shields.io/npm/dt/toastjs-notifications.svg)](https://www.npmjs.com/package/toastjs-notifications)

✨ La librería de notificaciones toast más elegante y minimalista para tu aplicación web. Con animaciones suaves, diseño moderno y una experiencia de usuario excepcional. ¡Haz que tus notificaciones destaquen con estilo! 🚀

## 📦 Instalación

### NPM
```bash
npm install toastjs-notifications
```

### CDN
```html
<!-- Usando unpkg -->
<script src="https://unpkg.com/toastjs-notifications@1.0.8"></script>

<!-- O usando jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/toastjs-notifications@1.0.8"></script>
```

## 🚀 Uso Básico

```javascript
// Mostrar diferentes tipos de notificaciones
Toast.info('Mensaje de información');
Toast.success('¡Éxito!');
Toast.warning('Advertencia');
Toast.error('Error');

// Limpiar todas las notificaciones
Toast.clear();
```

## 🎨 Posicionamiento Dinámico

Ahora puedes definir la posición directamente desde el objeto de opciones en cada llamada:

```javascript
Toast.error('Error crítico', {
  duration: 2000,
  position: 'top-center'
});

Toast.success('Guardado exitoso', {
  position: 'bottom-right'
});
```

### Posiciones disponibles:
- `top-left`
- `top-center`
- `top-right` (por defecto)
- `bottom-left`
- `bottom-center`
- `bottom-right`

## ⚙️ Configuración Avanzada

### Duración Personalizada por Toast

```javascript
// Toast con duración de 2 segundos
Toast.warning('Duración personalizada', { duration: 2000 });

// Toast persistente (requiere cierre manual)
Toast.info('Este mensaje no se cierra solo', { duration: 0 });
```

### Instancia Personalizada Global
```javascript
const customToast = Toast.create({
  position: 'bottom-right', // Posición del toast
  duration: 2500, // Duración en milisegundos
  maxToasts: 3 // Número máximo de toasts mostrados simultáneamente
});
customToast.success('¡Toast personalizado!');
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
<html>
<head>
  <title>ToastJS Demo</title>
</head>
<body>
  <button onclick="Toast.success('¡Operación exitosa!', { position: 'bottom-center' })">
    Mostrar Toast
  </button>

  <script src="https://cdn.jsdelivr.net/npm/toastjs-notifications@1.0.8"></script>
  <script>
    setTimeout(() => {
      Toast.success('¡Bienvenido a ToastJS! 🎉', {
        duration: 3000,
        position: 'top-center'
      });
    }, 1000);
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

Gracias a todos los **Devs** 👨‍💻 que han usado y apoyado **ToastJS**. Tu feedback es clave para mejorar la librería.

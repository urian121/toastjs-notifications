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
<script src="https://unpkg.com/toastjs-notifications@1.0.4"></script>

<!-- O usando jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/toastjs-notifications@1.0.4"></script>
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

## 🎨 Diferentes Posiciones

ToastJS soporta múltiples posiciones para mostrar las notificaciones:

```javascript
// Crear toast en diferentes posiciones
const topRightToast = Toast.create({ position: 'top-right' });
topRightToast.success('¡Toast en la esquina superior derecha!');

const bottomCenterToast = Toast.create({ position: 'bottom-center' });
bottomCenterToast.info('Toast centrado en la parte inferior');
```

Posiciones disponibles:
- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## ⚙️ Configuración Avanzada

### Duración Personalizada por Toast

Cada método `Toast` (`info`, `success`, `warning`, `error`) puede recibir un segundo parámetro con opciones personalizadas, como la duración:

```javascript
// Toast con duración de 2 segundos
Toast.error('Error: algo salió mal', { duration: 2000 });

// Toast que se mantiene visible hasta que el usuario lo cierre
Toast.warning('Este mensaje no se cierra automáticamente', { duration: 0 });

```

### Instancia Personalizada
```javascript
const customToast = Toast.create({
  position: 'bottom-right',
  duration: 2000,
  maxToasts: 3
});
```

## 🛠️ Opciones de Configuración

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| position | string | 'top-left' | Posición del toast ('top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right') |
| duration | number | 4000 | Duración en milisegundos (0 para persistente) |
| maxToasts | number | 5 | Número máximo de toasts simultáneos |

## 📱 Características

- 🎯 Diseño moderno y responsive
- 🌈 Diferentes tipos de notificaciones (info, success, warning, error)
- 📍 Múltiples posiciones de visualización
- ⚡ Animaciones suaves
- 🎨 Personalizable
- 📱 Totalmente responsive
- 🚀 Sin dependencias
- 💪 Soporte para múltiples instancias

## 📝 Ejemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
  <title>ToastJS Demo</title>
  <script src="https://unpkg.com/toastjs-notifications"></script>
</head>
<body>
  <button onclick="Toast.success('¡Operación exitosa!')">
    Mostrar Toast
  </button>

  <script>
    // Toast de bienvenida
    setTimeout(() => {
      Toast.success('¡Bienvenido a ToastJS! 🎉');
    }, 1000);
  </script>
</body>
</html>
```

## 🤝 Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request
en GitHub: https://github.com/urian121/toastjs-notifications

## 👨‍💻 Desarrollador

**Urian Viera**  
🌐 [urianviera.com](https://www.urianviera.com)  
📺 [YouTube](https://www.youtube.com/WebDeveloperUrianViera)  
💌 [urian1213viera@gmail.com](mailto:urian1213viera@gmail.com)  
☕ [¡Apóyame en PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)

## Copyright

© 2024 Urian Viera. Todos los derechos reservados.

## License

Licensed under MIT

[![GitHub](https://img.shields.io/badge/GitHub-urian121/toastjs--notifications-181717?logo=github&style=flat-square)](https://github.com/urian121/toastjs-notifications)

## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **toastjs-notifications**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.
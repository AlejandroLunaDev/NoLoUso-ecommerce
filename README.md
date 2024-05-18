<div align="center">
    <img src="./public/nlufavicon.svg" height="200">
</div>

# Proyecto Ecommerce NoLoUso

[![website](https://img.shields.io/badge/Website-Up-brightgreen)](https://no-lo-uso-ecommerce.vercel.app/)

## Descripción

**NoLoUso** es una aplicación de ecommerce Full-Stack desarrollada con el stack MERN (MongoDB, Express, React, Node.js). Este proyecto permite la compra y venta de productos usados, proporcionando una plataforma intuitiva tanto para usuarios comunes (USER) como para administradores (ADMIN).

Los usuarios pueden explorar productos, agregarlos al carrito y realizar compras. Los administradores tienen capacidades adicionales para gestionar productos, categorías y usuarios del sistema, asegurando un ambiente controlado y seguro.

## Tecnologías Utilizadas

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Características

- **Autenticación y Autorización:** Registro e inicio de sesión para usuarios y administradores.
- **Gestión de Productos:** Los administradores pueden agregar, editar y eliminar productos.
- **Carrito de Compras:** Funcionalidad completa de carrito de compras para usuarios.
- **Pasarela de Pago:** Integración con pasarela de pago segura.
- **Interfaz Responsiva:** Diseño adaptable para dispositivos móviles y de escritorio.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/nolouso-ecommerce.git

# Navega al directorio del proyecto
cd nolouso-ecommerce

# Instala las dependencias del frontend y backend
npm install

# Construye el frontend y el backend
npm run build:frontend
npm run build:backend

# Inicia el frontend en modo producción
npm run start:frontend:prod```

## Uso

Para usar la aplicación, sigue estos pasos:

Inicio de Sesión: Regístrate o inicia sesión como usuario o administrador.
Explorar Productos: Navega por la lista de productos disponibles.
Gestión de Productos: (Solo administradores) Agrega, edita o elimina productos.
Carrito de Compras: Agrega productos al carrito y procede a la compra.
Finalizar Compra: Usa la pasarela de pago integrada para completar la compra.

##Contribución


Tu README.md ya tiene una buena estructura y detalles clave. Sin embargo, aquí hay algunas mejoras que pueden hacerlo aún más profesional:

Agregar una sección de 'Tabla de Contenidos' para facilitar la navegación.
Añadir más detalles en la sección de instalación para asegurarse de que los pasos sean claros para cualquier desarrollador.
Incluir una sección de 'Configuración' para explicar cómo configurar variables de entorno o cualquier otra configuración necesaria.
Proveer un ejemplo de cómo iniciar la aplicación después de la instalación.
Agregar una sección de 'Licencia' y mejorar la referencia al autor.
Incluir un archivo LICENSE si no lo tienes ya.
Añadir un ejemplo de uso con capturas de pantalla, si es posible.
Proveer enlaces adicionales a la documentación, tutoriales o recursos relacionados.
Aquí tienes una versión mejorada de tu README.md:

markdown
Copy code
<div align="center">
    <img src="./public/nlufavicon.svg" height="200">
</div>

# Proyecto Ecommerce NoLoUso

[![website](https://img.shields.io/badge/Website-Up-brightgreen)](https://no-lo-uso-ecommerce.vercel.app/)

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Contribución](#contribución)
- [Autor](#autor)
- [Licencia](#licencia)

## Descripción

**NoLoUso** es una aplicación de ecommerce Full-Stack desarrollada con el stack MERN (MongoDB, Express, React, Node.js). Este proyecto permite la compra y venta de productos usados, proporcionando una plataforma intuitiva tanto para usuarios comunes (USER) como para administradores (ADMIN).

Los usuarios pueden explorar productos, agregarlos al carrito y realizar compras. Los administradores tienen capacidades adicionales para gestionar productos, categorías y usuarios del sistema, asegurando un ambiente controlado y seguro.

## Tecnologías Utilizadas

- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Características

- **Autenticación y Autorización:** Registro e inicio de sesión para usuarios y administradores.
- **Gestión de Productos:** Los administradores pueden agregar, editar y eliminar productos.
- **Carrito de Compras:** Funcionalidad completa de carrito de compras para usuarios.
- **Pasarela de Pago:** Integración con pasarela de pago segura.
- **Interfaz Responsiva:** Diseño adaptable para dispositivos móviles y de escritorio.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/nolouso-ecommerce.git

# Navega al directorio del proyecto
cd nolouso-ecommerce

# Instala las dependencias del frontend y backend
npm install
Configuración
Crea un archivo .env en el directorio backend con las siguientes variables de entorno:
plaintext
Copy code
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Asegúrate de tener configuradas las variables de entorno necesarias para el frontend y el backend.
Scripts Disponibles
En el directorio del proyecto, puedes ejecutar los siguientes scripts:

Desarrollo
bash
Copy code
# Ejecuta tanto el frontend como el backend en modo desarrollo
npm run dev
Instalación de Dependencias
bash
Copy code
# Instala las dependencias del frontend y backend
npm install
Construcción del Proyecto
bash
Copy code
# Construye el frontend y el backend
npm run build:frontend
npm run build:backend
Producción
bash
Copy code
# Inicia el frontend en modo producción
npm run start:frontend:prod
Uso
Para usar la aplicación, sigue estos pasos:

Inicio de Sesión: Regístrate o inicia sesión como usuario o administrador.
Explorar Productos: Navega por la lista de productos disponibles.
Gestión de Productos: (Solo administradores) Agrega, edita o elimina productos.
Carrito de Compras: Agrega productos al carrito y procede a la compra.
Finalizar Compra: Usa la pasarela de pago integrada para completar la compra.
Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
Abre un Pull Request.

## Autor

Alejandro Luna https://github.com/AlejandroLunaDev/AlejandroLunaDev
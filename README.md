# 📋 CRUD de Clientes con Next.js, Firebase y Tailwind CSS

## 📝 Descripción del Proyecto

Este proyecto es una aplicación web para gestionar un listado de clientes mediante un CRUD (Create, Read, Update, Delete). Está desarrollado con **Next.js**, **Firebase**, **TypeScript** y **Tailwind CSS**, asegurando eficiencia, escalabilidad y una interfaz atractiva. ✨

---

## ⚡ Funcionalidades Principales

✅ **Agregar Clientes**

- Formulario con los siguientes campos:
  - Nombre 🏷️
  - Email 📧
  - Fecha de Nacimiento 🎂
  - Teléfono 📞
  - DNI 🆔

✅ **Listar Clientes**

- Tabla con opciones para ver detalles, editar o eliminar.

✅ **Editar Clientes**

- Formulario prellenado con los datos actuales del cliente.

✅ **Ver Detalles**

- Modal estilizado con la información detallada.

✅ **Eliminar Clientes**

- Eliminación rápida con un solo clic.

✅ **Filtrado y Ordenamiento**

- Filtrar clientes por nombre o email.
- Ordenar la lista por:
  - Nombre (A-Z o Z-A)
  - Email (A-Z o Z-A)

✅ **Modal Reutilizable**

- Usado para agregar/editar clientes y mostrar detalles.

---

## 🛠️ Tecnologías Utilizadas

### 🔹 Frontend

- **Next.js** 🚀: Framework de React para aplicaciones modernas.
- **TypeScript** 🏗️: Tipado estático para mayor seguridad y mantenibilidad.
- **Tailwind CSS** 🎨: Framework utilitario para estilizar sin escribir CSS.
- **React** ⚛️: Biblioteca para interfaces interactivas.

### 🔹 Backend

- **Firebase** 🔥: Plataforma backend con:
  - **Firestore**: Base de datos NoSQL en tiempo real.
  - **Authentication** (opcional): Para manejar autenticación de usuarios.

### 🔹 Herramientas Adicionales

- **ESLint** 🧹: Garantiza código limpio y sin errores.
- **Prettier** 🎨: Mantiene un formato de código consistente.
- **Intl.DateTimeFormat** 🗓️: Formatea fechas de manera localizada.

---

## 📂 Estructura del Proyecto

```
crud-clientes/
├── app/                     # Rutas y páginas (App Router de Next.js)
│   ├── page.tsx             # Página principal (CRUD)
│   └── layout.tsx           # Layout global
├── components/              # Componentes reutilizables
│   ├── ClientForm.tsx       # Formulario para agregar/editar clientes
│   ├── ClientList.tsx       # Lista de clientes
│   ├── ClientDetailsModal.tsx # Modal para ver detalles de un cliente
│   ├── Modal.tsx            # Componente de modal genérico
│   └── ClientFilter.tsx     # Filtros y ordenamiento
├── lib/                     # Configuración de Firebase
│   └── firebase.ts          # Inicialización de Firebase
├── types/                   # Tipos centralizados
│   └── Client.ts            # Tipos relacionados con los clientes
├── styles/                  # Estilos globales
│   └── globals.css          # Estilos base de Tailwind CSS
└── tsconfig.json            # Configuración de TypeScript
```

---

## 🚀 Cómo Funciona

🔹 **Conexión a Firebase**

- Configuración en `lib/firebase.ts`.
- Firestore almacena y recupera datos en tiempo real.

🔹 **Gestión de Datos**

- **Create** ➝ Agregar nuevos clientes.
- **Read** ➝ Mostrar clientes en una tabla.
- **Update** ➝ Editar datos de un cliente.
- **Delete** ➝ Eliminar clientes de la lista.

🔹 **Interacción con el Usuario**

- Formularios y modales reutilizables para CRUD.
- Filtrado y ordenamiento dinámico.

---

## 🏗️ Cómo Ejecutar el Proyecto

### 📌 Requisitos Previos

- **Node.js** (v16 o superior) 🖥️
- **Cuenta en Firebase** 🔥

### 📌 Pasos para Ejecutar

1️⃣ **Clonar el repositorio**

```bash
git clone https://github.com/JCFavaretto/crud-clientes.git
cd crud-clientes
```

2️⃣ **Instalar dependencias**

```bash
npm install
```

3️⃣ **Configurar Firebase**

- Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
- Agregar credenciales en `lib/firebase.ts`.

4️⃣ **Iniciar el servidor**

```bash
npm run dev
```

5️⃣ **Abrir la aplicación**

```bash
http://localhost:3000
```

---

## 📸 Capturas de Pantalla

📌 **Lista de Clientes** 📝
📌 **Modal de Agregar/Editar** ➕
📌 **Modal de Detalles** 🔍

_(Agrega aquí capturas de pantalla si es necesario.)_

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! 🎉 Si quieres mejorar la aplicación, puedes:

- **Abrir un issue** para reportar errores o sugerir mejoras.
- **Enviar un pull request** con tus cambios.

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

✨ ¡Gracias por visitar este proyecto! ✨
#
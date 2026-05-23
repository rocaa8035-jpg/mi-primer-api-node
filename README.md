# 📝 API de Tareas Pendientes (To-Do List API)

Una API REST básica y funcional construida con **Node.js** y **Express** para gestionar tareas pendientes. Este proyecto cuenta con persistencia de datos local mediante el almacenamiento de un archivo en formato JSON.

[Probar Ahora](https://mi-primer-api-node.onrender.com)

## 🚀 Características
- **Operaciones CRUD completas:** Permite Leer (`GET`), Crear (`POST`), Actualizar estado (`PUT`) y Eliminar (`DELETE`) tareas.
- **Persistencia Local:** Los datos no se pierden al reiniciar el servidor gracias al uso del módulo nativo `fs/promises` de Node.js.
- **Formato Estándar:** Respuestas y solicitudes estructuradas completamente en formato JSON.

## 🛠️ Tecnologías utilizadas
- **Node.js** (Entorno de ejecución)
- **Express** (Framework web)
- **JavaScript (ES6+)**

---

## 💻 Instalación y Uso

Sigue estos pasos para clonar y ejecutar el proyecto en tu computadora local:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema.

### 2. Clonar el repositorio
```bash
git clone [https://github.com/rocaa8035-jpg/mi-primer-api-node.git](https://github.com/rocaa8035-jpg/mi-primer-api-node.git)
cd mi-primer-api-node
```

### 3. Instalar dependencias
Descarga los paquetes necesarios (Express) definidos en el package.json:
```bash
npm install
```

### 4. Iniciar el servidor
Enciende la aplicación ejecutando:
```bash
node index.js
```
El servidor se iniciará en: http://localhost:3000

### 📌 Rutas de la API (Endpoints)

| Método  | Ruta  | Descripción  | Cuerpo de la Petición (JSON)  |
| --- | --- | --- | --- |
| GET  | /tareas  | Obtiene la lista completa de tareas guardadas.  | No requiere  |
| POST  | /tareas  | Crea una nueva tarea (por defecto como pendiente).  | {"texto": "Mi nueva tarea"}  |
| PUT  | /tareas/:id  | Alterna el estado de una tarea (completada de true a false o viceversa).  | No requiere  |
| DELETE  | /tareas/:id  | Elimina definitivamente una tarea usando su ID.  | No requiere  |

### Ejemplo de respuesta (GET /tareas):
```JSON
[
  {
    "id": 1,
    "texto": "Aprender lo básico de Node.js",
    "completada": true
  }
]
```

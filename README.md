# 📊 OrgSync - Sistema de Gestión Organizacional

OrgSync es una API RESTful construida con Node.js, Express y MongoDB que permite gestionar empleados, departamentos, encargados y áreas dentro de una organización. El sistema incluye autenticación JWT, documentación Swagger y un manejo robusto de errores.

---

## 🚀 Características Principales

- 🔐 **Autenticación JWT** segura y personalizada
- 🧠 **Validaciones cruzadas** entre entidades
- 🗃️ CRUD completo para:
  - Empleados
  - Departamentos
  - Encargados (Managers)
  - Áreas
- 🧩 Integridad referencial garantizada con Mongoose
- 🧪 Documentación profesional con **Swagger**
- 📡 Comunicación frontend-backend con **Axios**
- ⚙️ Middleware global para manejo de errores

---

---

## 🔐 Usuarios y Acceso

El sistema cuenta con dos usuarios definidos en el archivo `authService.js`:

| Usuario | Contraseña     | Rol    | Mensaje Especial                     |
|---------|----------------|--------|--------------------------------------|
| `admin` | `admin123`     | admin | —                                    |
| `jair`  | `elmejorprofe` | admin | Sabemos que es el mejor profe 💙     |

---

### 🎨 Interfaz Dinámica en el Frontend

Dependiendo del usuario que inicie sesión:

- El **usuario `jair`** verá un mensaje especial en el dashboard.
- El sistema muestra distintos elementos visuales o secciones según el rol o usuario.
- Esto permite personalizar la experiencia de usuario y validar la autenticación desde el cliente (React).

---

💡 **Nota**: Los usuarios están definidos en el backend y se autentican sin necesidad de una base de datos. El token JWT generado incluye información del usuario y se usa para controlar el acceso a las rutas protegidas.



## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Base de datos**: MongoDB + Mongoose
- **Autenticación**: JSON Web Tokens (JWT)
- **Documentación**: Swagger UI
- **Frontend**: React (no incluido en este repo)
- **HTTP Cliente**: Axios

---

## 📁 Estructura del Proyecto

```
├── index.js
├── swagger.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── employee.js
│   ├── department.js
│   ├── manager.js
│   └── area.js
├── routes/
│   ├── employeeRouter.js
│   ├── departmentRouter.js
│   ├── managerRouter.js
│   └── areaRouter.js
├── services/
│   ├── employeeService.js
│   ├── departmentService.js
│   ├── managerService.js
│   └── areaService.js
└── .env
```

---

## 📑 Documentación Swagger

Una vez corras el proyecto, accede a la documentación desde:  
👉 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

Incluye endpoints para todos los recursos: `GET`, `POST`, `PATCH`, `PUT`, `DELETE`.

---

## 🔒 Autenticación

- Inicia sesión y obtén un JWT válido.
- Incluye el token en los headers:  
  `Authorization: Bearer <token>`

---

## 🧪 Ejecución del Proyecto

1. Clona el repositorio
2. Instala dependencias:
```bash
npm install
```
3. Crea un archivo `.env` con tu variable de entorno `TOKEN_SECRET`
4. Corre el servidor:
```bash
npm start
```

---

## 📋 Casos de Prueba (Postman)

### 🔑 Tokens

- **Token válido** (usuario con permisos):  
  `Bearer eyJhbGciOi...`  
- **Token inválido**:  
  `Bearer token_invalido`

### 👤 Empleados

- GET todos: `GET /employee`
- GET por ID: `GET /employee/{id}`
- Crear: `POST /employee`  
  Cuerpo (JSON):
  ```json
  {
    "firstName": "Laura",
    "lastName": "González",
    "age": 29,
    "gender": "F",
    "department1": "665db1...",
    "department2": "665db2...",
    "department3": "665db3..."
  }
  ```

- Reemplazo con restricción (PATCH):  
  `PATCH /employee/{id}`  
  Se requiere el campo `override: true` para modificar un departamento.

### 🏢 Departamentos

- Crear o editar: requiere que `managerId` y `areaId` existan previamente.
- Eliminar con seguridad:  
  - Falla si está en uso.
  - Funciona si se añade `?force=true`

### 🧨 Eliminación Condicional

- Ejemplo de eliminación forzada:
  ```http
  DELETE /department/DP001?force=true
  ```

---

## 📦 IDs Útiles para Pruebas

| Entidad     | Ejemplo ID        |
|-------------|-------------------|
| Empleado    | EMP123            |
| Manager     | MNG001            |
| Área        | AREA001           |
| Departamento| DP001             |

---

## 👥 Contribuyentes

- Ángel David Onesto Frías
- Marcos Ariciaga Valdez
- Giorgio Lisandro Téllez Barrón
- Samuel Yoshua Guzmán Gutiérrez


---

## 📜 Licencia

Este proyecto es educativo y forma parte de la materia "Programación para el Desarrollo de Aplicaciones Web" en la Universidad La Salle Bajío.

---

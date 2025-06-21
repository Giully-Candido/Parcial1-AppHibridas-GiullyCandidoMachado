# Excusas Creativas

## Descripción

**Excusas Creativas** Es una red social donde los usuarios registrados pueden agregar sus excusas a la base de datos, editarlas y eliminarlas. Los visitantes no registrados pueden ver todos los contextos y buscar la excusa que más les guste. 

La aplicación permite crear, editar, borrar y filtrar excusas por contexto, así como navegar por las excusas de cada categoría.

## Tecnologías utilizadas

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express 
- **Base de datos:** MongoDB
- **API REST:** Para la gestión de excusas y contextos

---

## Ejecución

- **back-end**: 
    cd back-end
    npm install
    npx nodemon

- **front-end**:
    cd front-end
    npm install
    npm start

---

## Estructura del proyecto

```
src/
  components/     #Componentes reutilizables
  views/          #Vistas principales
  services/       #Servicios para consumir la API
  App.js          #Componente principal de la app
  index.js        #Punto de entrada
```

---

## Funcionalidades principales

- **Ver excusas:** Feed principal con todas las excusas y filtro por contexto/categoría.
- **Crear excusa:** Formulario para agregar una nueva excusa, eligiendo contexto y credibilidad.
- **Editar/Borrar excusa:** Gestión de excusas propias.
- **Filtrar por contexto:** Menú dinámico de categorías/contextos que se obtiene del backend.
- **Ver excusas por contexto:** Página dedicada a cada contexto con sus excusas.
- **Feedback al usuario:** Mensajes de éxito y error, modales de confirmación y toasts.
---

## Autor

-Giuly Candido Machado - Aplicaciones Híbridas - Profesor: Jonathan Emanuel Cruz - dwt4av


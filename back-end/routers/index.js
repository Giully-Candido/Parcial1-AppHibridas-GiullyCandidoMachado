//este archivo se encarga de importar cada ruta
import excusasRouter from './excusasRouter.js';
import contextosRouter from './contextosRouter.js';
import usuariosRouter from './usuariosRouter.js';

function routerApiExcusas(app) {
    // Definición de las rutas para la API de excusas
    app.use('/api/excusas', excusasRouter);
    app.use('/api/contextos', contextosRouter);
    app.use('/api/usuarios', usuariosRouter);
}

// Exportar la función para usarla en el archivo principal
export default routerApiExcusas;
// El modelo se encarga de interactuar directamente con la base de datos.
// 1. Accede a los datos almacenados (lecturas) y permite la manipulación de registros (escritura, actualización, eliminación).
// 2. Define la estructura de los datos, incluyendo las relaciones entre las diferentes entidades.
// 3. Valida la integridad de los datos antes de ser almacenados (aunque puede haber validación adicional en el controlador).
// 4. Contiene la lógica de negocio relacionada con los datos, como métodos para calcular valores o procesar información.
// 5. Devuelve los datos en una forma estructurada que el controlador puede usar para generar una respuesta (por ejemplo, un objeto o array).
// 6. Maneja relaciones entre modelos, como la relación de un usuario con sus publicaciones (por ejemplo, user->posts()).

import fs from 'fs';
import path from 'path';

const pathJson = path.resolve('./excusas.json');

class ExcusasManager {
    constructor() {
        this.excuses = [];
        this.nextId = 1;

        try {
            const data = fs.readFileSync(pathJson, 'utf-8');
            this.excuses = JSON.parse(data);
            if (this.excuses.length > 0) {
                this.nextId = this.excuses[this.excuses.length - 1].id + 1;
            }
            console.log("Excusas cargadas:", this.excuses);
        } catch (err) {
            console.log("No se pudo cargar excusas.json. Se inicializa vacío.");
        }
    }

    validarCredibilidad(credibilidad) {
    const credibilidadesValidas = ['baja', 'media', 'alta'];
    const valor = credibilidad.toLowerCase();
    if (!credibilidadesValidas.includes(valor)) {
        throw new Error("Credibilidad inválida. Debe ser 'baja', 'media' o 'alta'");
    }
    return valor;
    }

    validarContexto(contexto) {
    const contextosValidos = ['trabajo', 'universidad', 'familia', 'amigos', 'pareja'];
    const valor = contexto.toLowerCase();
    if (!contextosValidos.includes(valor)) {
        throw new Error("Contexto inválido. Debe ser uno de: " + contextosValidos.join(', '));
    }
    return valor;
    }


    getExcusesByCredibilidad(credibilidad) {
    const valor = this.validarCredibilidad(credibilidad);
    return this.excuses.filter(excusa => excusa.credibilidad === valor);
    }


    async addExcuse(texto, credibilidad, contexto) {
        if (!texto || !credibilidad) {
            console.log("Todos los campos son obligatorios (texto, credibilidad, contexto)");
            return;
        }

        if (typeof texto !== 'string' || typeof credibilidad !== 'string' || typeof contexto !== 'string') {
            console.log("Los tipos de datos no son correctos");
            return;
        }

        const credibilidadValidada = this.validarCredibilidad(credibilidad);
        const contextoValidado = this.validarContexto(contexto);

        const newExcuse = { id: this.nextId++, texto, credibilidad: credibilidadValidada, contexto: contextoValidado };
        this.excuses.push(newExcuse);

        try {
            await fs.promises.writeFile(pathJson, JSON.stringify(this.excuses, null, 2));
            console.log("Excusa agregada:", newExcuse);
        } catch (err) {
            console.log("Error al escribir en el archivo:", err);
        }
    }

    getExcuses() {
        return this.excuses;
    }

    getExcuseById(id) {
        const excuse = this.excuses.find(e => e.id === id);
        if (!excuse) {
            console.log("Excusa no encontrada");
            return;
        }
        return excuse;
    }

    async syncData() {
        try {
            const data = await fs.promises.readFile(pathJson, 'utf-8');
            this.excuses = JSON.parse(data);
        } catch (err) {
            console.log("Error al sincronizar los datos:", err);
        }
    }

    async updateExcuse(id, texto, credibilidad, contexto) {
        await this.syncData();
        const idx = this.excuses.findIndex(e => e.id === Number(id));
        if (idx === -1) {
            console.log("Excusa no encontrada");
            return;
        }

        if (!texto || !credibilidad || !contexto) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (typeof texto !== 'string' || typeof credibilidad !== 'string'|| typeof contexto !== 'string') {
            console.log("Los tipos de datos no son correctos");
            return;
        }

        const credibilidadValidada = this.validarCredibilidad(credibilidad);
        const contextoValidado = this.validarContexto(contexto);

        this.excuses[idx] = { id: Number(id), texto, credibilidad: credibilidadValidada, contexto: contextoValidado};

        try {
            await fs.promises.writeFile(pathJson, JSON.stringify(this.excuses, null, 2));
            console.log("Excusa actualizada");
        } catch (err) {
            console.log("Error al actualizar el archivo:", err);
        }

    }

    async deleteExcuse(id) {
        const idx = this.excuses.findIndex(e => e.id === id);
        if (idx === -1) {
            console.log("Excusa no encontrada");
            return;
        }

        this.excuses.splice(idx, 1);

        try {
            await fs.promises.writeFile(pathJson, JSON.stringify(this.excuses, null, 2));
            console.log(`Excusa con ID ${id} eliminada`);
        } catch (err) {
            console.log("Error al eliminar la excusa:", err);
        }
    }

    getExcusesByTexto(texto) {
    const textoBuscado = texto.trim().toLowerCase();
    return this.excuses.filter(e => e.texto.toLowerCase().includes(textoBuscado));
    }
}

export default ExcusasManager;

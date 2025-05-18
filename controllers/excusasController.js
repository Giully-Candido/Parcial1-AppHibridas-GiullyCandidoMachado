// El controlador se encarga de manejar las solicitudes HTTP que recibe la API.
// 1. Recibe la solicitud del cliente (GET, POST, PUT, DELETE, etc.)
// 2. Valida los datos de entrada (por ejemplo, verificar que los parámetros sean correctos).
// 3. Interactúa con el modelo para obtener, crear, actualizar o eliminar datos en la base de datos.
// 4. Genera una respuesta adecuada:
//    - Si la solicitud es exitosa, responde con un código de estado HTTP adecuado (por ejemplo, 200 OK o 201 Created) y los datos correspondientes.
//    - Si ocurre un error, responde con un código de error (por ejemplo, 400 Bad Request o 500 Internal Server Error) y un mensaje detallado del error.
// 5. Maneja excepciones o errores que ocurran durante el proceso, asegurándose de enviar una respuesta coherente y útil al cliente.
// 6. Formatea la respuesta en el formato adecuado (generalmente JSON).

import Excusa from '../models/excusasModel.js';

// Funciones internas para validaciones reutilizables
const credibilidadesValidas = ['baja', 'media', 'alta'];
const contextosValidos = ['trabajo', 'universidad', 'familia', 'amigos', 'pareja'];

const validarCredibilidad = (valor) => {
  if (!valor) return null;
  const valorLower = valor.toLowerCase();
  return credibilidadesValidas.includes(valorLower)
    ? null
    : "Credibilidad inválida. Debe ser 'baja', 'media' o 'alta'";
};

const validarContexto = (valor) => {
  if (!valor) return null;
  const valorLower = valor.toLowerCase();
  return contextosValidos.includes(valorLower)
    ? null
    : "Contexto inválido. Debe ser uno de: 'trabajo', 'universidad', 'familia', 'amigos', 'pareja'";
};

const getExcusas = async (req, res) => {
  try {
    const { credibilidad, contexto, texto } = req.query;
    const query = {};
    const errores = [];

    const errorCred = validarCredibilidad(credibilidad);
    if (errorCred) errores.push(errorCred);

    const errorCont = validarContexto(contexto);
    if (errorCont) errores.push(errorCont);

    if (errores.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validación fallida",
        errors: errores
      });
    }

    if (credibilidad) query.credibilidad = credibilidad.toLowerCase();
    if (contexto) query.contexto = contexto.toLowerCase();
    if (texto) query.texto = { $regex: texto, $options: 'i' };

    const excusas = await Excusa.find(query);

    if (texto && excusas.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No se encontraron excusas que contengan el texto: "${texto}"`
      });
    }

    res.status(200).json({
      status: "success",
      data: excusas,
      message: "Excusas obtenidas"
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

const setExcusas = async (req, res) => {
  try {
    const { texto, credibilidad, contexto } = req.body;
    const errores = [];

    if (!texto || !credibilidad || !contexto) {
      errores.push("Todos los campos (texto, credibilidad, contexto) son obligatorios");
    }

    const errorCred = validarCredibilidad(credibilidad);
    if (errorCred) errores.push(errorCred);

    const errorCont = validarContexto(contexto);
    if (errorCont) errores.push(errorCont);

    if (errores.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validación fallida",
        errors: errores
      });
    }

    const nuevaExcusa = await Excusa.create({
      texto,
      credibilidad: credibilidad.toLowerCase(),
      contexto: contexto.toLowerCase()
    });

    res.status(201).json({
      status: "success",
      message: "Excusa agregada",
      data: nuevaExcusa
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al agregar la excusa",
      error: error.message
    });
  }
};

const updateExcusa = async (req, res) => {
  try {
    const id = req.params.id;
    const { texto, credibilidad, contexto } = req.body;
    const errores = [];

    if (!texto || !credibilidad || !contexto) {
      errores.push("Todos los campos (texto, credibilidad, contexto) son obligatorios");
    }

    const errorCred = validarCredibilidad(credibilidad);
    if (errorCred) errores.push(errorCred);

    const errorCont = validarContexto(contexto);
    if (errorCont) errores.push(errorCont);

    if (errores.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Validación fallida",
        errors: errores
      });
    }

    const excusaActualizada = await Excusa.findByIdAndUpdate(
      id,
      {
        texto,
        credibilidad: credibilidad.toLowerCase(),
        contexto: contexto.toLowerCase()
      },
      { new: true }
    );

    if (!excusaActualizada) {
      return res.status(404).json({
        status: "error",
        message: "Excusa no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Excusa actualizada",
      data: excusaActualizada
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const getExcusaById = async (req, res) => {
  try {
    const id = req.params.id;

    const excusa = await Excusa.findById(id);

    if (!excusa) {
      return res.status(404).json({
        status: "error",
        message: "Excusa no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      data: excusa,
      message: "Excusa obtenida"
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

const deleteExcusa = async (req, res) => {
  try {
    const id = req.params.id;

    const excusaEliminada = await Excusa.findByIdAndDelete(id);

    if (!excusaEliminada) {
      return res.status(404).json({
        status: "error",
        message: "Excusa no encontrada"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Excusa eliminada"
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export {
  getExcusas,
  setExcusas,
  updateExcusa,
  getExcusaById,
  deleteExcusa
};

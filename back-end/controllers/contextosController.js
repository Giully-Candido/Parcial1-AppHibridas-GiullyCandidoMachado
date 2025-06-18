import Contexto from '../models/contextoModel.js';

const getContextos = async (req, res) => {
  try {
    const contextos = await Contexto.find();
    res.status(200).json({
      status: 'success',
      message: 'Contextos obtenidos',
      data: contextos
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getContextoById = async (req, res) => {
  try {
    const contexto = await Contexto.findById(req.params.id);
    if (!contexto) {
      return res.status(404).json({ status: 'error', message: 'Contexto no encontrado' });
    }
    res.status(200).json({ status: 'success', data: contexto });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const setContexto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({ status: 'error', message: 'Nombre y descripción son obligatorios' });
    }

    const nuevo = await Contexto.create({ nombre: nombre.toLowerCase(), descripcion });

    res.status(201).json({
      status: 'success',
      message: 'Contexto creado',
      data: nuevo
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const deleteContexto = async (req, res) => {
  try {
    const contexto = await Contexto.findByIdAndDelete(req.params.id);
    if (!contexto) {
      return res.status(404).json({ status: 'error', message: 'Contexto no encontrado' });
    }
    res.status(200).json({ status: 'success', message: 'Contexto eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export {
  getContextos,
  getContextoById,
  setContexto,
  deleteContexto
};

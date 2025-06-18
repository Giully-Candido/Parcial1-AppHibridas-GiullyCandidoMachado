import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
    trim: true //eliminarán automáticamente los espacios en blanco al principio y al final del valor
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor ingresa un email válido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;
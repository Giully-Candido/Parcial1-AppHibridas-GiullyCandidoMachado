import mongoose from 'mongoose';

const contextoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    enum: ['trabajo', 'universidad', 'familia', 'amigos', 'pareja']
  },
  descripcion: {
    type: String,
    required: true
  }
});

const Contexto = mongoose.model('contexto', contextoSchema);
export default Contexto;
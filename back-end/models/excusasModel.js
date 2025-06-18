import mongoose from 'mongoose';

const excusaSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    credibilidad: { type: String, enum: ['baja', 'media', 'alta'], required: true },
    contexto: { type: String, enum: ['trabajo', 'universidad', 'familia', 'amigos', 'pareja'], required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true }
});

const Excusa = mongoose.model('excusa', excusaSchema);

export default Excusa;
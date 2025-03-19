import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
    },
    publicacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: [true, 'La publicación es obligatoria'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    },
}, { timestamps: true });

const Comentario = mongoose.model('Comentario', comentarioSchema);

export default Comentario;

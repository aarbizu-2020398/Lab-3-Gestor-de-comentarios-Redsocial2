import { Schema, model } from 'mongoose';

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la categoría es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción de la categoría es obligatoria']
  },
  estado: {
    type: Boolean,
    default: true
  }
});

export default model('Categoria', categoriaSchema);

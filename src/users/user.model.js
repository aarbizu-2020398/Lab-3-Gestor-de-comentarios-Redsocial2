
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
    default: 'USER_ROLE'
  }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);

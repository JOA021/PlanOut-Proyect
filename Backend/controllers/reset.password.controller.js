import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersModel } from '../models/users.models.js';

export const resetearContrasena = async (req, res) => {
  const resetToken = req.body.resetToken;
  const newPassword = req.body.newPassword;

  try {
  
    const user = await usersModel.findOne({ token: resetToken });


    if (!user) {
      return res.status(404).send("Usuario no encontrado.");
    }

    // Hash de la nueva contraseña
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await usersModel.findByIdAndUpdate(user.id, { $set: { password: hashedPassword } });

    res.send("Contraseña actualizada con éxito.");
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      res.status(400).send("El enlace de restablecimiento de contraseña ha caducado.");
    } else if (error.name === 'JsonWebTokenError') {
      res.status(400).send("Token de restablecimiento de contraseña inválido.");
    } else {
      res.status(500).send("Error al actualizar la contraseña.");
    }
  }
};


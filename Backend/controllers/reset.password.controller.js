import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersModel } from '../models/users.models.js';



export const resetearContrasena = async (req, res) => {
  
  const userId  = req.user.userId;
  const password = req.body.password

  console.log(userId, password)


  try {
    
      const hashedPassword = bcrypt.hashSync(password, 10);

      console.log(hashedPassword)

      await usersModel.updateOne({ _id: userId }, { $set: { password: hashedPassword } });
      res.send("Contraseña actualizada con éxito.");
    } catch (error) {
      res.status(500).send("Error al actualizar la contraseña.");

};
}


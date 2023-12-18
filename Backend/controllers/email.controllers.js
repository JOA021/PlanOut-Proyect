// import nodemailer from 'nodemailer';
// import mg from 'nodemailer-mailgun-transport';
// import dotenv from 'dotenv'
// dotenv.config();

// const emailDomain = process.env.DOMAIN
// const emailApi = process.env.API_KEY

// const auth = {
//     auth: {    
//         api_key: emailApi,
//         domain: emailDomain
//       }
// }
// const transporter = nodemailer.createTransport(mg(auth));

// export const sendMail = async (request, response) => {

//   // Obtener datos del body
//   const {from, to, subject, text} = request.body;

//   // Opciones de email
//   const mailOptions = {
//     from,
//     to,
//     subject,    
//     text
//   };

//   try {
//     // Enviar email
//     await transporter.sendMail(mailOptions);

//     // Responder éxito    
//     response.json({
//       message: 'Email enviado'
//     });

//   } catch (error) {
//     // Responder error
//     response.status(500).json({
//       error: error.message
//     }); 
//   }

// };

import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';
import { usersModel } from '../models/users.models.js';
import dotenv from 'dotenv';

dotenv.config();

const emailDomain = process.env.DOMAIN;
const emailApi = process.env.API_KEY;

const auth = {
  auth: {    
    api_key: emailApi,
    domain: emailDomain,
  },
};
const transporter = nodemailer.createTransport(mg(auth));

export const sendMail = async (request, response) => {
  // Obtener datos del body
  const { to } = request.body;

  try {
    // Verificar si el correo electrónico existe en la base de datos
    const user = await usersModel.findOne({ email: to });

    console.log(user)

    if (!user) {
      response.status(404).json({
        error: 'Si su correo electronico se encuentra registrado, revisa tu bandeja de entrada.',
      });
      return;
    }

    // Generar token con la información necesaria (userID y email)
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    // Construir el enlace de restablecimiento de contraseña
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Opciones de email
    const mailOptions = {
      from: 'jacobovallealvarez@gmail.com',
      to,
      subject: 'Restablecer contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink} Si no has hecho ninguna solucitud para cambiar la contraseña de tu cuenta en "PlanOut", ignora este mensaje.`,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Responder éxito    
    response.json({
      message: 'Si su correo electronico se encuentra registrado, revisa tu bandeja de entrada.',
    });
  } catch (error) {
    // Responder error
    response.status(500).json({
      error: error.message,
    });
  }
};

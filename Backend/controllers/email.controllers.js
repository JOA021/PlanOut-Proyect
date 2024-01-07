import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
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

    if (!user) {
      response.status(404).json({
        error: 'Si su correo electrónico se encuentra registrado, revisa tu bandeja de entrada.',
      });
      return;
    }

    // Generar token con la información necesaria (userID y email)
    const token = parseInt(Math.random()*100000)
    await usersModel.findOneAndUpdate({ email: to },{ token : token });

    // Construir el enlace de restablecimiento de contraseña
    const resetLink = `http://localhost:4200/forget/${token}`;

    // Opciones de email
    const mailOptions = {
      from: 'jacobovallealvarez@gmail.com',
      to,
      subject: 'Restablecer contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink} Si no has hecho ninguna solicitud para cambiar la contraseña de tu cuenta en "PlanOut", ignora este mensaje.`,
    };

    // Enviar email

    console.log(mailOptions)
    await transporter.sendMail(mailOptions);

    // Responder éxito sin revelar información del usuario
    response.json({
      message: 'El correo de restablecimiento de contraseña ha sido enviado correctamente.',
    });
  } catch (error) {
    // Responder error
    response.status(500).json({
      error: error.message,
    });
  }
};
import express from 'express'
import { singup, login, getUser } from '../controllers/users.controllers.js'


const router = express.Router()

// Ruta para el singup de los usuarios
router.post('/singupUsers', singup)

// Ruta para el login de los usuarios
router.post('/loginUsers', login)

// Rutas para obtener los usuarios
router.post('/getUsers', getUser)



export default router
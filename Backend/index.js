import express from 'express'
import dotenv from 'dotenv'
import { connectDataBase } from './config/db.js'
import users from './routes/users.routes.js'
import routerEmail from './routes/email.routes.js'
import newPassword from './routes/reset.password.routes.js'
import routerPlan from './routes/chatgpt.routes.js'
import routerClima from './routes/clima.routes.js'


dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT

// Rutas
app.use('/singup', users)

app.use('/sendmail', routerEmail )

app.use('/newpass', newPassword)

app.use('/api/chatgpt', routerPlan)

app.use('/api/clima',routerClima)

// Conectar base de datos
connectDataBase()
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
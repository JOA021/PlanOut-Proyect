import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import { usersModel } from "../models/users.models.js"


export const singup = async (request, response) => {
    try {
        let body = request.body

        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newUser = await usersModel.create(body)

        const payload = { _id: newUser._id }

        let token = await jwt.sign(payload, process.env.JWT_KEY)

        const userData = {
            token,
            newUser
        }
        response.send(userData)

    } catch (e) {
        console.log(e)
        response.json(e)
    }

}

export const login = async (request, response) => {
    try {
        let body = request.body

        let userExist = await usersModel.findOne({ email: body.email })
        

        if (!userExist) {
            return response.json({ error: "No existe un usuario con este gmail" })
        }

        const validationsPassword = bcrypt.compareSync(body.password, userExist.password);

        if (validationsPassword) {
            const payload = { _id: userExist._id }
            const token = jwt.sign(payload, process.env.JWT_KEY)

            const userData = {
                token,
                // userExist
            }
            return response.send(userData)
        } else {
            return response.send({ error: "Credenciales incorrectas" })
        }

    } catch (e) {
        console.log(e)
        return response.send(e)
    }
}

export const getUser = async (request, response) => {
        let body = request.body;  

    try {
        let userExist = await usersModel.findOne({ email: body.email })
        response.json(userExist)

    } catch (e) {
        console.log(e)
        response.json(e)
    }

}
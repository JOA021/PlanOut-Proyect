import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true

    },
    
    email: {
        type: String,
        unique: true
    }

})

export const usersModel = mongoose.model('users', userSchema)

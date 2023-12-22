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
    },

    token: {
        type: Number,
        required: false
    }

})

export const usersModel = mongoose.model('users', userSchema)

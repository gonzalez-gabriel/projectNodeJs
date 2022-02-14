const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Es requerido el nombre']
        },
        lastName: {
            type: String,
            required: [true, 'Es requerido el apellido']
        },
        userName: {
            type: String,
            unique: true,
            required: [true, 'Es requerido el nombre de usuario']
        },
        password: {
            type: String,
            required: [true, 'Es requerido el password']
        },
        email: { 
            type: String, 
            unique: true, 
            lowercase: true, 
            required: [true, 'Es requerido el email'], 
            match: [/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "El formato correcto es alguien@algunlugar.com"] 
        },
        address: { 
            type: String, 
            required: [true, 'Es requerido la dirección'] 
        },
        phone: { 
            type: Number, 
            required: [true, 'Es requerido el número telefónico'] 
        },
        signupDate: { 
            type: Date, 
            default: Date.now() 
        }
    }
)

module.exports = mongoose.model('User', userModel);


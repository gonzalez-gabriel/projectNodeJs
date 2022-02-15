const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
    {
        title: { 
            type: String,
            required: [true, 'Es requerido el título']
        },
        author: { 
            type: String,
            required: [true, 'Es requerido el autor']
        },
        genre: { 
            type: String,
            required: [true, 'Es requerido el género']
        },
        read: { 
            type: Boolean,
            required: [true, 'Es requerido']
        }
    }
)

module.exports = mongoose.model('Book', bookModel);
import mongoose from "mongoose";

const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        requiere: true,
        trim: true
    },
    email:{
        type: String,
        requiere: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        requiere: true,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Usuario', UsuariosSchema)
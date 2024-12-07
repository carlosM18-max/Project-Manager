import mongoose from "mongoose";

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        // Obligatorio
        required: true,
        // Si alguien agrega espacios en el input se eliminen
        trim: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        // Referencia del objectId guardado del usuario en la bd
        ref: 'Usuario'
    },
    creado:{
        type: Date,
        default:Date.now()
    }
})

export default mongoose.model('Proyecto', ProyectoSchema)
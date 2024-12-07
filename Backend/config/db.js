import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Base de datos conectada exitosamente');
    } catch (error) {
        console.error('Hubo un error al conectar a la base de datos:', error);
        process.exit(1); // Detener la aplicación
    }
}

export default conectarDB;

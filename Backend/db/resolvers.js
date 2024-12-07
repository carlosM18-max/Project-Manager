// Modelos
import Usuario from "../models/usuario.js";
import Proyecto from "../models/proyecto.js";
import Tarea from "../models/tarea.js";
// Librerias
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
// Creacion y firmal del jwt
const crearToken = (usuario, secreta, expiresIn) => {
    // console.log(usuario)
    const { id, nombre, email } = usuario

    return Jwt.sign({ id, nombre, email }, secreta, { expiresIn })
}

const resolvers = {
    // Resolvers GraphQL aquí
    Query: {
        // Obtener todos los proyectos (datos)
        obtenerProyectos: async (_, { }, ctx) => {
            const proyectos = await Proyecto.find({ creador: ctx.usuario.id });
            return proyectos;
        },
        obtenerTareas: async (_, { input }, ctx) => {
            const tareas = await Tarea.find({ creador: ctx.usuario.id }).where('proyecto').equals(input.proyecto)
            return tareas;
        }

    },
    Mutation: {
        crearUsuario: async (_, { input }) => {
            const { email, password } = input

            //Si existe el usuario
            const existeUsuario = await Usuario.findOne({ email })

            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado')
            }
            try {
                // Hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt)

                // Logging para verificar la contraseña antes de guardarla
                console.log('Contraseña a guardar:', input.password);

                // Registrar nuevo usuario
                const nuevoUsuario = new Usuario(input)
                console.log(nuevoUsuario)

                nuevoUsuario.save()
                return "Usario creado correctamente"
            } catch (error) {
                console.log(error)
                throw new Error('Hubo un error al crear el usuario');
            }
        },
        /////////////// Autenticar usuario ///////////////
        autenticarUsuario: async (_, { input }) => {
            //console.log('Datos de autenticación recibidos en el servidor:', input);

            const { email, password } = input;
           //console.log('Email recibido en el servidor:', email);

            // Buscar al usuario por su email en la base de datos
            const existeUsuario = await Usuario.findOne({ email });
            console.log('Consulta a la base de datos:', existeUsuario);


            console.log('Usuario encontrado:', existeUsuario);

            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }

            // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);

            console.log('Contraseña correcta:', passwordCorrecto);

            if (!passwordCorrecto) {
                throw new Error('Contraseña incorrecta');
            }

            // Si todo está bien, generar el token de acceso
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '24hr')
            };
        },
        /////////////// Guardar el proyecto ///////////////
        nuevoProyecto: async (_, { input }, ctx) => {

            try {
                const proyecto = new Proyecto(input)

                // Asociar al creador
                proyecto.creador = ctx.usuario.id;

                // Almacenarlo en la BD
                const resultado = await proyecto.save()

                return resultado
            } catch (error) {
                console.log(error)
            }
        },
        /////////////// Actualizar proyecto ///////////////
        actualizarProyecto: async (_, { id, input }, ctx) => {
            // Revisar que exista el proyecto
            let proyecto = await Proyecto.findById(id)

            if (!proyecto) {
                throw new Error('No se encontro el proyecto')
            }
            // Verificar que la persona que trate de editar es el creador
            if (proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos para editar')
            }
            // Guardar el proyecto actualizado
            proyecto = await Proyecto.findOneAndUpdate({ _id: id }, input, { new: true })
            return proyecto
        },
        /////////////// Eliminar proyecto ///////////////
        eliminarProyecto: async (_, { id }, ctx) => {
            // Revisar que exista el proyecto
            let proyecto = await Proyecto.findById(id)

            if (!proyecto) {
                throw new Error('No se encontro el proyecto')
            }
            // Verificar que la persona que trate de eliminar es el creador
            if (proyecto.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos para editar')
            }
            // Eliminar el proyecto
            await Proyecto.findOneAndDelete({ _id: id })
            return "Se ha eliminado el proyecto"
        },
        nuevaTarea: async (_, { input }, ctx) => {
            try {
                const tarea = new Tarea(input)
                tarea.creador = ctx.usuario.id
                const resultado = await tarea.save()
                return resultado
            } catch (error) {
                console.log(error)
            }
        },
        actualizarTarea: async (_, { id, input, estado }, ctx) => {
            // Revisar si la tarea existe
            let tarea = await Tarea.findById(id)
            if (!tarea) {
                throw new Error('No se encontro la tarea')
            }
            // Si la persona que lo edita es el propietario
            if (tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos para editar')
            }
            // Asignar el estado
            input.estado = estado
            // Guardar la tarea actualizada
            tarea = await Tarea.findOneAndUpdate({ _id: id }, input, { new: true })
            return tarea
        },
        eliminarTarea: async (_, { id }, ctx) => {
            // Revisar si la tarea existe
            let tarea = await Tarea.findById(id)
            if (!tarea) {
                throw new Error('No se encontro la tarea')
            }
            // Si la persona que lo edita es el propietario
            if (tarea.creador.toString() !== ctx.usuario.id) {
                throw new Error('No tienes los permisos para editar')
            }
            // Eliminar
            await Tarea.findOneAndDelete({ _id: id })
            return "Se ha eliminado la tarea"
        }
    }
};

export default resolvers;
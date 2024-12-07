import { ApolloServer } from 'apollo-server';
import typeDefs from './db/schema.js'
import resolvers from './db/resolvers.js'
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
// Conexion a la base de datos
import conectarDB from './config/db.js';

conectarDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // console.log(req.headers['authorization'] || '')
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const usuario = Jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                console.log('Usuario autenticado:', usuario);
                return {
                    usuario
                };
            } catch (error) {
                console.error('Error al verificar el token:', error.message);
                // Puedes lanzar un error personalizado aquí si lo deseas.
            }
        }
        return {};
    }
    

});

server.listen().then(({ url }) => {
    console.log(`Servidor Apollo GraphQL en ${url}`);
});

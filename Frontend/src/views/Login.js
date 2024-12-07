// Librerias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// Sintaxis de la mutacion
const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {

    // Estado del formulario
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');

    // Mensajes
    const [mensaje, guardarMensaje] = useState(null);

    // Navegacion
    const navigate = useNavigate();

    // Mutacion
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    // Cuando el usuario inicia sesion
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar
        if (email === '' || password === '') {
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }
        // Verificar si esta autenticado
        console.log('Datos de autenticación:', email, password);
        try {
            const { data } = await autenticarUsuario({
                variables: {
                    input: {
                        email,
                        password,
                    },
                },
            });

            const { token } = data.autenticarUsuario;

            localStorage.setItem('token', token);
            navigate('/inicio');
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error: ', ''));
        }
    };
    const mostrarAlerta = () => {
        alert(mensaje);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h2 className="text-2xl font-semibold text-center mb-8">Administrador de Proyectos</h2>
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            style={{ backgroundColor: '#D9D9D9' }}
                            className="w-full p-2 border rounded-md"
                            type="text"
                            placeholder="Email"
                            onChange={(e) => guardarEmail(e.target.value.toLowerCase())}
                            value={email}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            style={{ backgroundColor: '#D9D9D9' }}
                            className="w-full p-2 border rounded-md"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => guardarPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <p className="text-center mt-4">
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate('/crear-cuenta')}
                    >
                        Crear Cuenta
                    </button>
                </p>
                {mensaje && mostrarAlerta()}
            </div>
        </div>
    );

};

export default Login;

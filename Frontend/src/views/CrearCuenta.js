// Librerias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

// Sintaxis de la mutacion
const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
        crearUsuario(input: $input)
    }
`;

const CrearCuenta = () => {

    // Estado del formulario
    const [nombre, guardarNombre] = useState('');
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');

    // Mensajes
    const [mensaje, guardarMensaje] = useState(null);

    // Navegacion
    const navigate = useNavigate();

    // Mutacion
    const [crearUsuario] = useMutation(NUEVA_CUENTA);

    // Cuando el usuario crea una cuenta
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar
        if (nombre === '' || email === '' || password === '') {
            // Mostrar el mensaje
            guardarMensaje('Todos los campos son obligatorios');
            return;
        }
        // La contraseña debe ser de 6 caracteres
        if (password.length < 6) {
            guardarMensaje('El password debe tener al menos 6 caracteres');
            return;
        }
        // Guardar el usuario
        try {
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        nombre,
                        email,
                        password,
                    },
                },
            });

            guardarMensaje(data.crearUsuario);
            navigate('/login');
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error: ', ''));
        }
    }

    const mostrarAlerta = () => {
        alert(mensaje);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h2 className="text-2xl font-semibold text-center mb-8">Administrador de Proyectos</h2>
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                        style={{ backgroundColor: '#D9D9D9' }}
                            type="text"
                            placeholder="Nombre"
                            onChange={(e) => guardarNombre(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                        style={{ backgroundColor: '#D9D9D9' }}
                            type="email"
                            placeholder="Email"
                            onChange={(e) => guardarEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                        style={{ backgroundColor: '#D9D9D9' }}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => guardarPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                    >
                        Crear Cuenta
                    </button>
                </form>
                <p className="mt-4 text-center">
                    ¿Ya tienes una cuenta? <a href="/login" className="text-green-700">Iniciar Sesión</a>
                </p>
                {mensaje && mostrarAlerta()}
            </div>
        </div>
    );
}

export default CrearCuenta;

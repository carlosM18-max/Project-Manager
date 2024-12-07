import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const NUEVO_PROYECTO = gql`
    mutation nuevoProyecto($input: ProyectoInput) {
        nuevoProyecto(input: $input) {
            nombre
            id
        }
    }
`;

const OBTENER_PROYECTOS = gql`
    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }
`;

const NuevoProyecto = () => {
    const navigate = useNavigate();
    const [nombre, guardarNombre] = useState('');
    const [mensaje, guardarMensaje] = useState(null);

    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
        update(cache, { data: { nuevoProyecto } }) {
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS });
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) }
            })
        }
    });

    const handleSubmit = async () => {
        if (nombre === '') {
            guardarMensaje('El Nombre del Proyecto es Obligatorio');
            return;
        }
        // Guardar el proyecto
        try {
            const { data } = await nuevoProyecto({
                variables: {
                    input: {
                        nombre
                    }
                }
            });
            console.log(data)
            guardarMensaje('Proyecto Creado Correctamente');
            navigate('/proyectos');
        } catch (error) {
            guardarMensaje(error.message.replace('GraphQL error:', ''))
        }
    }

    const mostrarAlerta = () => {
        alert(mensaje);
    }

    return (
        <div className="container mx-auto max-w-md mt-10">
            <h1 className="text-3xl font-semibold mb-5 text-center">Nuevo Proyecto</h1>
            <div>
                <input
                    className="w-full border rounded p-2 mb-4"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
                onClick={() => handleSubmit()}
            >
                Crear Proyecto
            </button>
            {mensaje && mostrarAlerta()}
        </div>
    );
}

export default NuevoProyecto;

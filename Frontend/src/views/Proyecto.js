import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import Tarea from '../components/Tarea';

const NUEVA_TAREA = gql`
    mutation nuevaTarea($input: TareaInput) {
        nuevaTarea(input: $input) {
            nombre
            id
            proyecto
            estado
        }
    }
`;

const OBTENER_TAREAS = gql`
    query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input) {
            id
            nombre
            estado
        }
    }
`;

const Proyecto = () => {
    const { id, nombre } = useParams(); 

    const [nombreTarea, setNombreTarea] = useState('');
    const [mensaje, guardarMensaje] = useState(null);

    const { data, loading } = useQuery(OBTENER_TAREAS, {
        variables: {
            input: {
                proyecto: id,
            },
        },
    });

    const [nuevaTarea] = useMutation(NUEVA_TAREA, {
        update(cache, { data: { nuevaTarea } }) {
            const { obtenerTareas } = cache.readQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id,
                    },
                },
            });

            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: id,
                    },
                },
                data: {
                    obtenerTareas: [...obtenerTareas, nuevaTarea],
                },
            });
        },
    });

    const handleSubmit = async () => {
        if (nombreTarea === '') {
            guardarMensaje('El Nombre de la tarea es obligatorio');
            return;
        }

        try {
            const { data } = await nuevaTarea({
                variables: {
                    input: {
                        nombre: nombreTarea,
                        proyecto: id,
                    },
                },
            });
            console.log(data);
            setNombreTarea('');
            guardarMensaje('Tarea creada Correctamente');

            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <p className="text-center">Cargando...</p>;

    return (
        <div className="container mx-auto p-4 justify-center items-center text-center">
            <h2 className="text-2xl">Tarea: {nombre}</h2> 
            <form className="mt-4">
                <div className="mb-4">
                    <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="Nombre Tarea"
                        value={nombreTarea}
                        onChange={(e) => setNombreTarea(e.target.value)}
                    />
                </div>

                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleSubmit}
                >
                    Crear Tarea
                </button>
            </form>

            <div className="mt-4  ">
                {data && data.obtenerTareas.map((tarea) => (
                    <Tarea
                        key={tarea.id}
                        tarea={tarea}
                        proyectoId={id}
                    />
                ))}
            </div>

            {mensaje && (
                <div className="bg-red-500 text-white text-center p-2 mt-4">
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default Proyecto;

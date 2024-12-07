import React from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const ACTUALIZAR_TAREA = gql`
    mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
        actualizarTarea(id: $id, input: $input, estado: $estado) {
            nombre
            id
            proyecto
            estado
        }
    }
`;

const ELIMINAR_TAREA = gql`
    mutation eliminarTarea($id: ID!) {
        eliminarTarea(id: $id)
    }
`;

const Tarea = ({ tarea, proyectoId }) => {
    const [actualizarTareaMutation] = useMutation(ACTUALIZAR_TAREA);
    const [eliminarTareaMutation] = useMutation(ELIMINAR_TAREA);

    // Cambiar el estado de una tarea a completo o incompleto
    const cambiarEstado = () => {
        const updatedTarea = {
            ...tarea,
            estado: !tarea.estado,
        };

        actualizarTareaMutation({
            variables: {
                id: tarea.id,
                input: updatedTarea,
            },
        });
    };

    // Dialogo para eliminar o no una tarea
    const mostrarEliminar = () => {
        if (window.confirm('¿Deseas eliminar esta tarea?')) {
            eliminarTareaMutation({
                variables: {
                    id: tarea.id,
                },
            });
        }
    };

    return (
        <div className="flex items-center justify-between border p-4 bg-white mb-2 rounded shadow-md w-96 mx-auto">
            <div onClick={cambiarEstado} onContextMenu={(e) => { e.preventDefault(); mostrarEliminar(); }}>
                <span className={`text-xl ${tarea.estado ? 'text-green-500' : 'text-black'}`}>
                    {tarea.nombre}
                </span>
            </div>
            <button
                className={`text-2xl ${tarea.estado ? 'text-green-700' : 'text-green-300'} cursor-pointer`}
                onClick={cambiarEstado}
            >
                {tarea.estado ? 'Marcar Incompleta' : 'Marcar Completa'}
            </button>
        </div>
    );
};

export default Tarea;

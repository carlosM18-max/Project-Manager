import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const OBTENER_PROYECTOS = gql`
    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }
`;

const Proyectos = () => {
    // Destructuracion de los datos
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS);

    console.log(data);
    console.log(loading);
    console.log(error);

    if (loading) return <p>Cargando...</p>;

    return (

        <div className="container mx-auto px-4">
            <Link to="/nuevo-proyecto" className="block mx-auto mt-10 bg-blue-600 text-white rounded-md py-2 px-4 text-center w-96">
                Nuevo Proyecto
            </Link>
            <h2 className="text-xl font-semibold mt-4 text-center block">Selecciona un Proyecto</h2>

            <ul className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mx-auto max-w-screen-md block text-center">
                {data.obtenerProyectos.map(proyecto => (
                    <li key={proyecto.id} className="bg-white p-4 rounded-md shadow-md mb-5">
                        <Link to={`/proyecto/${proyecto.id}`} className="text-blue-600 hover:underline ">
                            {proyecto.nombre}
                        </Link>
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default Proyectos;

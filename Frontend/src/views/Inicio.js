import React from "react";
import ProyectosI from "../img/ADMINISTRACION_DE_PROYECTOS-01.png"; // Importar la imagen del trabajador
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate para la navegación

const Inicio = () => {
        const navigate = useNavigate(); // Obtener la función de navegación desde useNavigate

        const handleLogout = () => {
                localStorage.removeItem("token"); // Eliminar el token almacenado en el localStorage
                navigate("/login"); // Navegar al inicio de sesión
        };

        return (
                <>
                <br></br>
                <br></br>
                        <button
                                className="float-right bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-4 cursor-pointer border-black border rounded-md mt-2 mr-3"
                                onClick={handleLogout}
                        >
                                Cerrar Sesión
                        </button>

                        <div className="p-6"></div>

                        <h4
                                className="text-center text-3xl font-medium mb-4"
                                style={{ marginTop: "2rem" }}
                        >
                                Administrador y Gestor de Proyectos
                        </h4>

                        <center>
                                <img
                                        alt="Trabajador"
                                        width="750"
                                        height="750"
                                        className="object-left md:object-top items-center"
                                        src={ProyectosI} // Mostrar la imagen del trabajador
                                />
                        </center>
                </>
        );
};

export default Inicio;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Proyectos from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';
import Inicio from './views/Inicio';
import Navbar from './views/Navbar';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={
          <>
            <Navbar />
            <Inicio />
          </>
        }
        />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/proyectos" element={
          <>
            <Navbar />
            <Proyectos />
          </>
        }
        />
        <Route path="/nuevo-proyecto" element={
          <>
            <Navbar />
            <NuevoProyecto />
          </>
        }
        />
        <Route path="/proyecto/:id" element={
          <>
          <Navbar/>
            <Proyecto />
          </>
        }

        />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};


export default App;

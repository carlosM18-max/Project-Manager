// Protegida.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Protegida = ({ element, isUserAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={isUserAuthenticated ? element : <Navigate to="/login" />}
  />
);

export default Protegida;

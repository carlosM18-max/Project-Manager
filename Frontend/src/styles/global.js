const globalStyles = {
    /* Estilos CSS para el menú */
    '.menu-item': {
        fontSize: '18px',
        margin: '10px 0',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#00FF00', /* Cambia el color de los elementos del menú a verde (#00FF00) */
        transition: 'color 0.2s',
    },
    '.menu-item:hover': {
        color: '#ff0000', /* Cambia el color al pasar el cursor por encima */
    },
    /* Estilos para el botón de hamburguesa */
    '.menu-button': {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    '.menu-button .menu-icon': {
        width: '30px',
        height: '4px',
        backgroundColor: '#00FF00', /* Cambia el color de las barras del botón a verde (#00FF00) */
        margin: '5px 0',
        transition: 'background-color 0.2s',
    },
    '.menu-button .menu-icon.open': {
        backgroundColor: '#ff0000', /* Cambia el color cuando se abre el menú */
    },
    /* Estilos adicionales si los necesitas */
};

export default globalStyles;

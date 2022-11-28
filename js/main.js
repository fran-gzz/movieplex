/*
    Hola, buenas.
    Esta es mi presentación de la primera pre-entrega.
    La idea es la siguiente, tengo en mente crear un sitio web destinado a un complejo de cines FICTICIO.

        * Tomé como inspiración la web de cinemark ( https://www.cinemarkhoyts.com.ar/ ).

    En el futuro, planeo incluir una cartelera dinámica mediante un array, o bien consumir una api como la de TMBD.
    Además incluiré una pasarela de pago y un sistema de logeo.
    La pasarela de pago constará de lo siguiente:
        * Ingreso de los datos de usuario mediante logeo
        * Cantidad de entradas que quiere comprar
        * Sistema de descuentos mediante cupones
        * Selección de butacas
        * Simulación del pago
*/

// Funciones para establecer nombre de usuario y contraseñañ
const setUsername = () => user = prompt('Nombre de usuario');
const setPassword = () => password = prompt('Escriba su contraseña');
    

// Función para establecer un usuario
const setUser = () => {
    // Llamado a las funciones.
    setUsername();
    setPassword();
    // Validación: el usuario no podrá ingresar una contraseña menor a 8 carácteres.
    while( password.length < 8 ){
        alert('La contraseña debe tener al menos 8 carácteres');
        setPassword();
    }
    // Validación: el usuario no podrá ingresar datos vacíos.
    while( user === '' || password === ''){
        alert('Por favor, complete ambos campos.');
        setUsername();
        setPassword();
    }
}

// Función de lista de peliculas
const peliculas = () => {
    let listaPeliculas = parseInt(prompt(`Seleccione un número para continuar.
        1 - Black Panther
        2 - One Piece Red
        3 - Black Adam
    `));
    if ( listaPeliculas === 1 ) {
        alert('Black Panther \n 1 - SALA 2D $300 \n 2 - SALA 3D $400 \n 3 - SALA 4D $600');
    } else if ( listaPeliculas === 2 ) {
        alert('One Piece Red \n 1 - SALA 2D $300 \n 2 - SALA 3D $400 \n 3 - SALA 4D $600');
    } else if ( listaPeliculas === 3 ) {
        alert('Black Adam \n 1 - SALA 2D $300 \n 2 - SALA 3D $400 \n 3 - SALA 4D $600');
    } else {
        alert('Opción no soportada');
    }
    return listaPeliculas;
}

const app = () => {
    // Llamado a la función para generar un usuario
    setUser();

    // Saludo
    alert(`Hola, ${user}! Bienvenido/a Movieplex Cinema.`);

    // Menu de opciones
    let entrada = prompt(`${user}, seleccione un número para continuar.
    1 - Lista peliculas
    2 - Ver promociones
    3 - Reestablecer nombre de usuario y contraseña
    0 - Salir
    `);
    while( entrada != '0' ) {
        switch( entrada ) {
            case '1':
                peliculas();
                break;
            case '2':
                alert(`Promoción disponible: \n 50% de descuento con el uso del código: 1234MOVIEPLEX`);
                break;
            case '3':
                setUser();
                break;
            default:
                alert('Opción no soportada');
                break;
            }
        entrada = prompt(`${user}, seleccione un número para continuar.
        1 - Lista peliculas
        2 - Ver promociones
        3 - Reestablecer nombre de usuario y contraseña
        0 - Salir
        `);
    }
}


app();
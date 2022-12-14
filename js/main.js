/*
    Hola, buenas.
    Esta es mi presentación de la segunda pre-entrega.
    La idea es la siguiente, tengo en mente crear un sitio web destinado a un complejo de cines FICTICIO.

        * Tomé como inspiración la web de cinemark ( https://www.cinemarkhoyts.com.ar/ ).

    En el futuro, planeo incluir una cartelera dinámica mediante un array.
    Además incluiré una pasarela de pago y un sistema de logeo.
    La pasarela de pago constará de lo siguiente:
        * Ingreso de los datos de usuario mediante logeo
        * Cantidad de entradas que quiere comprar
        * Sistema de descuentos mediante cupones
        * Selección de butacas
        * Simulación del pago
*/


class User {
    constructor( name, password) {
        this.name = name;
        this.password = password;
    }
}

let usuario; // establece la variante usuario, que será usada mas adelante


// Funciones para establecer nombre de usuario y contraseña
const setUsername = () => {
    let user = prompt('Ingrese su nombre de usuario.');
    // Validación: el usuario no podrá ingresar un campo vacío.
    while( user === '' ) {
        alert('Por favor, complete el campo.');
        user = prompt('Ingrese su nombre de usuario.');
    }
    return user;
};

const setPassword = () => {
    let password = prompt('Escriba su contraseña. Debe tener al menos 8 carácteres.');
    // Validación: el usuario no podrá ingresar una contraseña menor a 8 carácteres.
    while( password.length < 8 ) {
        alert('La contraseña debe tener al menos 8 carácteres.')
        password = prompt('Escriba su contraseña. Debe tener al menos 8 carácteres.')
    }
    return password;
}


const moviesArray = [
    {
        id: 1,
        title:  'Black Panther',
        price: 300
    },
    {   id: 2,
        title:  'Black Adam',
        price: 400
    },
    {
        id: 3,
        title:  'Avatar 2',
        price: 550
    },
    {
        id: 4,
        title:  'One Piece',
        price: 200
    },
]

const peliculas = () => {

    // Imprime la lista de películas en la consola
    alert('La lista se imprimirá en la consola.');
    moviesArray.forEach(( movie ) => {
        console.log(`ID: ${movie.id} Titulo: ${movie.title} \nPrecio x entrada: ${movie.price}`)
    })

    let entrada = parseInt(prompt(`Que película querés ver?
    1 - Black Panther
    2 - Black Adam
    3 - Avatar 2
    4 - One Piece
    `));

    //
    if( movieById = moviesArray.find( movie => movie.id === entrada )) {

        const cantidad = parseInt(prompt(`Vas a ver: ${movieById.title}. \nEl valor de las entradas es de $${movieById.price} \nCuantas entradas queres?`))

        const tieneCodigo = prompt('Tenes código de descuento? Si | No').toLowerCase().trim();
        
        let precio = cantidad * movieById.price;

        switch( tieneCodigo ) {
            case 'si':
                let codigo = prompt('Ingrese el código').trim();
                if( codigo === 'codigo-secreto') {
                    let precioConDescuento = precio * 0.4
                    alert(`Vas a comprar ${cantidad} entrada/s para ver ${movieById.title}. El precio final es de $${precioConDescuento} (%40 de descuento)`)
                    alert('Gracias por su compra')
                } else {
                    alert('Ese código no es válido')
                }
                break;
            case 'no':
                alert(`Vas a comprar ${cantidad} entrada/s para ver ${movieById.title}. El precio final es de $${precio}`)
                alert('Gracias por su compra')
                break;
            default:
                alert('Opción no soportada');
                break;
        }
        
    } else {
        alert('Opción no soportada');
    }

}

const app = () => {

    // uso de la variante usuario, empleando la class User
    usuario = new User( setUsername(), setPassword() );

    // Saludo
    alert(`Hola, ${usuario.name}! Bienvenido/a Movieplex Cinema.`);

    // Menu de opciones
    let entrada = prompt(`${usuario.name}, selecciona un número para continuar.
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
                alert(`Promoción disponible: 40% de descuento con el uso del código: codigo-secreto`);
                break;
            case '3':
                usuario = new User( setUsername(), setPassword() );
                alert(`Hola, ${usuario.name}. Su contraseña es ${usuario.password}`)
                break;
            default:
                alert('Opción no soportada');
                break;
            }
        entrada = prompt(`${usuario.name}, selecciona un número para continuar.
        1 - Lista peliculas
        2 - Ver promociones
        3 - Reestablecer nombre de usuario y contraseña
        0 - Salir
        `);
    }
}

// Inicialización de la función
//app();


// Color en navbar al scrollear
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () =>
    window.scrollY >= 50
        ? nav.classList.add('active-nav')
        : nav.classList.remove('active-nav')
);
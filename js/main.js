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





const loginButton = document.getElementById('login-button');

localStorage.getItem('username') 
    ? loginButton.innerHTML = 'Cerrar sesión'
    : loginButton.innerHTML = 'Iniciar sesión'

/* 
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    Verifica si hay un nombre de usuario almacenado en el almacenamiento local
    Si hay un nombre de usuario almacenado, cambia el texto del botón a "Cerrar sesión"
    Si no hay un nombre de usuario almacenado, deja el texto del botón como "Iniciar sesión"

*/ 

// Elimina el nombre de usuario del almacenamiento local
loginButton.addEventListener('click', () => {
    localStorage.removeItem('username');
})



// Array de peliculas, en el futuro espero poder cambiarlo por la api de themoviedatabase
const movies = [
    {
        id: 1,
        title:  'Black Panther',
        url: 'img/blackPanther.webp',
        genre: 'Acción',
        restriction: '+13',
        lang:'Español, Inglés Subtitulado',
        release: '10/11/2022',
        format: ['2D', '3D'],
        trailerURL: 'BPjbiZQmBI4',
        duration: 165,
        description: 'Una secuela que seguirá explorando el incomparable mundo de Wakanda y todos los ricos y variados personajes presentados en la película de 2018.'
    },
    {   id: 2,
        title:  'Black Adam',
        url: 'img/blackAdam.webp',
        genre: 'Acción',
        restriction: '+13',
        lang:'Español, Inglés Subtitulado',
        release: '20/10/2022',
        format: ['2D', '3D', '4D'],
        trailerURL: 'a1mcS4tKGNg',
        duration: 125,
        description: 'Unos arqueólogos liberan de su tumba a Black Adam, quien llevaba 5000 años preso tras haber recibido los poderes de los dioses. De nuevo entre los humanos, Black Adam se dispone a imponer su justicia, muy diferente a la del mundo en el que despertó.'
    },
    {
        id: 3,
        title:  'Avatar 2',
        url: 'img/avatar.webp',
        genre: 'Ciencia Ficción',
        restriction: '+13',
        lang:'Español, Inglés Subtitulado',
        release: '14/12/2022',
        format: ['2D', '3D', '4D', 'IMAX'],
        trailerURL: 'bDFKIs4v0B4',
        duration: 190,
        description: 'Jake Sully y Ney`tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora cuando una antigua amenaza reaparece.'
    },
    {
        id: 4,
        title:  'One Piece',
        url: 'img/onePiece.webp',
        genre: 'Animada',
        restriction: '+13',
        lang:'Español, Japonés Subtitulado',
        release: '06/07/2022',
        format: ['2D', '3D'],
        trailerURL: '89JWRYEIG-s',
        duration: 93,
        description: 'Uta, la cantante más popular del mundo, va a presentarse en un escenario y revelar su apariencia por primera vez. Luffy y sus amigos acuden al concierto y se dan cuenta de que la voz de Uta es capaz de cambiarlo todo.'
    },
]

// Objeto de precios, responde al array 'format' dentro del array de peliculas
const pricesObject = {
    '2D': 1300,
    '3D': 1500,
    '4D': 2000,
    'IMAX': 2500
};

// Genera tarjetas utilizando el array de peliculas
const billboard = document.getElementById('grid')
movies.forEach( movie => {
    billboard.innerHTML += `
        <div class="movie"id=${movie.id}>
            <img src=${movie.url} alt="Poster de ${movie.title}" class="movie__image">
            <h2 class='movie__title'>${movie.title}</h2>
        </div>
    `
})



// Funciones para crear el select, y las opciones dentro del mismo
const createOptions = formats  => {
    let options = "";
    formats.forEach( format => options += `<option value="${ format }">${ format }</option>` );
    return options;
};

const createSelect = movie =>  `<select id='ticketType'>${ createOptions(movie.format) }</select>`;


const createModal = ( movie ) => {

    //Llamado al id modal, para ser utilizado dentro de la funcion showModal.
    const modal = document.getElementById('modal');
    // Uso del id modal, donde se le agrega la class modal--show
    modal.classList.add('modal--show')
        
    
    // Creacion del select en el DOM
    const select = createSelect(movie);
    document.getElementById('select').innerHTML = select;

    const ticketPriceElement = document.getElementById('price');
    const ticketType = document.getElementById('ticketType');
    const increment = document.getElementById('increment');
    const decrement = document.getElementById('decrement');
    const ticketQuantity = document.getElementById('quantity');
    const subtotalElement = document.getElementById('subtotal');
    
    const updateTicketPrice = () => {
        let selected = ticketType.value;
        const price  = pricesObject[ selected ];
        ticketPriceElement.textContent = `Precio: $${ price }`;
    }
        
    const updateSubtotal = () => {
        let selected = ticketType.value;
        const price  = pricesObject[ selected ];
        const quantity = ticketQuantity.value;
        const subtotal = price * quantity;
        subtotalElement.innerHTML = `Subtotal: $${ subtotal }`;    
    }

    // Este eventListener escucha el cambio dentro del select, y ejecuta las dos funciones de arriba
    ticketType.addEventListener('change', () => {
        updateTicketPrice();
        updateSubtotal();
    });
    // Este eventListener ejecuta la funcion al momento de que se cargar el elemento, para que no se muestre un campo vacío en el DOM al momento de abrir el modal
    ticketType.addEventListener('load', updateTicketPrice());
    
    // Boton para aumentar la cantidad de tickets
    increment.addEventListener('click', () => {
        ticketQuantity.value = Number( ticketQuantity.value ) + 1;
        updateSubtotal();
    });
        
    // Boton para restar la cantidad de tickets
    decrement.addEventListener('click', () => {
        if (ticketQuantity.value > 0) {
            ticketQuantity.value = Number( ticketQuantity.value ) - 1;
            updateSubtotal();
        }
    })  

    // Genera el lado derecho del modal, la información de la pelicula, con los datos provenientes del array de peliculas
    const modalInfo = document.querySelector('.modal__info');
    modalInfo.innerHTML = `
        <img src=${movie.url} alt="Poster de ${movie.title}" class="modal__image"/>
        <h2 class='modal__title'>${movie.title}</h2>
        <p class='modal__data'>Fecha de estreno: <span>${movie.release}</span></p>
        <p class='modal__data'>Formato: <span>${movie.format}</span></p>
        <p class='modal__data'>Género: <span>${movie.genre}</span></p>
        <p class='modal__data'>Restricción: <span>${movie.restriction}</span></p>
        <p class='modal__data'>Duración: <span>${movie.duration}min</span></p>
        <p class='modal__data'>Idioma: <span>${movie.lang}</span></p>
        <h2 class='modal__subtitle'>Sinopsis</h2>
        <p class='modal__description'>${movie.description}</p>
        <h2 class='modal__subtitle'>Trailer</h2>
        <iframe class='modal__trailer' src='https://www.youtube.com/embed/${movie.trailerURL}'></iframe>
    `


    // Botón de cierre
    let closeBtn = document.querySelector('.modal__close')
    closeBtn.addEventListener('click', () => {
        // Uso del id modal, donde se le quita la class modal--show, generando el efecto de salida
        modal.classList.remove( 'modal--show' )
    })
}

// Genera el modal al hacer click en cualquier tarjeta
movies.forEach( movie => {
    var movieElement = document.getElementById(movie.id);
    movieElement.addEventListener('click', ()  => createModal(movie) );
});
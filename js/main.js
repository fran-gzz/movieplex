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





// Objeto de precios, responde al array 'format' dentro del array de peliculas
const pricesObject = {
    '2D': 1300,
    '3D': 1500,
    '4D': 2000,
    'IMAX': 2500
};

// Genera tarjetas utilizando el array de peliculas

// movies.forEach( movie => {
//     billboard.innerHTML += `
//         <div class="movie"id=${movie.id}>
//             <img src=${movie.url} alt="Poster de ${movie.title}" class="movie__image">
//             <h2 class='movie__title'>${movie.title}</h2>
//         </div>
//     `
// })







const API_KEY   = '2aa7bc7b6c9ccd4b3002154d5f9176ee'
const API_URL   = 'https://api.themoviedb.org/3/movie'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280'








const useFetch = async ( endpoint ) => {
    const response = await fetch( endpoint );
    return await response.json();
}


const getCertification = async ( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/release_dates?api_key=${ API_KEY }`;
    try {
        const data = await useFetch( endpoint )
        const certification = 
            data.results.find(result => result.iso_3166_1 === 'US')
                ? data.results.find(result => result.iso_3166_1 === 'US').release_dates[0].certification
                : ''
        return certification;
    } 
    catch (error) {
        console.error(error);
    }
}

 const getMovieTrailer = async( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/videos?api_key=${ API_KEY }`;
    const data = await useFetch( endpoint );
    return data.results[0].key;
}

const getMovieCredits = async( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/credits?api_key=${ API_KEY }`;
    const data = await useFetch( endpoint );
    return data
}




const fetchMovies = async () => {
    const endpoint = `${API_URL}/now_playing?api_key=${API_KEY}&language=es-MX`
    try {
        const data = await useFetch( endpoint );
        return movies = data.results.slice(0, 18);
    }
    catch ( error ) {
        console.log(error);
    }

}








const billboard = document.getElementById('grid')

const main = async () => {
    const movies = await fetchMovies();
    movies.forEach( movie => {
        billboard.innerHTML += `
         <div class="card" data-id='${movie.id}'>
             <img src=${ IMAGE_URL + movie.poster_path} alt="Poster de ${movie.title}" class="card__image">
             <h2 class='card__title'>${movie.title}</h2>
        </div>
    `
    })
    const movieCards = document.querySelectorAll('.card')
    movieCards.forEach( movieCard => {
        movieCard.addEventListener('click', () => createModal( movieCard ))
    })
}

main();


// Genera el modal al hacer click en cualquier tarjeta
// movies.forEach( movie => {
//     var movieElement = document.getElementById(movie.id);
//     movieElement.addEventListener('click', ()  => createModal(movie) );
// });





const getMovieById = async ( id ) => {
    const endpoint = `${API_URL}/${id}?api_key=${API_KEY}&language=es-MX`
    return data = useFetch( endpoint );
}





// Funciones para crear el select, y las opciones dentro del mismo
// const createOptions = formats  => {
//     let options = "";
//     formats.forEach( format => options += `<option value="${ format }">${ format }</option>` );
//     return options;
// };

// const createSelect = movie =>  `<select id='ticketType'>${ createOptions(movie.format) }</select>`;





//Llamado al id modal, para ser utilizado dentro de la funcion showModal.
const modal = document.getElementById('modal');


const createModal = async ( movieCard ) => {

    
    // Uso del id modal, donde se le agrega la class modal--show
    modal.classList.add('modal--show')
    const movieId = movieCard.getAttribute('data-id')
    

    const movie = await getMovieById( movieId );
    const movieTrailer = await getMovieTrailer( movieId );
    
    const credits = await getMovieCredits( movieId );

    const crew = credits.crew

    let director = '';
    for (let i = 0; i < crew.length; i++) {
        if ( crew[i].job === 'Director') {
            director = crew[i].name
        }
    }
    
    
    




    
    
    const protagonists = credits.cast.filter( member => member.known_for_department === 'Acting').slice(0, 4)
    
    const certification = await getCertification(movieId)

    

    const releaseDate = movie.release_date;

    let date = new Date( releaseDate );
    let formattedDate = date.toLocaleDateString();

    let runtime = movie.runtime
    let hours = Math.floor(runtime / 60)
    let minutes = runtime % 60;
    let formattedRuntime = `${hours}h ${minutes}min`

    
    // // Creacion del select en el DOM
    // const select = createSelect(movie);
    // document.getElementById('select').innerHTML = select;

    // const ticketPriceElement = document.getElementById('price');
    // const ticketType = document.getElementById('ticketType');
    // const increment = document.getElementById('increment');
    // const decrement = document.getElementById('decrement');
    // const ticketQuantity = document.getElementById('quantity');
    // const subtotalElement = document.getElementById('subtotal');
    




    // const updateTicketPrice = () => {
    //     let selected = ticketType.value;
    //     const price  = pricesObject[ selected ];
    //     ticketPriceElement.textContent = `Precio: $${ price }`;
    // }
        
    // const updateSubtotal = () => {
    //     let selected = ticketType.value;
    //     const price  = pricesObject[ selected ];
    //     const quantity = ticketQuantity.value;
    //     const subtotal = price * quantity;
    //     subtotalElement.innerHTML = `Subtotal: $${ subtotal }`;    
    // }

    // // Este eventListener escucha el cambio dentro del select, y ejecuta las dos funciones de arriba
    // ticketType.addEventListener('change', () => {
    //     updateTicketPrice();
    //     updateSubtotal();
    // });
    // // Este eventListener ejecuta la funcion al momento de que se cargar el elemento, para que no se muestre un campo vacío en el DOM al momento de abrir el modal
    // ticketType.addEventListener('load', updateTicketPrice());
    
    // // Boton para aumentar la cantidad de tickets
    // increment.addEventListener('click', () => {
    //     ticketQuantity.value = Number( ticketQuantity.value ) + 1;
    //     updateSubtotal();
    // });
        
    // // Boton para restar la cantidad de tickets
    // decrement.addEventListener('click', () => {
    //     if (ticketQuantity.value > 0) {
    //         ticketQuantity.value = Number( ticketQuantity.value ) - 1;
    //         updateSubtotal();
    //     }
    // })  


    
    // Genera el lado derecho del modal, la información de la pelicula, con los datos provenientes del array de peliculas
    const movieElement = document.querySelector('.movie');
    movieElement.innerHTML = `
        <div class='movie__header'>
            <img src=${IMAGE_URL + movie.backdrop_path} alt="Poster de ${movie.title}" class="movie__header--image"/>
            <div class='movie__header--content'>
                <h2 class='movie__header--title'>${movie.title}</h2>
                <div class='movie__header--wrapper'>
                    <p class='movie__header--data movie__header--certification'>
                        ${ certification || 'Desconocido' }
                    </p>
                    <p class='movie__header--data'>
                        ${ formattedDate }
                    </p>
                    <p class='movie__header--data'>
                        ${ formattedRuntime }
                    </p>
                    <p class='movie__header--data movie__header--genres'>
                        ${ movie.genres.map( e => 
                            `<span class='movie__header--genre'>${ e.name }</span>`
                            ).join(',')
                        }
                    </p>
                </div>
            </div>
        </div>
        <div class='movie__body'>
            <p class='movie__body--text'>Director:
            <span class='movie__body--textHighlighted'>${director}</span></p>
            <p class='movie__body--text'>Protagonizada por: ${
                protagonists.map(
                    protagonist => `<span class='movie__body--textHighlighted'>${protagonist.name}</span>`
                ).join(', ')
            }</p>
            
            <h2 class='movie__body--title'>Sinopsis</h2>
            <p class='movie__body--text'>${movie.overview}</p>
            <h2 class='movie__body--title'>Trailer</h2>
            <iframe 
                src="https://www.youtube.com/embed/${movieTrailer}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen 
                class='movie__body--trailer'
            >
            </iframe>
        </div>
    `


    // Botón de cierre
    let closeBtn = document.querySelector('.modal__close')
    closeBtn.addEventListener('click', () => {
        // Uso del id modal, donde se le quita la class modal--show, generando el efecto de salida
        modal.classList.remove( 'modal--show' )
    })
}





// Función que calcula la cantidad de asientos seleccionados
function calcularCantidadAsientos() {
    // Obtener todos los botones de asientos
    const asientos = document.querySelectorAll(".seat");
    // Contador de asientos seleccionados
    let cantidad = 0;

    const valor = 1500;



    // Recorrer cada botón de asiento
    asientos.forEach(function(asiento) {
      // Si el botón tiene la clase "seleccionado", incrementar el contador
      if (asiento.classList.contains("selected")) {
        cantidad++;
      }
    });
    
    // Habilitar o deshabilitar el botón de compra en función de la cantidad de entradas seleccionadas
    if (cantidad > 0) {
      document.querySelector("button[type=submit]").disabled = false;
    } else {
      document.querySelector("button[type=submit]").disabled = true;
    }

    let entradas =  document.getElementById('entradas');


    let valorTotal = cantidad * valor;

    const subtotal = document.getElementById('subtotal');

    entradas.innerHTML = `Cantidad de entradas: ${cantidad}`
    subtotal.innerHTML = `Subtotal: $${valorTotal}`
  }


  


  // Agregar eventos a los botones de asiento
  const asientos = document.querySelectorAll(".seat");
  asientos.forEach(function(asiento) {
    asiento.addEventListener("click", function() {
      // Añadir o quitar la clase "seleccionado" al hacer clic en el botón
      asiento.classList.toggle("selected");
      // Llamar a la función que calcula la cantidad de asientos seleccionados
      calcularCantidadAsientos();
    });
  });


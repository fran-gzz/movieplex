class Peli {
    constructor( titulo, cantidad, total ) {
        this.titulo   = titulo;
        this.cantidad = cantidad;
        this.total    = total;
    }
}


const navigatorItem = document.getElementById('navigatorItem');
const saludoUsuario = document.getElementById('saludoUsuario')
const loginButton   = document.getElementById('login-button');

const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

usuarioActual
    ? (
        loginButton.innerHTML = 'Cerrar sesión',
        saludoUsuario.innerHTML = `Hola, ${usuarioActual.nombre}`
    )
    : (
        loginButton.innerHTML = 'Iniciar sesión',
        navigatorItem.style.display = 'none',
        saludoUsuario.style.display = 'none'
    );


// Cerrar sesión
loginButton.addEventListener('click', () => localStorage.removeItem('usuarioActual'))

// Datos del api 'the movie database'
const API_KEY   = '2aa7bc7b6c9ccd4b3002154d5f9176ee'
const API_URL   = 'https://api.themoviedb.org/3/movie'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280'

const useFetch = async ( endpoint ) => {
    const response = await fetch( endpoint );
    return await response.json();
}

const getMovies = async () => {
    const endpoint = `${API_URL}/now_playing?api_key=${API_KEY}&language=es-MX`
    const loader = document.getElementById('loading')
    try {
        loader.style.display = 'flex';
        const data = await useFetch( endpoint );
        const movies = data.results.slice(0, 18);
        loader.style.display = 'none'
        return movies;
    }
    catch ( error ) {
        console.log(error);
    }
}

const getCertification = async ( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/release_dates?api_key=${ API_KEY }`;
    try {
        const data = await useFetch( endpoint )
        const certification = 
            data.results.find( result => result.iso_3166_1 === 'US' )
                ? data.results.find( result => result.iso_3166_1 === 'US' ).release_dates[0].certification
                : null
        return certification;
    } catch ( error ) { 
        console.error( error ); 
    }
}

 const getMovieTrailer = async( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/videos?api_key=${ API_KEY }`;
    try {
        const data = await useFetch( endpoint );
        return data.results[0].key;
    } catch( error ){
        console.error( error );
    }
}

const getMovieCredits = async( movieId ) => {
    const endpoint = `${ API_URL }/${ movieId }/credits?api_key=${ API_KEY }`;
    try {
        return data = await useFetch( endpoint ); 
    } catch( error ){
        console.error( error );
    }
}

const getMovieById = async ( id ) => {
    const endpoint = `${API_URL}/${id}?api_key=${API_KEY}&language=es-MX`
    return data = useFetch( endpoint );
}

const createModal = async ( movieCard ) => {

    //Llamado al id modal, para agregar la class modal--show
    document.getElementById('modal').classList.add('modal--show')
    
    // Llamado al id de la pelicula, para posteriormente realizar la obtención de los datos correspondientes a la película
    const movieId = movieCard.getAttribute('data-id')

    const movie         = await getMovieById( movieId );
    const movieTrailer  = await getMovieTrailer( movieId );
    const certification = await getCertification( movieId );
    const credits       = await getMovieCredits( movieId );
    
    // Busca al director dentro del crew de la pelicula
    let director = '';
    for (let i = 0; i < credits.crew.length; i++) {
        credits.crew[i].job === 'Director' ? director = credits.crew[i].name : ''
    }

    // Filtra el cast para obtener los primeros 5 actores
    const protagonists = credits.cast.filter( member => member.known_for_department === 'Acting').slice(0, 5)
    
    // Fecha de estreno de la pelicula
    let date = new Date( movie.release_date );
    let releaseDate = date.toLocaleDateString();

    // Duración de la pelícua
    let hours = Math.floor( movie.runtime / 60 )
    let minutes = movie.runtime % 60;
    let runtime = `${hours}h ${minutes}min`

    // Genera el lado derecho del modal, la información de la pelicula, con los datos provenientes del array de peliculas
    const movieElement = document.querySelector('.movie');
    movieElement.innerHTML = `
        <div class='movie__header'>
            <img src=${IMAGE_URL + movie.backdrop_path} alt="Poster de ${movie.title}" class="movie__header--image"/>
            <div class='movie__header--content'>
                <h2 class='movie__header--title'>${movie.title}</h2>
                <div class='movie__header--wrapper'>
                    <p class='movie__header--data movie__header--certification'> ${ certification || 'Desconocido' } </p>
                    <p class='movie__header--data'> ${ releaseDate } </p>
                    <p class='movie__header--data'> ${ runtime } </p>
                    <p class='movie__header--data movie__header--genres'>
                        ${ movie.genres.map( e => `<span class='movie__header--genre'>${ e.name }</span>` ).join(',')}
                    </p>
                </div>
            </div>
        </div>
        <div class='movie__body'>
            <p class='movie__body--text'>Director:
            <span class='movie__body--textHighlighted'>${ director }</span></p>
            <p class='movie__body--text'>Protagonizada por: ${
                protagonists.map(
                    protagonist => `<span class='movie__body--textHighlighted'>${ protagonist.name }</span>`
                ).join(', ')
            }</p>
            
            <h2 class='movie__body--title'>Sinopsis</h2>
            <p class='movie__body--text'>${ movie.overview }</p>
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

    const calcularCantidadAsientos = () => {
           
        const price  = 1500; // Valor de las entradas
        let quantity = 0; // Contador de asientos seleccionados    

        // Recorrer cada botón de asiento
        document.querySelectorAll(".tickets__seats--seat")
        .forEach(
            // Si el botón tiene la clase "seleccionado", incrementar el contador
            seat => seat.classList.contains("selected") 
                ? quantity++
                : null
        );

        // Valor total 
        let total = quantity * price;
        
        
        // uso de la clase Peli
        let elemento = new Peli(movie.title, quantity, total)

        // Habilitar o deshabilitar el botón de compra en función de la cantidad de entradas seleccionadas
        const boton = document.getElementById('botonCompra');
        quantity > 0 
            ? (
                boton.disabled = false,
                usuarioActual 
                    /* 
                        Se guarda en sessionStorage el titulo de la pelicula, la cantidad de entradas y el total a pagar
                        Hice uso de esto para poder comunicar entre componentes
                    */
                    ? sessionStorage.setItem('elemento', JSON.stringify(elemento))
                    : null
                
            ) : boton.disabled = true
        // Escritura en el DOM
        document.getElementById('entradas').innerHTML = `Cantidad de entradas: ${ quantity }`
        document.getElementById('subtotal').innerHTML = `Subtotal: $${ total }`
    }

    // Manejo de los asientos, y llamado a la función que calcula la cantidad de asientos seleccionados
    document.querySelectorAll(".tickets__seats--seat").forEach( 
        seat => {
            seat.addEventListener( "click", () => {
                seat.classList.toggle( "selected" );
                calcularCantidadAsientos();
            });
        }
    )
    // Función del cierre del modal
    document.querySelector('.modal__close').addEventListener('click', () => 
        document.getElementById('modal').classList.remove( 'modal--show' )
    )
    
}

const comprar = () => {
    // Botón de compra, lanza la función mostrarConfirmación
    document.getElementById('botonCompra').addEventListener("click", mostrarConfirmacion);
}
  

const mostrarConfirmacion = () => {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    usuarioActual
        ? ( window.location.href = './pages/cart.html' )
        : Swal.fire({
            icon: 'warning',
            text: 'Debes iniciar sesión para continuar',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true
        })
}


const main = async () => {

    const billboard = document.getElementById( 'grid' )
    const movies    = await getMovies();

    movies.forEach( movie => {
        billboard.innerHTML += `
         <div class="card" data-id='${movie.id}'>
             <img src=${ IMAGE_URL + movie.poster_path} alt="Poster de ${movie.title}" class="card__image">
             <h2 class='card__title'>${movie.title}</h2>
        </div>
    `
    })
    const movieCards = document.querySelectorAll('.card')
    movieCards.forEach( movieCard => movieCard.addEventListener('click', () => createModal( movieCard )))

    comprar();
}

main();
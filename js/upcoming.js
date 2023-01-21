// Sistema para manejar el DOM en el inicio de sesión
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
    )
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


// Trae las peliculas que están en el cine 
const getMovies = async () => {
    const endpoint = `${API_URL}/now_playing?api_key=${API_KEY}&language=es-MX`
    try {
        const data = await useFetch( endpoint );
        return movies = data.results;
    }
    catch ( error ) {
        console.log(error);
    }
}

/* 
    Trae las peliculas que están proximas a estrenarse.
    Lamentablemente, también trae algunas péliculas que ya están estrenadas.
    No sé por qué, supongo que así es la forma de trabajar del api.
    Pude hacer un apaño haciendo que filtre por ID a las películas que ya vienen en el método now_playing. 
    Es por eso que también tuve que hacer uso del método now_playing del api.
*/
const getUpcomingMovies = async () => {
    const endpoint = `${API_URL}/upcoming?api_key=${API_KEY}&language=es-MX`
    const loader = document.getElementById('loading')
    const nowPlaying = await getMovies();
    try {
        loader.style.display = 'flex';
        const data = await useFetch( endpoint );
        const upcomingMovies = data.results.filter( 
            movie => !nowPlaying.some(
                nowPlaying => nowPlaying.id === movie.id
            )
        )
        loader.style.display = 'none'
        return upcomingMovies
    }
    catch ( error ) {
        console.log(error);
    }
}

const main = async () => {

    const billboard = document.getElementById( 'grid' )
    const movies    = await getUpcomingMovies();

    movies.forEach( movie => {
        billboard.innerHTML += `
         <div class="card" data-id='${movie.id}' style='cursor: default'>
             <img src=${ IMAGE_URL + movie.poster_path} alt="Poster de ${movie.title}" class="card__image">
             <h2 class='card__title'>${movie.title}</h2>
        </div>
    `
    })
}

main();
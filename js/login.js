class User {
    constructor( username, password ) {
      this.username = username;
      this.password = password;
    }
  
    login() {
      // Verifica si el nombre de usuario y la contraseña son válidos
        this.username === 'admin' && this.password === 'password'
        ? (
            // Almacena el nombre de usuario en el almacenamiento local
            localStorage.setItem('username', this.username),
            // Redirige al usuario a la página principal
            window.location.href = '../index.html'
        ) 
        : alert('Nombre de usuario o contraseña inválidos');
    }
}
  
const loginForm = document.getElementById('login-form');
  
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    // Obtiene los valores de los inputs de nombre de usuario y contraseña
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Crea una nueva instancia de la clase Login con los valores proporcionados
    const login = new User(username, password);
    // Llamar al método login de la instancia
    login.login();
});

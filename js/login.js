
class Usuario {
    constructor( nombre, email, password ){
        this.nombre   = nombre;
        this.email    = email;
        this.password = password;
    }
}

class Sesion {
    constructor() {
        // Recupera los usuarios almacenados en LocalStorage
        this.usuarios = JSON.parse( localStorage.getItem('usuarios') ) || [];
    }
    
    registroExitoso = ( nuevoUsuario )  => 
        !this.usuarios.find(( usuario ) => usuario.email === nuevoUsuario.email )
        ? ( 
            this.usuarios.push( nuevoUsuario ),
            localStorage.setItem( 'usuarios', JSON.stringify( this.usuarios )), // Agrega el usuario a la lista de usuarios
            true
        ) : false

    setUsuarioActual = ( usuario ) => localStorage.setItem( 'usuarioActual', JSON.stringify( usuario ) )

    getUsuarioActual = () => JSON.parse( localStorage.getItem('usuarioActual') );

    registrarUsuario = () => {
        // Obtiene los valores ingresados en el form
        let nombre   = document.getElementById("nombre").value;
        let email    = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Crea un nuevo usuario usando los valores
        let nuevoUsuario    = new Usuario( nombre, email, password );
        let registroExitoso = this.registroExitoso( nuevoUsuario );

        // Almacena la lista de usuarios en LocalStorage
        localStorage.setItem( "usuarios", JSON.stringify( this.usuarios ));

        // Verifica si el correo ya está registrado, y si no lo está, redirecciona al login para que el usuario pueda iniciar sesión con los datos establecidos
        registroExitoso 
        ? (
            // Uso de la librería sweetalert
            Swal.fire({
                icon: 'success',
                title: 'Gracias!',
                text: 'Registro exitoso. Serás redireccionado, por favor inicia sesión con los datos que proporcionaste',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            }),
            setTimeout( () => { location.replace('../pages/login.html'); }, 3000 )
        ) 
        : Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Registro fallido, el correo ya esta registrado'
        })
    }

    iniciarSesion = () => {
        let email = document.getElementById("email-login").value;
        let password = document.getElementById("password-login").value;

        const usuario = this.usuarios.find( usuario => usuario.email === email && usuario.password === password )
    
        if( usuario ) {
            this.setUsuarioActual(usuario)
        }
        if( !usuario ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email o la contraseña ingresada no coinciden',
                showConfirmButton: false,
            })
            return;
        }
        
        Swal.fire({
            icon: 'success',
            title: `Bienvenido, ${usuario.nombre}`,
            text: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true

        })
        setTimeout( () => { window.location.href = '../index.html' }, 5000)
    }
}
let sesion = new Sesion();
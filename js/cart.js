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


class Cart {
    constructor() {
        this.products = [];
    }

    addProduct( product ) {
        if( product ) {
            let existingProduct = this.products.find(p => p.titulo === product.titulo);

            if (!existingProduct) {

                this.products.push(product);
                localStorage.setItem("cart", JSON.stringify(this.products));

            } else { console.log(`Producto <<${product.titulo}>> ya agregado al carrito`); }
        } else { console.log("producto no definido"); }
    }

    removeProduct( productName ) {
        this.products = this.products.filter(p => p.titulo !== productName);
        localStorage.setItem("cart", JSON.stringify(this.products));
    }

    saveToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this));
    }

    static loadFromLocalStorage() {
        let cart = localStorage.getItem("cart");
        if (cart) {
            return Object.assign(new Cart(), JSON.parse(cart));
        } else {
            return new Cart();
        }
    }
}


// Crear una instancia del carrito
let cart = Cart.loadFromLocalStorage();

const product = JSON.parse(sessionStorage.getItem('elemento')) 

cart.addProduct( product );
cart.saveToLocalStorage();

const mostrarCart = () => {
    let tableBody = document.getElementById('table-body')
    let rows = '';
    if (cart.products.length > 0 ) {
        cart.products.forEach( product => {
            rows += `
                <tr>
                    <td style="width: 100%;">${product.titulo}</td>
                    <td>${product.cantidad}</td>
                    <td>$${product.total}</td>
                    <td style="display: flex; gap: 15px;">
                        <button class="btn btn-success">Pagar</button>
                        <button class="btn btn-danger" data-name='${product.titulo}'>Cancelar</button>
                    </td>
                </tr>`;
        });
        tableBody.innerHTML = rows;
    } else {
        tableBody.innerHTML = `<div class='p-4'> Aún no has seleccionado una película </div>`
    }
    
    let successButtons = document.getElementsByClassName('btn-success');
    for (let button of successButtons) {
        button.onclick = () => {
            Swal.fire({
                icon: 'success',
                title: 'Gracias por su compra',
                text: 'En breve recibirá un correo con los detalles de la operación',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            })
            button.disabled = true;
        };
    }
    

    let removeButtons = document.getElementsByClassName("btn-danger");
    for (let button of removeButtons) {
        button.onclick = function() {
            cart.removeProduct(this.dataset.name);
            sessionStorage.removeItem('elemento')
            mostrarCart();
        };
    }
}


mostrarCart();
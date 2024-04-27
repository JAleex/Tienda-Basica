let carrito = [];


document.addEventListener("DOMContentLoaded", function() {
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoEnLocalStorage) {
        carrito = carritoEnLocalStorage;
        actualizarContadorCarrito();
        actualizarTotalAPagar();
    }
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productPrice = parseInt(button.getAttribute('data-product-price'));
        const productName = button.getAttribute('data-product-name');
        carrito.push({
            id: productId,
            price: productPrice,
            name: productName
        });
       
        actualizarContadorCarrito();
    });
});

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contador-carrito');
    contadorCarrito.textContent = carrito.length;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


function eliminarProductoDelCarrito(productId) {
       
    const indice = carrito.findIndex(producto => producto.id === productId);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
        actualizarTotalAPagar();
    }
    actualizarTotalAPagar();
   
}

function calcularTotalAPagar() {
    let total = 0;
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoEnLocalStorage) {
        carritoEnLocalStorage.forEach(producto => {
            total += producto.price; 
        });
    }
    return total;
}

// Función para actualizar el total a pagar en el HTML
function actualizarTotalAPagar() {
    const totalPagarSpan = document.getElementById('total-pagar');
    const totalPagar = calcularTotalAPagar();
    totalPagarSpan.textContent = `$${totalPagar.toFixed(2)}`; 
}

document.addEventListener("submit", function() {
    carrito = []; 
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito(); 
    alert("Pago Exitoso.. Gracias por su Compra!");
    
});
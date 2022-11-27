import productos from '../js/carritoProductos.js'

document.addEventListener("DOMContentLoaded",cargarProducto);
function cargarProducto(){
    encontrarCarrito();
}

function encontrarCarrito(){
    const ubicacionActual = Number(window.location.search.slice(4,));
    const productoEncontrado = productos.filter(e => e.id === ubicacionActual);
    const titulo = document.querySelector(".titulo"),precioAnterior = document.querySelector(".precio-anterior"),precioActual = document.querySelector(".precio"),imagenProducto = document.querySelector(".imagen-producto");
    const {nombre,precio,imagen} = productoEncontrado[0];

    titulo.textContent = nombre;
    precioAnterior.textContent = `$${precio + (precio * 0.25)}`;
    precioActual.textContent = "$"+precio;
    imagenProducto.src = imagen;
}

import productos from '../js/carritoProductos.js'
const productosDiv = document.querySelector(".productos");
const filtros = document.querySelectorAll(".filtrado");
let carritoArray = JSON.parse(localStorage.getItem("carrito")) || [];


imprimirHTML(productos);
carrito();
filtros.forEach(e =>{
    e.addEventListener("click",filtrar);
})
function filtrar({target,target:{innerText}}){
    if(document.querySelector(".activo2") == target){
        document.querySelector(".activo2").classList.remove("activo2");
        productosDiv.innerHTML = ""
        imprimirHTML(productos);
        carrito();
        return;
    }
    document.querySelector(".activo2") ? document.querySelector(".activo2").classList.remove("activo2") : null;
    target.classList.add("activo2");
    const filtrado = productos.filter(e =>{
        return e["categorias"].includes(innerText);
    })
    productosDiv.innerHTML = ""
    imprimirHTML(filtrado);
    carrito();
};

function carrito(){
    const btn = document.querySelectorAll(".boton");
    btn.forEach(e =>{
        e.addEventListener("click",(e) =>{
            obtenerProducto(e.target);
        })
    });
    imprimirCarrito();
}
function obtenerProducto(btn){
    const objEncontrado = productos.filter(e =>{
        return e.id === Number(btn.dataset.id);
    });
    let existe = carritoArray.some(producto =>{
        return producto.id == objEncontrado[0].id
    })
    if(existe){
        carritoArray.forEach(e =>{
            if(e.id == objEncontrado[0].id){
                e.cantidad++;
        }})
        imprimirCarrito();
        return;
    }
    const {id,nombre,precio,imagen} = objEncontrado[0];
    const objCarrito = {
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1,
    };
    carritoArray.push(objCarrito);
    imprimirCarrito();
};
function imprimirCarrito(){
    const carritoDescripcion = document.querySelector("#descripcion");
    if(carritoArray.length == 0 && !document.querySelector(".vacio")){
        carritoDescripcion.innerHTML = "";
        const td = document.createElement("td");
        td.classList.add("vacio");
        td.textContent = "El carrito esta vacío";
        carritoDescripcion.appendChild(td);
        localStorage.setItem("carrito",JSON.stringify(carritoArray,null,2));
        return;
    }
    document.querySelector(".vacio") ? document.querySelector(".vacio").remove() : null;
    console.log(carritoArray);
    carritoDescripcion.innerHTML = "";
    carritoArray.forEach(producto =>{
        carritoDescripcion.innerHTML += `
        <tr class="relative">
            <td>
                <img class="imagen-carrito" src="${producto.imagen}">
            </td>

            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td class="eliminar absolute hover:cursor-pointer text-amber-600 font-bold" data-id="${producto.id}">X</td>
        </tr>
        `
    });
    localStorage.setItem("carrito",JSON.stringify(carritoArray,null,2));
    const btns = document.querySelectorAll(".eliminar");
    btns.forEach(e => {
        e.addEventListener("click",eliminarObjCarrito)
    })
}
function eliminarObjCarrito({target,target:{dataset:{id}}}){
    carritoArray = carritoArray.filter(e => e.id !== Number(id));
    imprimirCarrito();
}
function imprimirHTML(arr){
    if(arr.length == 0){
        document.querySelector(".tituloProductos").textContent = "No se encontro ningun producto ;(";
      }else{
          document.querySelector(".tituloProductos").textContent = "Nuestros Productos";
          arr.forEach(e =>{
              productosDiv.innerHTML += `
                  <div class="text-center p-4 h-full">
                      <div class="">
                          <a href="producto.html?id=${e.id}">
                              <img loading="lazy" class="imagen md:h-40 md:w-full" src="${e.imagen}" alt="pc imagen">
                          </a>
                          <h3 class="text-xl mb-3 text-amber-600">${e.nombre}</h3>
                      </div>
                      <a data-id=${e.id} class="boton block w-full text-slate-200 bg-amber-500 py-2 px-4 hover:bg-amber-700 hover:text-slate-100 transition-colors hover:transition-colors h-6 hover:cursor-pointer">Agregar al carrito</a>
                  </div>
              `
          }); 
          
      }
}

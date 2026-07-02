let productos = [
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
    {nombre:"Spiderman 4", precio:2000},
];

let carrito = [];

const Clave_Carrito="carrito";

function guardarCarrito(){
    localStorage.setItem(Clave_Carrito, JSON.stringify(carrito));
}

function cargarCarrito(){
    let guardado = localStorage.getItem(Clave_Carrito);

    if(guardado){
        carrito = JSON.parse(guardado);
    }
}

function agregarProducto(producto){
    carrito.push(producto);
    console.log(producto.nombre + "Agregado al carrito");
    actualizarCarrito();
}

function calcularTotal(){
    let total = 0;

    for (let producto of carrito){
        total += producto.precio;
    }
    return total;
}
    
function mostrarCarrito(){
    console.log("Productos del carrito: ");
    for (let producto of carrito){
        console.log(producto.nombre + producto.precio + " Pesos");

    }

}

function mostrarProductos(){
    let lista = document.getElementById("lista-productos");
    lista.innerHTML = "";

    for(let i = 0; i < productos.length; i++){

        let producto = productos[i];

        let item = document.createElement("li");
        item.className = "producto-item";

        item.innerHTML =
        "<span class='producto-nombre'>" + producto.nombre + "</span> " +
        "<span class='producto-precio'>$" + producto.precio + "</span> " +
        "<button class='btn-agregar' data-indice='" + i + "'>Agregar</button>";

        lista.appendChild(item);
    }

    let botones = document.querySelectorAll(".btn-agregar");

    for(let boton of botones){
        boton.addEventListener("click", function(){

            let indice = boton.getAttribute("data-indice");

            agregarProducto(productos[indice]);

        });
    }
}

function actualizarCarrito(){
    guardarCarrito();
    mostrarCarrito();
}

function quitarProducto(indice){
    let producto = carrito[indice];
    carrito.splice(indice,1);
    console.log(producto.nombre + "Se ha quitado el producto");

    actualizarCarrito();
}

function vaciarCarrito(){
    carrito = [];
    console.log("carrito vaciado");

    actualizarCarrito();
}

function finalizarCompra(){

    if(carrito.length === 0){

        Swal.fire({
            icon: "info",
            title: "El carrito está vacío",
            text: "Agrega productos antes de pagar.",
            confirmButtonColor:"#ff9901"
        });

        return;
    }

    Swal.fire({
        icon:"success",
        title:"Gracias por comprar!!!!",
        html:
        "Total a pagar: <strong>$" + calcularTotal() + "</strong><br><br>" +
        "<small>El pago es solo una demostración, no se procesa ningún cobro.</small>",
        confirmButtonText:"Cerrar",
        confirmButtonColor:"#ff9832"
    });

}

cargarCarrito();
mostrarProductos();
mostrarCarrito();
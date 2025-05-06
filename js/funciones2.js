/**
 * Crear un array de objetos que contenga los datos de productos
 * Cada objeto debe tener los siguientes campos: id (que no se repita), nombre, precio, descripcion, oferta, imagen
 * nombre y descripcion son strings
 * precio es numérico
 * oferta es booleano
 * imagen es un string con la ruta a la imagen del producto
 */
const products = [
    { id: 1, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 3, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 4, name: "Camiseta Chica", price: 19.99, image: "../img/camisetaChica4.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 5, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico1.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 6, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico2.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 7, name: "Camiseta Chico", price: 19.99, image: "../img/camisetaChico3.jpeg", sizes: ["S", "M", "L", "XL"] },
    { id: 8, name: "Pantalón", price: 39.99, image: "../img/pantalon.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 9, name: "Pantalón", price: 29.99, image: "../img/pantalonPirata.jpeg", sizes: ["28", "30", "32", "34"] },
    { id: 10, name: "Vestido", price: 59.99, image: "../img/vestido1.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 11, name: "Vestido", price: 49.99, image: "../img/vestido2.jpeg", sizes: ["38", "39", "40", "41", "42"] },
    { id: 12, name: "Vestido", price: 39.99, image: "../img/vestido3.jpeg", sizes: ["38", "39", "40", "41", "42"] },
];

const productsContainer = document.getElementById("products");
let lineasCarrito = [];



function displayProducts(){
    productsContainer.innerHTML = products.map((product) => 
        `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="product-cantidad">
                <p>Precio: ${product.price.toFixed(2)}€</p>
                <select id="cantidad-${product.id}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            
            <select id="size-${product.id}">
                ${product.sizes.map(talla => 
                    `<option value="${talla}">${talla}</option>`
                ).join('')
            }
            </select>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        </div>
        `
    ).join('');
}



function addToCart(productId){
    const producto = products.find(p => p.id === productId)
    const size = document.getElementById(`size-${productId}`).value;
    const cantidad = parseInt(document.getElementById(`cantidad-${productId}`).value);


    //comprobar si el producto existe en el carrito con la misma talla
    const productoExiste = lineasCarrito.findIndex(item => item.id === productId && item.size === size);

    if(productoExiste === -1){
        //el producto no está en el carrito
        lineasCarrito.push({...producto, size, cantidad});
    }else{
        //el producto ya está en el carrito
        lineasCarrito[productoExiste].cantidad += cantidad;
    }

    console.log(lineasCarrito);
    actualizarCarrito();
    guardarEnLocalStorage();
}

function actualizarCarrito(){

    document.getElementById("cart-items").innerHTML = lineasCarrito.map((linea, index) =>
        `
        <div class="cart-item">
            <span>${linea.name} ${linea.size} - ${linea.price.toFixed(2)}€</span>
            <button onclick="actualizarCantidad(${index}, ${linea.cantidad -1})">-</button>
            <span>${linea.cantidad}</span>
            <button onclick="actualizarCantidad(${index}, ${linea.cantidad +1})">+</button>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        </div>
        `
    ).join('')
    //calcular el total de la compra
    let totalCarrito = 0;
    for(let i = 0 ; i < lineasCarrito.length ; i++){
        totalCarrito = totalCarrito + (lineasCarrito[i].price * lineasCarrito[i].cantidad);
    }
    document.getElementById("cart-total").textContent = `Total: ${totalCarrito.toFixed(2)} €`



    // const total = lineasCarrito.reduce((suma, item) => suma + item.price * item.cantidad, 0);
    // console.log(total);

    //mostrar número de productos comprados
    const numComprados = lineasCarrito.reduce((suma, item) => suma + item.cantidad, 0);

    if(numComprados === 0){
        document.getElementById("contador").style.display = "none";
        document.getElementById("comprar").style.display = "none";
    }else{
        document.getElementById("contador").textContent = numComprados;
        document.getElementById("contador").style.display = "block";
        document.getElementById("comprar").style.display = "block";
    }
    
}

function actualizarCantidad(indice, cantidad){
    //si cantidad es menor que 1 borro la línea
    if(cantidad < 1){
        removeFromCart(indice);
    }else{
        //actualizo
        lineasCarrito[indice].cantidad = cantidad;
        actualizarCarrito();
        guardarEnLocalStorage();
    }

}

function removeFromCart(indice){
    //eliminar del array lineasCarrito el elemento con el indice indicado
    lineasCarrito.splice(indice, 1);
    actualizarCarrito();
    guardarEnLocalStorage();
}

//mostrar ocultar carrito
document.getElementById("toggle-cart").addEventListener("click", () => {
    //mostrar/ocultar el carrito
    document.getElementById("cart").classList.toggle("open");
})

//boton comprar
document.getElementById("comprar").addEventListener("click", () => {
    totalCompra = lineasCarrito.reduce((suma, item) => suma + item.price * item.cantidad, 0);
    alert(`Compra realizada por: ${totalCompra.toFixed(2)} €`)
})

function guardarEnLocalStorage(){
    localStorage.setItem("carritoGuardado", JSON.stringify(lineasCarrito));
}

function leerDelLocalStorage(){
    // comprobar si hay un carrito guardado en el navegador en el localStorage
    // leer el carrito del localStorage y mostrarlo en pantalla
    if(localStorage.getItem("carritoGuardado") !== null){
        let datos =  localStorage.getItem("carritoGuardado");
        lineasCarrito = JSON.parse(datos);
        actualizarCarrito();
    }
}



leerDelLocalStorage();
displayProducts();

const productos = [
    {id: 1, nombre: "gominola"},
    {id: 2, nombre: "helado"},
    {id: 3, nombre: "chocolate"},
    {id: 4, nombre: "palmeritas"}
]

console.log(productos);
localStorage.setItem("productos", productos);
const productosJson = JSON.stringify(productos)
console.log(productosJson);

const productosFinal = JSON.parse(productosJson);
console.log(productosFinal);
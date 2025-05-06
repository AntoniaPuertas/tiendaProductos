const frutas = ["pera", "manzana", "melocoton", "sandía"];
console.log(frutas);
//.map 
/*
 .map()
 Crea un nuevo array con el resultado de llamar una función por cada elemento del array
*/
let frutas2 = frutas.map(fruta => 
    `<p>${fruta.toUpperCase}</p>`
)
console.log(frutas2);

const precios = [2, 4, 6, 7];

let precios2 = precios.map(precio => {
    return precio * 2;
})

/*
* .map se utiliza para crear un array a partir de otro cuando queremos modificar todos los elementos del original
*/

/*
* .join combinar todos los elementos de un array 
*/
console.log(frutas.join(' '));

//queremos calcular la suma de los elementos de un array
const numeros = [2, 4, 6, 7];

let suma = 0;
for(let i = 0 ; i < numeros.length ; i++){
    suma = suma + numeros[i];
}

//.reduce(funcion, 0)
//por cada elemento del array numeros guarda en la variable suma la suma del elemento
//va guardando la suma de todos los elementos
//el segundo parámetro 0 es el valor inicial de suma
let total = numeros.reduce((suma, item) => suma + item, 0)
let totalMultiplicacion = numeros.reduce((multiplicacion, item) => multiplicacion * item, 1);

//.findIndex
//busca en el array un elemento que cumpla con las condiciones especificadas en la función
//devuelve la posición en el array del primer elemento que cumpla con dichas condiciones
//si no encuentra ninguno que cumpla con las condiciones devuelve -1

const frutas3 = ["pera", "manzana", "melocoton", "sandía"];
const frutaBuscada = "manzana";

const indice = frutas3.findIndex(item => item === frutaBuscada);

let indice2 = -1;
for(let i = 0 ; i < frutas3.length ; i++){
    if(frutas3[i] === frutaBuscada){
        indice2 = i;
        return;
    }
}
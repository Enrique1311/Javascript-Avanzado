// Hoisting ****************************************************************
// El motor de Javascript coloca las funciones arriba: podemos llamar una función desde cualquier lugar del archivo, incluso antes de declararla

saludar();

function saludar() {
	let nombre = "Enrique";
	console.log(nombre);
}

// Scope ****************************************************************

let nombre2 = "Enrique"; //Scope global: se puede acceder a la variable desde cualquier lugar del archivo

function saludar2() {
	let apellido2 = "Spinelli"; //Scope local: de la función. No se pueede acceder a la variable desde afuera de la función
	console.log(nombre2);
	console.log(apellido2);
}
saludar2();

// Scope léxico o herencia
const funcion1 = () => {
	let saludo = "Saludon desde función 1";

	const funcion2 = () => {
		console.log(saludo);
	};
	return funcion2();
};
funcion1();

// Cohersión ************************************************

const d = document;
const $data1 = d.querySelector(".data1"),
	$data2 = d.querySelector(".data2"),
	$btn = d.querySelector(".btn");

$btn.addEventListener("click", () => {
	let dato1 = $data1.value, // Son datos de tipo string
		dato2 = $data2.value;

	let res = dato1 + dato2; // Al ser de tipo string, el + concatena los datos

	console.log(typeof dato1, typeof dato2);
	console.log(typeof res, res);

	dato1 = Number(dato1); // transforma el string a number
	console.log(dato1, typeof dato1);
});

// Clousure ************************************************
// Encapsular una de variables

function crearUsuario(n) {
	let nombre = n;

	return {
		setNombre: function (n) {
			nombre = n;
		},
		getNombre: function () {
			console.log(nombre);
		},
	};
}

let usuario1 = crearUsuario("Enrique");

console.log(usuario1);
usuario1.getNombre();
usuario1.setNombre("Javier");
usuario1.getNombre();

// This **********************************************

// Contexto global
console.log(this); // window

// Contexto de una función
function mostrarThis() {
	console.log(this); // window
}
mostrarThis();

// This en modo estricto
// No podemos acceder a this en modo estricto
function mostrarThisStrictMode() {
	"use strict";
	console.log(`This en modo estricto: ${this}`);
}
mostrarThisStrictMode();

// This en objetos
const persona = {
	nombre: "Enrique",
	saludar: () => {
		console.log(this.nombre); // No accede a nombre porque no está en el contexto de la función
	},
};
persona.saludar();

// This con clases
function Persona(n) {
	this.nombre = n;
}
Persona.prototype.saludar = function () {
	console.log(`Hola ${this.nombre}`); // This hace referencia a la instancia que se ha referenciado
};

const enrique = new Persona("Enrique");
enrique.saludar();

// Como funciona el Even Loop ****************************************************************

const datos = [
	{
		id: "1",
		nombre: "Santiago",
	},
	{
		id: "2",
		nombre: "Martina",
	},
	{
		id: "3",
		nombre: "Carolina",
	},
];

// Retorna los datos
// const getDatos = () => {
// 	return datos;
// };
// console.log(getDatos());

// Retorna undefined porque cuando se ejecuta el setTimeout, la funcion ya se cerró
// const getDatos2 = () => {
// 	setTimeout(() => {
// 		return datos;
// 	}, 2000);
// };
// console.log(getDatos2());

// Para ejecutar un setTimeout para mostrar los datos externos de sí mismo
// const getDatos3 = () => {
// 	return new Promise((resolve, reject) => {
// 		if (datos.length === 0) {
// 			reject(new Error("No hay datos..."));
// 		} else {
// 			setTimeout(() => {
// 				resolve(datos);
// 			}, 2000);
// 		}
// 	});
// };

// console.log(
// 	getDatos3()
// 		.then((res) => console.log(res))
// 		.catch((err) => console.log(err))
// );

// Con async/await: Cómo ejecutar la función
const getData3 = async () => {
	try {
		const data = await getDatos3();
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
getData3();

// Getters y setters ****************************************************************

// Antes de Ecmascript6
const persona2 = {
	nombre: "",
	edad: "",
	getNombre2: () => this.nombre,
	setNombre2: (nomb) => (this.nombre = nomb),
};
const santiago = persona2;
santiago.nombre = "Santiago";
santiago.edad = "7";
console.log(santiago.nombre);
santiago.setNombre2("Ivan");
console.log(santiago.getNombre2());

// Con Ecmascript6
const persona3 = {
	nombre: "",
	edad: "",
	get nombre() {
		return this.nombre_value.toUpperCase();
	},
	set nombre(nomb) {
		this.nombre_value = nomb;
	},
};
const martina = persona3;
martina.nombre = "Sofía";
console.log(martina.nombre);

// Generadores: tenemos el control de como se ejecuta el bucle
const $mostrar = d.querySelector(".mostrar"),
	$generar = d.querySelector(".generar");

function* generador() {
	for (let i = 0; i < 5; i++) {
		yield ($mostrar.innerHTML = i);
	}
}

const g = generador();

$generar.addEventListener("click", () => {
	g.next();
});

// Manejo de arrays (trucos) ****************************************************************

// Generar un array con el mismo caracter en cada elemento
const arrayDeCeros = new Array(10).fill(0);
console.log(arrayDeCeros);

// Aplanar un array al nivel deseado
const array = [
	"Martina",
	"Santiago",
	["Carolina", "Enrique", ["Caro", "Javier"]],
	"Sofía",
	["Iván", "Martu"],
];
const array2 = array.flat(2); // Aplana al nivel 2
console.log(array2);

const array3 = array.flat(Infinity); // Aplana totalmente el array
console.log(array3);

// Compara los elementos de un array con un elemento dado
const nombres = [
	"Martina",
	"Santiago",
	"Carolina",
	"Enrique",
	"Sofía",
	"Javier",
];
const nombres2Length = nombres.every((name) => name.length > 2); // Devuelve un boolean
console.log(nombres2Length);

const nombres3Length = nombres.some((name) => name.length > 3); // Devuelve un boolean
console.log(nombres3Length);

// Genera un nuevo array con el contenido de otros dos array
const names2 = [...nombres, ...nombres]; //
console.log(names2);

// Genera un nuevo array con el contenido de otro, y que uno de sus elementos sea otro array

// Genera un nuevo array con el abecedario
const alfabeto = Array.from({ length: 26 }, (val, i) =>
	String.fromCharCode(65 + i)
);
console.log(alfabeto);

// Genera una copia de un array con un elemento agregado
const newArray = [...alfabeto, 8];
console.log(newArray);

// Comparar dos arrays
const array9 = [1, 2, 3, 4, 5, 6, "Enrique"];
const array10 = [1, 2, 3, 4, 5, 6, "Enrique"];

const arr9 = JSON.stringify(array9); // Transformar los array a string
const arr10 = JSON.stringify(array10);

if (arr9 === arr10) {
	console.log("Son iguales");
} else {
	console.log("No son iguales");
}

// Agrupa un array por un elemento dado
const paises = [
	{ pais: "Argentina", idioma: "Español", habitantes: 45000000 },
	{ pais: "USA", idioma: "Inglés", habitantes: 330000000 },
	{ pais: "España", idioma: "Español", habitantes: 48000000 },
	{ pais: "Brasil", idioma: "Portugués", habitantes: 220000000 },
	{ pais: "Portugal", idioma: "Portugués", habitantes: 10000000 },
	{ pais: "Irlanda", idioma: "Inglés", habitantes: 5000000 },
];
const agruparPorIdioma = Object.groupBy(paises, (el) => el.idioma);
console.log(agruparPorIdioma);

// Agrupar por cantidad de habitantes (genera arrays por separado)
const agruparPorHabitantes = Object.groupBy(paises, (el) =>
	el.habitantes >= 100000000 ? "masDe10Millones" : "menosDe10Millones"
);
console.log(agruparPorHabitantes);

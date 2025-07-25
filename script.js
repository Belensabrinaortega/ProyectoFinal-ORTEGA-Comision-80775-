// Variables
let nombre
let peso
let altura
let resultado
let clasificacion
let otroUsuario = 1;
let arrayCalificaciones = [];

// Funciones
const mensajeBienvenida = () => {
    return "Bienvenido a la calculadora de IMC (Índice de Masa Corporal). " + "Esta herramienta te ayudará a determinar tu estado de salud basado en tu peso y altura. "
}
const recopilarDatosUsuario = () => {
    nombre = prompt("Introduce tu nombre:");
    peso = parseFloat(prompt("Introduce tu peso en kg (ejemplo: 70)"));
    while (isNaN(peso) || peso <= 0 || peso === null || peso === "" || peso === undefined) {
        alert("Por favor, introduce un peso válido mayor que 0.");
        peso = parseFloat(prompt("Introduce tu peso en kg (ejemplo: 70)"));
    }
    altura = parseFloat(prompt("Introduce tu altura en metros (ejemplo: 1.75)"));
    while (isNaN(altura) || altura <= 0 || altura === null || altura === "" || altura === undefined) {
        alert("Por favor, introduce una altura válida mayor que 0.");
    }
    return { nombre, peso, altura };
}
const calcularIMC = () => {
    resultado = peso / (altura * altura);
    if (resultado < 18.5) {
        clasificacion = "Bajo peso";
    }else if (resultado < 25) {
        clasificacion = "Peso normal";
    }else if (resultado < 30) {
        clasificacion = "Sobrepeso";
    }else if (resultado < 35) {
        clasificacion = "Obesidad grado I";
    }
    else if (resultado < 40) {
        clasificacion = "Obesidad grado II";
    }
    else {
        clasificacion = "Obesidad grado III";
    }

    return alert(`${nombre} tu IMC es ${resultado} y tu clasificación es: ${clasificacion}`);
}
const añadirOtroUsuario = () => {
    otroUsuario = parseInt(prompt("¿Deseas calcular el IMC de otro usuario? (1: Sí, 0: No)"));
    do {
        alert("Por favor, introduce 1 para Sí o 0 para No.");
        otroUsuario = parseInt(prompt("¿Deseas calcular el IMC de otro usuario? (1: Sí, 0: No)"));
    }
    while (otroUsuario !== 1 && otroUsuario !== 0);
}
const despedida = () => {
    return alert("Gracias por usar la calculadora de IMC. ¡Hasta luego!");
}

// Ejecución del programa

alert(mensajeBienvenida());
while (otroUsuario === 1) {
    recopilarDatosUsuario();
    calcularIMC();
    arrayCalificaciones.push(clasificacion);
    añadirOtroUsuario();
}
alert("Clasificaciones de IMC de todos los usuarios: " + arrayCalificaciones);
despedida();
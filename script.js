let nombreUsuario;
let peso;
let altura;
let usuario;

//Funcion para calcular el IMC
const calcularIMC = (peso, altura) => {
  if (peso && altura) {
    const imc = peso / (altura * altura);
    return parseFloat(imc.toFixed(2)); // Redondear a dos decimales
  }
};

//Array con usuarios
let usuarios = [];

const borrarDatos = () => {
  borrarDelLocalStorage();
  limpiarContenedorUsuarios();
};

const validarBorrado = async () => {
  const result = await Swal.fire({
    title: "¿Está seguro que desea borrar todos los datos?",
    text: "Esta acción no se puede deshacer.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar todo.",
    cancelButtonText: "No, cancelar.",
  });
  return result.isConfirmed;
};

const btnBorrarDatos = document.getElementById("BtnBorrarDatos");
btnBorrarDatos.onclick = async function () {
  const confirmado = await validarBorrado();
  if (confirmado) {
    borrarDatos();
  } else {
    await Swal.fire({
      title: "Acción cancelada.",
      text: "Los datos no fueron borrados.",
      icon: "info",
      confirmButtonText: "Continuar.",
    });
  }
};

//Guardar los datos en el local storage
const guardarEnLocalStorage = () => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

//Recuperar los datos del local storage
const recuperarDelLocalStorage = () => {
  const datos = localStorage.getItem("usuarios");
  if (datos) {
    alumnos = JSON.parse(datos);
  }
};
//borrar los datos del local storage
const borrarDelLocalStorage = () => {
  localStorage.removeItem("usuarios");
  usuarios = [];
  limpiarContenedorUsuarios();
};

//Recuperar los datos al cargar la pagina
window.onload = recuperarDelLocalStorage();

//Guardar los datos al cerrar la pagina
window.onbeforeunload = guardarEnLocalStorage();

// Funcion limpiar inputs
const limpiarInputs = () => {
  document.getElementById("nombreUsuario").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
};

// funcion auxiliar de validacion de datos
const esNombreValido = (nombre) => nombre.trim() !== "" && !/\d/.test(nombre);
const esPesoValido = (peso) => !isNaN(peso) && peso >= 0 && peso <= 600;
const esAlturaValida = (altura) => !isNaN(altura) && altura >= 0 && altura <= 8;

//validar los datos ingresados por el usuario
const validarDatos = () => {
  if (
    !esNombreValido(nombreUsuario) ||
    !esPesoValido(peso) ||
    !esAlturaValida(altura)
  ) {
    Swal.fire({
      title: "Los datos ingresados no son validos.",
      text: "Por favor, ingrese los datos correctamente.",
      icon: "error",
      confirmButtonText: "Continuar.",
    });
    return false;
  } else return true;
};

const recolectarDatos = () => {
  inputNombreUsuario = document.getElementById("nombreUsuario");
  inputPeso = document.getElementById("peso");
  inputAltura = document.getElementById("altura");
  nombreUsuario = inputNombreUsuario.value;
  peso = parseFloat(inputPeso.value);
  altura = parseFloat(inputAltura.value);
};

//Funcion para agregar un usuario al array

const agregarUsuario = () => {
  recolectarDatos();
  usuario = {
    id: usuarios.length + 1,
    nombre: nombreUsuario,
    peso: peso,
    altura: altura,
  };

  if (validarDatos()) {
    usuarios.push(usuario);
  }
  guardarEnLocalStorage();
  limpiarInputs();
  limpiarContenedorUsuarios();
};

btnAgregarUsuario = document.getElementById("BtnAgregarUsuario");
btnAgregarUsuario.onclick = () => {
  agregarUsuario();
};

//renderizar los usuarios en la pantalla

contenedorUsuarios = document.getElementById("usuariosContainer");

const limpiarContenedorUsuarios = () => {
  contenedorUsuarios.innerHTML = "";
};

const renderizarUsuarios = () => {
  usuarios.forEach((usuario) => {
    contenedorUsuarios.innerHTML += `
      <div class="usuario" id="usuario"${usuario.id}">
        <h3>Usuario: ${usuario.nombre}</h3> 
        <p> Peso: ${usuario.peso} </p> 
        <p> Altura: ${usuario.altura} </p>
        <p> IMC: ${calcularIMC(usuario.peso, usuario.altura)}</p>
        <p> Situación: ${
          calcularIMC(usuario.peso, usuario.altura) < 18.5
            ? "Bajo peso"
            : calcularIMC(usuario.peso, usuario.altura) < 25
            ? "Peso normal"
            : calcularIMC(usuario.peso, usuario.altura) < 30
            ? "Sobrepeso"
            : calcularIMC(usuario.peso, usuario.altura) < 35
            ? "Obesidad grado I"
            : calcularIMC(usuario.peso, usuario.altura) < 40
            ? "Obesidad grado II"
            : "Obesidad grado III"
        }</p>
      </div>`;
  });
};

const btnRenderizarUsuarios = document.getElementById("BtnRenderizarUsuarios");
btnRenderizarUsuarios.onclick = () => {
  if (usuarios.length === 0) {
    Swal.fire({
      title: "No hay usuarios para mostrar.",
      text: "Por favor, ingrese los datos de un usuario.",
      icon: "warning",
      confirmButtonText: "Continuar.",
    });
    return;
  }
  renderizarUsuarios();
};

// Contenedor para usuarios que usaron la app en otros momentos
const contenedorUsuariosOtro = document.getElementById("usuariosContainerOtro");

let usuariosOtro = [];

// fetch para traer alumnos de otros profesores
const GetUsuariosOtro = async () => {
  const response = await fetch("./usuarios.JSON");
  const res = await response.json();
  usuariosOtro = res;
};

GetUsuariosOtro();

// renderizar alumnos de otros profesores

const renderizarUsuariosOtro = () => {
  usuariosOtro.forEach((usuarios) => {
    contenedorUsuariosOtro.innerHTML += `
      <div class="usuario">
        <h3>Usuario: ${usuarios.nombre}</h3> 
        <p> Peso: ${usuarios.peso} </p> 
        <p> Altura: ${usuarios.altura} </p>
        <p> IMC: ${calcularIMC(usuarios.peso, usuarios.altura)}</p>
        <p> Situación: ${
          calcularIMC(usuarios.peso, usuarios.altura) < 18.5
            ? "Bajo peso"
            : calcularIMC(usuarios.peso, usuarios.altura) < 25
            ? "Peso normal"
            : calcularIMC(usuarios.peso, usuarios.altura) < 30
            ? "Sobrepeso"
            : calcularIMC(usuarios.peso, usuarios.altura) < 35
            ? "Obesidad grado I"
            : calcularIMC(usuarios.peso, usuarios.altura) < 40
            ? "Obesidad grado II"
            : "Obesidad grado III"
        }</p>
      </div>`;
  });
};

addEventListener("DOMContentLoaded", async () => {
  await GetUsuariosOtro();
  renderizarUsuariosOtro();
});

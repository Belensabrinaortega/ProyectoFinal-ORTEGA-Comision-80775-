let nombreUsuario;
let apellidoUsuario;
let peso;
let altura;
let usuario;

//Funcion para promediar dos notas
const calcularIMC = (peso, altura) => {
  if (peso && altura) {
    const imc = peso / (altura * altura);
    return parseFloat(imc.toFixed(2)); // Redondear a dos decimales
  }
};

//Array con alumnos
let usuarios = [];

const borrarDatos = () => {
  borrarDelLocalStorage();
  limpiarContenedorUsuarios();
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

//validar los datos ingresados por el usuario
const validarDatos = () => {
  if (
    nombreUsuario.trim() === "" ||
    isNaN(peso) ||
    isNaN(altura) ||
    peso < 0 ||
    peso > 600 ||
    altura < 0 ||
    altura > 8
  ) {
    alert("Por favor, complete todos los campos correctamente.");
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

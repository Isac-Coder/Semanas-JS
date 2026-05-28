// Elementos del DOM
const nombre = document.getElementById("nombre");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");
const form = document.querySelector("form");

// Valida los campos para evitar datos vacíos o inválidos
function validarCampos() {
    if (nombre.value.trim() === "" || producto.value.trim() === "" || precio.value.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }
    if (isNaN(Number(precio.value)) || Number(precio.value) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return false;
    }
    return true;
}

// Carga los datos desde localStorage (simplificado y robusto)
let datos = [];
try {
    const raw = localStorage.getItem("Datos");
    datos = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(datos)) datos = [];
} catch (e) {
    console.warn('localStorage["Datos"] inválido, reiniciando a array vacío', e);
    datos = [];
    localStorage.removeItem("Datos");
}

// Renderiza la lista completa desde el array `datos`
function renderizarNotas() {
    lista.innerHTML = "";
    datos.forEach((infoProducto, index) => {
        const nuevoProducto = document.createElement("li");
        nuevoProducto.classList.add("nota");
        nuevoProducto.innerHTML = `
            Nombre: ${infoProducto.nombre} <br><br>
            Producto: ${infoProducto.producto} <br><br>
            Precio: $${infoProducto.precio}
        `;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.addEventListener("click", () => {
            datos.splice(index, 1); // eliminar del array
            localStorage.setItem("Datos", JSON.stringify(datos));
            renderizarNotas();
        });

        nuevoProducto.appendChild(botonEliminar);
        lista.appendChild(nuevoProducto);
    });
}

// Agrega un nuevo producto
function agregarProducto(event) {
    event.preventDefault();
    if (!validarCampos()) return;

    const infoProducto = {
        nombre: nombre.value.trim(),
        producto: producto.value.trim(),
        precio: Number(precio.value)
    };

    datos.push(infoProducto);
    localStorage.setItem("Datos", JSON.stringify(datos));
    form.reset();
    renderizarNotas();
}

// Eventos
form.addEventListener("submit", agregarProducto);
document.addEventListener("DOMContentLoaded", renderizarNotas);
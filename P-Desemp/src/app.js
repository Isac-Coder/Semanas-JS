// nombre del producto, precio, o descripción
let nombre = document.getElementById("nombre")
let producto = document.getElementById("producto")
let precio = document.getElementById("precio")
let descripcion = document.getElementById("descripcion")
let lista = document.getElementById("lista")
let form = document.querySelector("form")

// Valida los campos para evitar datos vacíos o inválidos
function validarCampos() {
    if (nombre.value.trim() === "" || producto.value.trim() === "" || precio.value.trim() === "" || descripcion.value.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return false;
    }
    if (isNaN(precio.value) || Number(precio.value) <= 0) {
        alert("Por favor, ingresa un precio válido.");
        return false;
    }
    return true;
}

// Agrega un nuevo producto a la lista
function agregarProducto(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    if (!validarCampos()) {
        return; // Si la validación falla, no se agrega el producto
    }

    const nuevoProducto = document.createElement("li");
    nuevoProducto.textContent = `Nombre: ${nombre.value}, Producto: ${producto.value}, Precio: $${precio.value}, Descripción: ${descripcion.value}`;
    
    lista.appendChild(nuevoProducto);

    // Limpia los campos después de agregar el producto
    form.reset();
}

// Agrega un evento al formulario para manejar el envío
document.querySelector("form").addEventListener("submit", agregarProducto);
// nombre del producto, precio, o descripción
let nombre = document.getElementById("nombre")
let producto = document.getElementById("producto")
let precio = document.getElementById("precio")
let lista = document.getElementById("lista")
let form = document.querySelector("form")
let botonAPI = document.getElementById("boton-api")

// Valida los campos para evitar datos vacíos o inválidos
function validarCampos() {
    if (nombre.value.trim() === "" || producto.value.trim() === "" || precio.value.trim() === "") {
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

    // Crea un nuevo elemento de lista para el producto
    const nuevoProducto = document.createElement("li");
    nuevoProducto.innerHTML = `
        Nombre: ${nombre.value} <br><br>
        Producto: ${producto.value} <br><br>
        Precio: $${precio.value}
    `;
    
    lista.appendChild(nuevoProducto);

    // Limpia los campos después de agregar el producto
    form.reset();

    const BotonEliminar = document.createElement("button");
    BotonEliminar.textContent = "Eliminar";
    BotonEliminar.classList = "boton-eliminar";
    BotonEliminar.addEventListener("click", () => {
        lista.removeChild(nuevoProducto);
    });
    nuevoProducto.appendChild(BotonEliminar);
}

// Agrega un evento al formulario para manejar el envío
document.querySelector("form").addEventListener("submit", agregarProducto);
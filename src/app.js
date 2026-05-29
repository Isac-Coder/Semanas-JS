const API_URL = 'http://localhost:3000/productos';
const LS_KEY = 'Datos';

const nombre = document.getElementById("nombre");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");
const form = document.querySelector("form");
const botonApi = document.getElementById("boton-api");
const apiStatus = document.getElementById("api-status");

let datos = [];
let idProductoEnEdicion = null; 

// Valida los campos del formulario antes de enviar
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

// Guarda el array actual en localStorage
function guardarLocalStorage() {
    localStorage.setItem(LS_KEY, JSON.stringify(datos));
}

// Carga productos desde localStorage si existen
function cargarLocalStorage() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        localStorage.removeItem(LS_KEY);
        return [];
    }
}

// Crea los elementos HTML para cada producto y agrega botones de acción
function renderizarNotas() {
    lista.innerHTML = "";
    datos.forEach((item) => {
        const li = document.createElement("li");
        li.className = "nota";
        li.innerHTML = `
            Nombre: ${item.nombre} <br><br>
            Producto: ${item.producto} <br><br>
            Precio: $${item.precio}
        `;

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "boton-editar";
        botonEditar.type = "button"; 

        botonEditar.addEventListener("click", (event) => {
            event.preventDefault();
            
            nombre.value = item.nombre;
            producto.value = item.producto;
            precio.value = item.precio;
            
            idProductoEnEdicion = item.id !== undefined ? item.id : item.localId;
            
            const botonSubmit = form.querySelector("button[type='submit']");
            if (botonSubmit) botonSubmit.textContent = "Actualizar Producto";
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.type = "button"; 
        botonEliminar.addEventListener("click", (event) => {
            event.preventDefault();
            eliminarProducto(item);
        });

        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

// Carga productos locales y sincroniza con la API si está disponible
async function cargarProductos() {
    datos = cargarLocalStorage();
    renderizarNotas();

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error();

        const apiDatos = await response.json();
        const pendientes = datos.filter((item) => item.id == null);

        // Envía al servidor los productos que solo existen en localStorage
        const sincronizados = await Promise.all(pendientes.map(async (item) => {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            });
            return res.ok ? res.json() : null;
        }));

        datos = apiDatos.concat(sincronizados.filter(Boolean));
        guardarLocalStorage();
        renderizarNotas();
        mostrarEstadoApi(`Conectado a la API. ${datos.length} productos cargados.`, true);
    } catch (error) {
        console.error(error);
        mostrarEstadoApi('No se pudo conectar con json-server.', false);
        if (datos.length === 0) {
            lista.innerHTML = '<li>No se pudo cargar los productos. Asegúrate de que json-server esté en ejecución.</li>';
        }
    }
}

// Muestra en el DOM el estado de la conexión con la API
function mostrarEstadoApi(mensaje, exito = true) {
    if (!apiStatus) return;
    apiStatus.textContent = mensaje;
    apiStatus.style.color = exito ? 'green' : 'red';
}

// Botón para probar si json-server está disponible
async function probarApi() {
    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) throw new Error();
        const productos = await response.json();
        mostrarEstadoApi(`API conectada. ${productos.length} productos en db.json.`, true);
    } catch (error) {
        console.error(error);
        mostrarEstadoApi('No se pudo conectar con json-server.', false);
    }
}

// Elimina un producto de la API y del localStorage
async function eliminarProducto(item) {
    if (item.id != null) {
        try {
            const response = await fetch(`${API_URL}/${item.id}`, {method: 'DELETE'});
            if (!response.ok) throw new Error();
        } catch (error) {
            console.error(error);
            alert('No se pudo eliminar el producto en la API.');
            return;
        }
    }

    datos = datos.filter((p) => p !== item);
    guardarLocalStorage();
    renderizarNotas();
}

// Actualiza un producto existente localmente y en la API si es posible
async function editarProducto(id, datosActualizados) {
    const index = datos.findIndex(p => p.id === id || p.localId === id);
    if (index === -1) return;

    const esIdApi = datos[index].id != null;

    if (esIdApi) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id, ...datosActualizados })
            });
            if (!response.ok) throw new Error();
            
            const editadoApi = await response.json();
            datos[index] = editadoApi;
        } catch (error) {
            console.error(error);
            datos[index] = { ...datos[index], ...datosActualizados };
            alert('API no disponible. Cambios guardados localmente.');
        }
    } else {
        datos[index] = { ...datos[index], ...datosActualizados };
    }

    idProductoEnEdicion = null; 
}

// Maneja el envío del formulario para crear o actualizar un producto
async function agregarProducto(event) {
    event.preventDefault(); 
    
    if (!validarCampos()) return;

    const camposClave = {
        nombre: nombre.value.trim(),
        producto: producto.value.trim(),
        precio: Number(precio.value)
    };

    if (idProductoEnEdicion !== null) {
        await editarProducto(idProductoEnEdicion, camposClave);
        const botonSubmit = form.querySelector("button[type='submit']");
        if (botonSubmit) botonSubmit.textContent = "Agregar Producto";
    } else {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(camposClave)
            });
            if (!response.ok) throw new Error();
            const creado = await response.json();
            datos.push(creado);
        } catch (error) {
            console.error(error);
            datos.push({...camposClave, localId: Date.now()});
            alert('API no disponible. Guardado localmente.');
        }
    }

    guardarLocalStorage();
    form.reset();
    renderizarNotas();
}

form.addEventListener("submit", agregarProducto);
botonApi.addEventListener("click", probarApi);
document.addEventListener("DOMContentLoaded", cargarProductos);
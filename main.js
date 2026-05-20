const texto = document.getElementById("nombre");
const formulario = document.getElementById("BotonAgregar");
const listaNotas = document.getElementById("listaNotas");

console.log(document.getElementById('nombre'));
console.log(document.getElementById('BotonAgregar'));
console.log(document.getElementById('listaNotas'));

if (texto == null) {
    console.error("No se encontró el elemento con id 'nombre'");
} else {
    formulario.addEventListener("click", function(event) {
        event.preventDefault();
        const nota = document.createElement("li");
        nota.textContent = texto.value;
        listaNotas.appendChild(nota);
        texto.value = "";
        console.log("Nota agregada: " + nota.textContent);
    
    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.addEventListener("click", function() {
        listaNotas.removeChild(nota);
    console.log("Se elimino la nota");});
    nota.appendChild(eliminar);});
    
};


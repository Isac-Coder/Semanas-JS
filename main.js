const texto = document.getElementById("Notas");
const formulario = document.getElementById("BotonAgregar");
const listaNotas = document.getElementById("listaNotas");

console.log(document.getElementById('Notas'));
console.log(document.getElementById('BotonAgregar'));
console.log(document.getElementById('listaNotas'));

const notas = JSON.parse(localStorage.getItem("Notas")) || [];

listaNotas.classList.add("listaNotas");
if (texto == null) {
    console.error("No se encontró el elemento con id 'Notas'");
} else {
    formulario.addEventListener("click", function(event) {
        event.preventDefault();
        if (texto.value.trim() === "") {
        console.error("El campo de nombre está vacío");
        return;
        }
        const nota = document.createElement("li");
        nota.classList.add("nota");
        nota.textContent = texto.value;
        listaNotas.appendChild(nota);
        texto.value = "";
        notas.push(nota.textContent);
        localStorage.setItem("Notas", JSON.stringify(notas));
        console.log("Nota agregada: " + nota.textContent);
    
        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
            eliminar.addEventListener("click", function() {
                listaNotas.removeChild(nota);
                eliminar.classList.add("eliminar");
                notas.splice(notas.indexOf(nota.textContent), 1);
                localStorage.setItem("Notas", JSON.stringify(notas));
                console.log("Se elimino la nota: " + nota.textContent);
        });
        nota.appendChild(eliminar);
    });
};


function renderizarNotas() {
    listaNotas.innerHTML = "";

    notas.forEach((nota) => {
        const li = document.createElement("li");
        
        li.textContent = nota;
        li.classList.add("nota");
        listaNotas.appendChild(li);

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.addEventListener("click", function() {
            listaNotas.removeChild(li);
            eliminar.classList.add("eliminar");
            notas.splice(notas.indexOf(nota), 1);
            localStorage.setItem("Notas", JSON.stringify(notas));
            console.log("Se elimino la nota: " + nota);
        });
        li.appendChild(eliminar);
    });
}

renderizarNotas();

console.log("Notas cargadas: " + notas.length);
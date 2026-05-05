const name = prompt("¿Cuál es tu nombre?");
const age1 = prompt("¿Cuál es tu edad?");
const age = parseInt(age1);

if (isNaN(age)) {
    console.error("Error: Por favor, ingresa una edad válida en números.")
};

if (age<18){
    alert("Hola "+name+", eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!")
};

if (age>=18){
    alert("Hola "+name+", eres mayor de edad. Prepárate para grandes oportunidades en el mundo de la programación!");
};


// otra forma de hacerlo

const name = prompt("¿Cuál es tu nombre?");
const age = parseInt(prompt("¿Cuál es tu edad?"));

// 1. Manejo del error (se mantiene el IF por ser una validación solitaria)
if (isNaN(age)) {
    console.error("Error: Por favor, ingresa una edad válida en números.");
} else {
    // 2. Operador ternario para decidir el mensaje
    const mensaje = age < 18 
        ? `Hola ${name}, eres menor de edad. ¡Sigue aprendiendo!` 
        : `Hola ${name}, eres mayor de edad. ¡Prepárate para grandes oportunidades!`;

    alert(mensaje);
}

const personaje = {
    ID: "N001",
    Nombre: "Zapato",
    Precio: "2000"
};


const lista = new Set([1,1,2,2,3,3,4,5]);

console.log(lista);

lista.add(6)
console.log(lista);

lista.has(6)
console.log(lista);

lista.delete(5)
console.log(lista);

for(const L of lista) {
    console.log(L);
};

const resultado = [...lista].map(n => n * 1)

console.log(resultado);
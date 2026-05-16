const personaje = {
    ID: "N001",
    Nombre: "Zapato",
    Precio: "2000"
};


const lista = new Set([1,1,2,2,3,3,4,5]);

console.log(lista);

lista.add(6)
console.log(lista);

console.log(lista.has(6));

lista.delete(5)
console.log(lista);

for(const L of lista) {
    console.log(L);
};

const mapa = new Map();
mapa.set("ID", "N001");
mapa.set("Nombre", "Zapato");
mapa.set("Precio", "2000");

console.log(mapa);

console.log(mapa.get("Nombre"));


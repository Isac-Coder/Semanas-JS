const personaje = {
    producto1: {
        ID: "N001",
        Nombre: "Camisa",
        Precio: "2000"
    },

    producto2: {
        ID: "N002",
        Nombre: "Zapato",
        Precio: "2000"
    },
    
    producto3: {
        ID: "N003",
        Nombre: "Gorra",
        Precio: "2000"
    }
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
mapa.set('producto1','Nombre')
mapa.set('producto2','Nombre')
mapa.set('producto3','Nombre')
console.log(mapa);

for (const propiedad in personaje) {
  console.log(`${propiedad}: ${personaje[propiedad]g}`);
}
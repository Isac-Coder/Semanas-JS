
const producto = {
    producto1 : {
        ID: "N001",
        Nombre: "Zapato",
        Precio: "2000"
    },
    
    producto2 : {
        ID: "N002",
        Nombre: "Camisa",
        Precio: "1500"
    },

    producto3 : {
        ID: "N003",
        Nombre: "Pantalón",
        Precio: "2500"
    }
};


const lista = new Set([1,1,2,2,3,3,4,5]);

console.log(lista);

console.log('------------------------------------------------------------------------------------');

lista.add(6)
console.log(lista);

console.log('------------------------------------------------------------------------------------');

console.log(lista.has(6));

console.log('------------------------------------------------------------------------------------');

lista.delete(5)
console.log(lista);

console.log('------------------------------------------------------------------------------------');

for(const L of lista) {
    console.log(L);
};

console.log('------------------------------------------------------------------------------------');

const mapa = new Map();
mapa.set("ID", "N001");
mapa.set("Nombre", "Zapato");
mapa.set("Precio", "2000");

console.log(mapa);

console.log('------------------------------------------------------------------------------------');

for(const e in producto) {
    console.log(e, producto[e]);
}

console.log('------------------------------------------------------------------------------------');

for (const e of lista) {
    console.log(e);
}

console.log('------------------------------------------------------------------------------------');

mapa.forEach(element => {
    console.log(element)
});

console.log('------------------------------------------------------------------------------------');

if (producto.producto1.Precio == "" || producto.producto1.Nombre == "" || producto.producto1.ID == "") {
    console.log("Faltan datos del producto");
} else {
    console.log(`Datos del ${producto.producto1.Nombre} completos`);
    console.log(producto.producto1);
}

console.log('------------------------------------------------------------------------------------');

if (producto.producto2.Precio == "" || producto.producto2.Nombre == "" || producto.producto2.ID == "") {
    console.log("Faltan datos del producto");
} else {
    console.log(`Datos del ${producto.producto2.Nombre} completos`);
    console.log(producto.producto2);
}

console.log('------------------------------------------------------------------------------------');

if (producto.producto3.Precio == "" || producto.producto3.Nombre == "" || producto.producto3.ID == "") {
    console.log("Faltan datos del producto");
} else {
    console.log(`Datos del ${producto.producto3.Nombre} completos`);
    console.log(producto.producto3);
}

console.log('------------------------------------------------------------------------------------');

if (lista.size == 0) {
    console.log("La lista está vacía");
} else {
    console.log("La lista tiene elementos");
    console.log(lista);
}

console.log('------------------------------------------------------------------------------------');

if (mapa.size == 0) {
    console.log("El mapa está vacío");
} else {
    console.log("El mapa tiene elementos");
    console.log(mapa);
}
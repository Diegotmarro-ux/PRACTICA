const filas = 15;
const columnas = 10;

const contenedor = document.getElementById("cuadricula");

const tabla = document.createElement("table");
tabla.border = "1";

const filaEncabezado = document.createElement("tr");

const esquina = document.createElement("th");
filaEncabezado.appendChild(esquina);

for (let columna = 1; columna <= columnas; columna++) {
    const encabezado = document.createElement("th");
    const letra = String.fromCharCode(64 + columna);

    encabezado.textContent = letra;
    filaEncabezado.appendChild(encabezado);
}

tabla.appendChild(filaEncabezado);

for (let fila = 1; fila <= filas; fila++) {
    const filaTabla = document.createElement("tr");

    const encabezadoFila = document.createElement("th");
    encabezadoFila.textContent = fila;

    filaTabla.appendChild(encabezadoFila);

    for (let columna = 1; columna <= columnas; columna++) {
        const celda = document.createElement("td");

        celda.textContent = " ";
        filaTabla.appendChild(celda);
    }

    tabla.appendChild(filaTabla);
}

contenedor.appendChild(tabla);
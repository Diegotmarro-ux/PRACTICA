const filas = 15;
const columnas = 10;

const celdas = {};

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

        const letra = String.fromCharCode(64+ columna)
        const nombreCelda = letra + fila; 
         
        celdas[nombreCelda]= "";

        celda.addEventListener ("dblclick", function () {
             const input = document.createElement("input");

             input.value = celdas [nombreCelda]; 
             celda.textContent= "";

             celda.appendChild(input)

             input.focus (); 

             input.addEventListener("keydown", function (evento) {

                 if (evento.key === "Enter") {


                    let valor = input.value;

                    if (valor !== "" && !isNaN(valor)) {
                             celdas[nombreCelda] = Number(valor);
                                               } else {
                                 celdas[nombreCelda] = valor;
                                     }

                    celda.textContent = celdas[nombreCelda];
               

                 }
             });
        }); 

        filaTabla.appendChild(celda);
    }

    tabla.appendChild(filaTabla); 
}

contenedor.appendChild(tabla);

 console.log(celdas) ;   
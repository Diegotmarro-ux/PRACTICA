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

for (let fila = 1; fila <= filas; fila++)
    
    {
    const filaTabla = document.createElement("tr");

    const encabezadoFila = document.createElement("th");

    encabezadoFila.textContent = fila;

    filaTabla.appendChild(encabezadoFila);

    for (let columna = 1; columna <= columnas; columna++) {

        const celda = document.createElement("td");

        const letra = String.fromCharCode(64+ columna)

        const nombreCelda = letra + fila; 
         celda.id= nombreCelda;
           
          celdas[nombreCelda]= {
                     contenido: "",
                                 valor: "",
                                     dependencias: [],
                                        dependientes: []
};

        celda.addEventListener ("dblclick", function () {

             const input = document.createElement("input");

             input.value = celdas [nombreCelda].contenido;
             celda.textContent= "";

             celda.appendChild(input)

             input.focus (); 

             input.addEventListener("keydown", function (evento) {

                 if (evento.key === "Enter") {


                    let valor = input.value.trim();

                    celdas[nombreCelda].contenido = valor;

if (valor[0] == "=") {

    let referencias = obtenerReferenciasFormula(valor);
       
    if (tieneCircular(nombreCelda, referencias)) {

    buscarDependencias(nombreCelda, []);
        celdas[nombreCelda].valor = "#CIRCULAR!";

      } else {

        buscarDependencias(nombreCelda, referencias);

    celdas[nombreCelda].valor =
        calcularFormula(valor);

         }

} else if (valor != "" && !isNaN(valor)) {
       
     buscarDependencias(nombreCelda, []);

    celdas[nombreCelda].valor = Number(valor);

 } else {

        buscarDependencias(nombreCelda, []);

         celdas[nombreCelda].valor = valor;
}

                    celda.textContent = celdas[nombreCelda].valor;

                    recalcularDependientes(nombreCelda);
               

                 }
             });
        }); 

        filaTabla.appendChild(celda);
    }

    tabla.appendChild(filaTabla); 
}

contenedor.appendChild(tabla);

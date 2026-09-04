const filas = 15;
const columnas = 10;
let inputActivo = null;
let celdaEditando = "";

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
         celdas[nombreCelda] = {
         contenido: "",
         valor: "",
         dependencias: [],
         dependientes: [],
        formato: "normal",
};


 // Permite seleccionar y movernos entre celdas
        celda.tabIndex = 0;   

 // Muestra la celda seleccionada
celda.addEventListener("focus", function () {
    celda.style.outline = "2px solid green";
    seleccionarCelda(nombreCelda);
});

celda.addEventListener("blur", function () {
    celda.style.outline = "";
});

// Agrega la referencia de la celda a la fórmula activa
celda.addEventListener("click", function () {

        if (inputActivo != null &&
        inputActivo.value[0] == "=" &&
        nombreCelda != celdaEditando) {

        inputActivo.value += nombreCelda;
        inputActivo.focus();
    }
});
    

celda.addEventListener("keydown", function(evento) {


    if (evento.target.tagName != "INPUT") {
        moverCelda(nombreCelda, evento);
    }
});

        celda.addEventListener ("dblclick", function () {

             const input = document.createElement("input");

             input.value = celdas [nombreCelda].contenido;
             celda.textContent= "";

             celda.appendChild(input)

             input.focus (); 
             inputActivo = input;
             celdaEditando = nombreCelda;

             input.addEventListener("keydown", function (evento) {

                 // Evita que la tecla llegue al evento de la celda
                 evento.stopPropagation();

                 if (evento.key === "Enter") {


                    let valor = input.value.trim();

                     // Evita que la tecla llegue al evento de la celda
                     evento.stopPropagation();

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
                   celda.textContent = formatearCelda(nombreCelda);

                    aplicarResaltado(nombreCelda);

                    recalcularDependientes(nombreCelda);

                    guardarHoja();
                    inputActivo = null;
                   celdaEditando = "";
                 }  
             });
        });  

        filaTabla.appendChild(celda);
    }

    tabla.appendChild(filaTabla); 
}

contenedor.appendChild(tabla);
cargarHoja();

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
         
        celdas[nombreCelda]= {
                     contenido: "",
                                 valor: ""
};

        celda.addEventListener ("dblclick", function () {
             const input = document.createElement("input");

             input.value = celdas [nombreCelda].contenido;
             celda.textContent= "";

             celda.appendChild(input)

             input.focus (); 

             input.addEventListener("keydown", function (evento) {

                 if (evento.key === "Enter") {


                    let valor = input.value;
                    celdas[nombreCelda].contenido = valor;

                    if (valor[0] == "=") {

                           
                     console.log("Formula detectada: " + valor);

                            let tokens = tokenizarFormula(valor);

                                       resolverParentesis(tokens);
                                       resolverMultiplicacionDivision(tokens);

                            let resultadoFinal = resolverSumaResta(tokens);

                                 console.log("Resultado: " + resultadoFinal);

                       celdas[nombreCelda].valor = resultadoFinal;
                           

                     } else if (valor != "" && !isNaN(valor)) {

                            celdas[nombreCelda].valor = Number(valor);

                                            } else {

                             celdas[nombreCelda].valor = valor;
}

                    celda.textContent = celdas[nombreCelda].valor;
               

                 }
             });
        }); 

        filaTabla.appendChild(celda);
    }

    tabla.appendChild(filaTabla); 
}

contenedor.appendChild(tabla);


 function tokenizarFormula(formula) {

    let tokens = [];

      let numero = "";

     for (let i = 1; i < formula.length; i++) {

        let caracter = formula[i];

        if (caracter == "+" || caracter == "-" ||
            caracter == "*" || caracter == "/" ||
            caracter == "(" || caracter == ")")  {

            if (numero != "") {

                tokens.push(numero);

                numero = "";
            }

            tokens.push(caracter);

        } else {
            numero = numero + caracter;
        }
    }

    if (numero != "") {
        tokens.push(numero);
    }

    return tokens;
}

function resolverMultiplicacionDivision(tokens) {

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] == "*" || tokens[i] == "/") {


            let numero1 = Number(tokens[i - 1]);

            let numero2 = Number(tokens[i + 1]);

                                   let resultado;

            if (tokens[i] == "*") {

                resultado = numero1 * numero2;

            } else {
                resultado = numero1 / numero2;
            }

            tokens.splice(i - 1, 3, resultado);

            i = i - 1;
        }
    }

    return tokens;
}

function resolverSumaResta(tokens) {

    while (tokens.length > 1) {

        let numero1 = Number(tokens[0]);
        let operador = tokens[1];
        let numero2 = Number(tokens[2]);
        let resultado;

        if (operador == "+") {
            resultado = numero1 + numero2;
        } else {
            resultado = numero1 - numero2;
        }

        tokens.splice(0, 3, resultado);
    }

    return tokens[0];
} 

function resolverParentesis(tokens) {

    while (tokens.includes(")")) {

        let cierre = tokens.indexOf(")");
        let apertura = cierre;

        while (tokens[apertura] != "(") {
            apertura--;
        }

        let dentro = tokens.slice(apertura + 1, cierre);

        resolverMultiplicacionDivision(dentro);

        let resultado = resolverSumaResta(dentro);

        tokens.splice(
            apertura,
            cierre - apertura + 1,
            resultado
        );
    }

    return tokens;
}


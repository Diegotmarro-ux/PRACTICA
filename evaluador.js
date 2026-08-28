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


            let numero1 = obtenerValor(tokens[i - 1]);

            let numero2 = obtenerValor(tokens[i + 1]);

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

        let numero1 = obtenerValor(tokens[0]);
        let operador = tokens[1];
        let numero2 = obtenerValor(tokens[2]);
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

function obtenerValor(token) {

    if (celdas[token] != undefined) {
        return Number(celdas[token].valor);
    } else {
        return Number(token);
    }

}



function obtenerCeldasRango(inicio, fin) {

    let columnaInicio = inicio.charCodeAt(0) - 64;

    let filaInicio = Number(inicio.substring(1));

    let columnaFin = fin.charCodeAt(0) - 64;
    let filaFin = Number(fin.substring(1));

    let rango = [];

    for (let fila = filaInicio; fila <= filaFin; fila++) {

        for (let columna = columnaInicio; columna <= columnaFin; columna++) {

            let letra = String.fromCharCode(64 + columna);

            rango.push(letra + fila);
        }
    }

    return rango;
}

function evaluarFuncionRango(formula, tipo) {

    let parentesis = formula.indexOf("(");

    let contenido = formula.substring(
        parentesis + 1,
        formula.length - 1
    );

    let partes = contenido.split(":");

    let rango = obtenerCeldasRango(
        partes[0],
        partes[1]
    );

    let suma = 0;
    let mayor = 0;
    let menor = 0;

    for (let i = 0; i < rango.length; i++) {

        let valorCelda = Number(celdas[rango[i]].valor);

        suma = suma + valorCelda;

        if (i == 0) {
            mayor = valorCelda;
            menor = valorCelda;
        }

        if (valorCelda > mayor) {
            mayor = valorCelda;
        }

        if (valorCelda < menor) {
            menor = valorCelda;
        }
    }

    if (tipo == "SUMA") {
        return suma;

    } else if (tipo == "PROMEDIO") {
        return suma / rango.length;

    } else if (tipo == "MAX") {
        return mayor;

    } else if (tipo == "MIN") {
        return menor;
    }
}



function obtenerTipoFuncion(formula) {

    if (formula.substring(0, 6) == "=SUMA(") {
        return "SUMA";

    } else if (formula.substring(0, 10) == "=PROMEDIO(") {
        return "PROMEDIO";

    } else if (formula.substring(0, 5) == "=MAX(") {
        return "MAX";

    } else if (formula.substring(0, 5) == "=MIN(") {
        return "MIN";
    }

    return "";
}

function calcularFormula(formula) {

    let tipoFuncion = obtenerTipoFuncion(formula);

    if (tipoFuncion != "") {

        return evaluarFuncionRango(formula, tipoFuncion);

    } else {

        let tokens = tokenizarFormula(formula);

        resolverParentesis(tokens);
        resolverMultiplicacionDivision(tokens);

        return resolverSumaResta(tokens);
    }
}
function obtenerReferenciasFormula(formula) {

    let tipoFuncion = obtenerTipoFuncion(formula);

    if (tipoFuncion != "") {

        let parentesis = formula.indexOf("(");

        let contenido = formula.substring(
            parentesis + 1,
            formula.length - 1
        );

        let partes = contenido.split(":");

        return obtenerCeldasRango(
            partes[0],
            partes[1]
        );

    } else {

        let tokens = tokenizarFormula(formula);

        let referencias = [];

        for (let i = 0; i < tokens.length; i++) {

            if (celdas[tokens[i]] != undefined) {

                referencias.push(tokens[i]);
            }
        }

        return referencias;
    }
}
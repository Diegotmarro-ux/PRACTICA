const celdas = {};

 function buscarDependencias(nombreCelda, tokens) {

    for (let i = 0; i < celdas[nombreCelda].dependencias.length; i++) {

        let anterior = celdas[nombreCelda].dependencias[i];

        let posicion = celdas[anterior].dependientes.indexOf(nombreCelda);

        if (posicion != -1) {
            celdas[anterior].dependientes.splice(posicion, 1);
        }
    }

    celdas[nombreCelda].dependencias = [];

    for (let i = 0; i < tokens.length; i++) {

        if (celdas[tokens[i]] != undefined) {

            celdas[nombreCelda].dependencias.push(tokens[i]);

            if (!celdas[tokens[i]].dependientes.includes(nombreCelda)) {
                celdas[tokens[i]].dependientes.push(nombreCelda);
            }
        }
    }
}
          
function recalcularDependientes(nombreCelda) {

    for (let i = 0; i < celdas[nombreCelda].dependientes.length; i++) {

        let nombreDependiente = celdas[nombreCelda].dependientes[i];

        let formula = celdas[nombreDependiente].contenido;

        let resultado = calcularFormula(formula);

        celdas[nombreDependiente].valor = resultado;

        document.getElementById(nombreDependiente).textContent = resultado;

        recalcularDependientes(nombreDependiente);
    }
}

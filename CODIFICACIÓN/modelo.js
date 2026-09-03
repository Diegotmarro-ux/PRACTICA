const celdas = {};
function guardarHoja() {

    localStorage.setItem(
        "hojaClara",
        JSON.stringify(celdas)
    );
}
    function cargarHoja() {

    let datos = localStorage.getItem("hojaClara");

    if (datos != null) {

        Object.assign(celdas, JSON.parse(datos));

        for (let nombreCelda in celdas) {

            document.getElementById(nombreCelda).textContent =
                celdas[nombreCelda].valor;
        }
    }
}
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
        
              if (!celdas[nombreCelda].dependencias.includes(tokens[i])) {

             celdas[nombreCelda].dependencias.push(tokens[i]);
    }


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

function tieneCircular(nombreCelda, referencias, revisadas) {

    if (revisadas == undefined) {
        revisadas = [];
    }

    for (let i = 0; i < referencias.length; i++) {

        let referencia = referencias[i];
        if (celdas[referencia] == undefined) {
         continue;
        }

        if (referencia == nombreCelda) {
            return true;
        }

        if (!revisadas.includes(referencia)) {

            revisadas.push(referencia);

            if (tieneCircular(
                nombreCelda,
                celdas[referencia].dependencias,
                revisadas
            )) {
                return true;
            }
        }
    }

    return false;
}

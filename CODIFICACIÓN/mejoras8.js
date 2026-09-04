// Resalta los valores negativos
function aplicarResaltado(nombreCelda) {

    let celda = document.getElementById(nombreCelda);
    let valor = Number(celdas[nombreCelda].valor);

    if (valor < 0) {
        celda.style.color = "red";
    } else {
        celda.style.color = "black";
    }
} 

// Mueve el cursor entre las celdas
function moverCelda(nombre, evento) {

    let columna = nombre.charCodeAt(0);
    let fila = Number(nombre.substring(1));

    if (evento.key == "ArrowRight") {
        columna++;
    } else if (evento.key == "ArrowLeft") {
        columna--;
    } else if (evento.key == "ArrowDown" || evento.key == "Enter") {
        fila++;
    } else if (evento.key == "ArrowUp") {
        fila--;
    } else {
        return;
    }

    let destino = String.fromCharCode(columna) + fila;

    if (celdas[destino] != undefined) {
        evento.preventDefault();
        document.getElementById(destino).focus();
    }
}

// Aplica el formato numérico
function formatearCelda(nombreCelda) {

let valor = celdas[nombreCelda].valor;
    let formato = celdas[nombreCelda].formato;

    if (valor == "" || isNaN(valor)) {
        return valor;
    }

    if (formato == "moneda") {
        return "Q " + Number(valor).toFixed(2);
    }

    if (formato == "porcentaje") {
        return Number(valor).toFixed(2) + "%";
    }

    if (formato == "decimal") {
        return Number(valor).toFixed(2);
    }

    return valor;
}

let celdaSeleccionada = "";

// Guarda la celda seleccionada
function seleccionarCelda(nombreCelda) {
    celdaSeleccionada = nombreCelda;
}

// Cambia el formato
function cambiarFormato() {

    if (celdaSeleccionada == "") {
        return;
    }

    let formato = document.getElementById("formato").value;
    guardarEstado();
    celdas[celdaSeleccionada].formato = formato;

    document.getElementById(celdaSeleccionada).textContent =
        formatearCelda(celdaSeleccionada);

    guardarHoja();
}
       let historial = [];
       let rehacerHistorial = [];
       
// Guarda un estado solo si es diferente
function guardarEstado() {

    let estado = JSON.stringify(celdas);

    if (historial[historial.length - 1] != estado) {
        historial.push(estado);
    }

    rehacerHistorial = [];
}

function restaurarEstado(datos) {

    Object.keys(celdas).forEach(function(nombre) {
        delete celdas[nombre];
    });

    Object.assign(celdas, JSON.parse(datos));

    for (let nombre in celdas) {
        document.getElementById(nombre).textContent =
            formatearCelda(nombre);

        aplicarResaltado(nombre);
    }

    guardarHoja();
}

function deshacer() {

    if (historial.length == 0) {
        return;
    }

    rehacerHistorial.push(JSON.stringify(celdas));

    restaurarEstado(historial.pop());
}

function rehacer() {

    if (rehacerHistorial.length == 0) {
        return;
    }

    historial.push(JSON.stringify(celdas));

    restaurarEstado(rehacerHistorial.pop());
}


// Ctrl+Z y Ctrl+Y
document.addEventListener("keydown", function(evento) {

    if (evento.target.tagName == "INPUT") {
        return;
    }

    if (evento.ctrlKey && evento.key.toLowerCase() == "z") {
        evento.preventDefault();
        deshacer();
    }

    if (evento.ctrlKey && evento.key.toLowerCase() == "y") {
        evento.preventDefault();
        rehacer();
    }
});
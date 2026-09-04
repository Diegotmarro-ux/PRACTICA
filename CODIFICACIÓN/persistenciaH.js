
//Guarda la Hoja
function guardarHoja() {
    localStorage.setItem("hojaClara", JSON.stringify(celdas));
}


function cargarHoja() {

    let datos = localStorage.getItem("hojaClara");

    if (datos != null) {

        Object.assign(celdas, JSON.parse(datos));

        for (let nombre in celdas) {

            document.getElementById(nombre).textContent =
               formatearCelda(nombre);
                aplicarResaltado(nombre);
        }
    }
}

// Exporta la hoja a CSV
function exportarCSV() {

    let csv = "";

    for (let fila = 1; fila <= 15; fila++) {

        for (let columna = 1; columna <= 10; columna++) {

            let nombre = String.fromCharCode(64 + columna) + fila;

            csv += celdas[nombre].contenido +
               (columna < 10 ? ";" : "\n");
        }
    }

    let enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(
        new Blob([csv], { type: "text/csv" })
    );

    enlace.download = "HojaClara.csv";
    enlace.click(); 
}
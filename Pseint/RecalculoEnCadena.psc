SubProceso RecalcularCadena(celda, dependientes, cantidadDependientes)
	
    Definir i, celdaDependiente Como Entero
	
    Para i <- 1 Hasta cantidadDependientes[celda] Hacer
		
        celdaDependiente <- dependientes[celda, i]
		
        Escribir "Recalcular celda ", celdaDependiente
		
        RecalcularCadena(celdaDependiente, dependientes, cantidadDependientes)
		
    FinPara
	
FinSubProceso


Algoritmo RecalculoEnCadena
	
    Definir celdaCambiada Como Entero
	
    Dimension dependientes[10,10]
    Dimension cantidadDependientes[10]
	
	
    cantidadDependientes[1] <- 1
    dependientes[1,1] <- 2
	
    cantidadDependientes[2] <- 1
    dependientes[2,1] <- 3
	
    cantidadDependientes[3] <- 0
	
    celdaCambiada <- 1
	
    Escribir "Cambio la celda ", celdaCambiada
	
    RecalcularCadena(celdaCambiada, dependientes, cantidadDependientes)
	
FinAlgoritmo
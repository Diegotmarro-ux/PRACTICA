Funcion circular <- TieneCircular(celdaOriginal, celdaActual, dependencias, cantidadDependencias, revisadas)
	
    Definir i, siguiente Como Entero
	
    circular <- Falso
	
    // Si vuelve a la celda original, existe un ciclo
    Si celdaActual = celdaOriginal Entonces
		
        circular <- Verdadero
		
    Sino
		
        // Evita revisar varias veces la misma celda
        Si revisadas[celdaActual] = 0 Entonces
			
            revisadas[celdaActual] <- 1
			
            Si cantidadDependencias[celdaActual] > 0 Entonces
				
                Para i <- 1 Hasta cantidadDependencias[celdaActual] Hacer
					
                    siguiente <- dependencias[celdaActual, i]
					
                    Si circular = Falso Entonces
                        circular <- TieneCircular(celdaOriginal, siguiente, dependencias, cantidadDependencias, revisadas)
                    FinSi
					
                FinPara
				
            FinSi
			
        FinSi
		
    FinSi
	
FinFuncion


Algoritmo DetectarReferenciaCircular
	
    Definir resultado Como Logico
    Definir i Como Entero
	
    Dimension dependencias[10,10]
    Dimension cantidadDependencias[10]
    Dimension revisadas[10]
	
    // Inicializa los arreglos
    Para i <- 1 Hasta 10 Hacer
        cantidadDependencias[i] <- 0
        revisadas[i] <- 0
    FinPara
	
    // Ejemplo:
    // Celda 1 -> Celda 2
    // Celda 2 -> Celda 3
    // Celda 3 -> Celda 1
	
    cantidadDependencias[1] <- 1
    dependencias[1,1] <- 2
	
    cantidadDependencias[2] <- 1
    dependencias[2,1] <- 3
	
    cantidadDependencias[3] <- 1
    dependencias[3,1] <- 1
	
    // Se comienza revisando la primera dependencia de la celda 1
    resultado <- TieneCircular(1, 2, dependencias, cantidadDependencias, revisadas)
	
    Si resultado Entonces
        Escribir "#CIRCULAR!"
    Sino
        Escribir "No existe referencia circular"
    FinSi
	
FinAlgoritmo
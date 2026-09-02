Funcion circular <- TieneCircular(celda, dependencias, cantidadDependencias, enRuta)
	
    Definir i, siguiente Como Entero
	
    Si enRuta[celda] = 1 Entonces
		
        circular <- Verdadero
		
    Sino
		
        circular <- Falso
        enRuta[celda] <- 1
		
        Para i <- 1 Hasta cantidadDependencias[celda] Hacer
			
            siguiente <- dependencias[celda, i]
			
            Si TieneCircular(siguiente, dependencias, cantidadDependencias, enRuta) Entonces
                circular <- Verdadero
            FinSi
			
        FinPara
		
        enRuta[celda] <- 0
		
    FinSi
	
FinFuncion


Algoritmo DetectarReferenciaCircular
	
    Definir resultado Como Logico
	
    Dimension dependencias[10,10]
    Dimension cantidadDependencias[10]
    Dimension enRuta[10]
	
    // A1 = 1
    // B1 = 2
	
    cantidadDependencias[1] <- 1
    dependencias[1,1] <- 2
	
    cantidadDependencias[2] <- 1
    dependencias[2,1] <- 1
	
    resultado <- TieneCircular(1, dependencias, cantidadDependencias, enRuta)
	
    Si resultado Entonces
        Escribir "#CIRCULAR!"
    Sino
        Escribir "No existe referencia circular"
    FinSi
	
FinAlgoritmo
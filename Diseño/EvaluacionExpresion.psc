Funcion nuevaCantidad <- ResolverMultiplicacionDivision(tokens Por Referencia, cantidad)
	
    Definir i, j Como Entero
    Definir numero1, numero2, resultado Como Real
	
    i <- 1
	
    Mientras i <= cantidad Hacer
		
        Si tokens[i] = "*" O tokens[i] = "/" Entonces
			
            numero1 <- ConvertirANumero(tokens[i - 1])
            numero2 <- ConvertirANumero(tokens[i + 1])
			
            Si tokens[i] = "*" Entonces
                resultado <- numero1 * numero2
            SiNo
                resultado <- numero1 / numero2
            FinSi
			
            tokens[i - 1] <- ConvertirATexto(resultado)
			
            Para j <- i Hasta cantidad - 2 Hacer
                tokens[j] <- tokens[j + 2]
            FinPara
			
            cantidad <- cantidad - 2
            i <- i - 1
			
        SiNo
            i <- i + 1
        FinSi
		
    FinMientras
	
    nuevaCantidad <- cantidad
	
FinFuncion


Funcion resultado <- ResolverSumaResta(tokens Por Referencia, cantidad)
	
    Definir numero1, numero2 Como Real
    Definir operador Como Cadena
    Definir j Como Entero
	
    Mientras cantidad > 1 Hacer
		
        numero1 <- ConvertirANumero(tokens[1])
        operador <- tokens[2]
        numero2 <- ConvertirANumero(tokens[3])
		
        Si operador = "+" Entonces
            resultado <- numero1 + numero2
        SiNo
            resultado <- numero1 - numero2
        FinSi
		
        tokens[1] <- ConvertirATexto(resultado)
		
        Para j <- 2 Hasta cantidad - 2 Hacer
            tokens[j] <- tokens[j + 2]
        FinPara
		
        cantidad <- cantidad - 2
		
    FinMientras
	
    resultado <- ConvertirANumero(tokens[1])
	
FinFuncion


Funcion nuevaCantidad <- ResolverParentesis(tokens Por Referencia, cantidad)
	
    Definir i, j Como Entero
    Definir apertura, cierre Como Entero
    Definir cantidadDentro Como Entero
    Definir resultado Como Real
    Definir encontrado Como Logico
	
    Dimension dentro[100]
	
    encontrado <- Verdadero
	
    Mientras encontrado = Verdadero Hacer
		
        encontrado <- Falso
        cierre <- 0
		
        Para i <- 1 Hasta cantidad Hacer
			
            Si tokens[i] = ")" Y encontrado = Falso Entonces
                cierre <- i
                encontrado <- Verdadero
            FinSi
			
        FinPara
		
        Si encontrado = Verdadero Entonces
			
            apertura <- cierre - 1
			
            Mientras tokens[apertura] <> "(" Hacer
                apertura <- apertura - 1
            FinMientras
			
            cantidadDentro <- 0
			
            Para i <- apertura + 1 Hasta cierre - 1 Hacer
				
                cantidadDentro <- cantidadDentro + 1
                dentro[cantidadDentro] <- tokens[i]
				
            FinPara
			
            cantidadDentro <- ResolverMultiplicacionDivision(
			dentro,
			cantidadDentro
            )
			
            resultado <- ResolverSumaResta(
			dentro,
			cantidadDentro
            )
			
            tokens[apertura] <- ConvertirATexto(resultado)
			
            j <- apertura + 1
			
            Para i <- cierre + 1 Hasta cantidad Hacer
                tokens[j] <- tokens[i]
                j <- j + 1
            FinPara
			
            cantidad <- cantidad - (cierre - apertura)
			
        FinSi
		
    FinMientras
	
    nuevaCantidad <- cantidad
	
FinFuncion


Algoritmo EvaluacionExpresion
	
    Definir cantidad Como Entero
    Definir resultado Como Real
	
    Dimension tokens[100]
	
    cantidad <- 5
	
    tokens[1] <- "2"
    tokens[2] <- "+"
    tokens[3] <- "3"
    tokens[4] <- "*"
    tokens[5] <- "4"
	
    cantidad <- ResolverParentesis(tokens, cantidad)
	
    cantidad <- ResolverMultiplicacionDivision(
	tokens,
	cantidad
    )
	
    resultado <- ResolverSumaResta(
	tokens,
	cantidad
    )
	
    Escribir "Resultado: ", resultado
	
FinAlgoritmo
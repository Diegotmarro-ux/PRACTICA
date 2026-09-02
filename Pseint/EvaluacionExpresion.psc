Funcion resultado <- ResolverMultiplicacionDivision(numero1, operador, numero2)
	
    Si operador = "*" Entonces
        resultado <- numero1 * numero2
    SiNo
        resultado <- numero1 / numero2
    FinSi
	
FinFuncion


Funcion resultado <- ResolverSumaResta(numero1, operador, numero2)
	
    Si operador = "+" Entonces
        resultado <- numero1 + numero2
    SiNo
        resultado <- numero1 - numero2
    FinSi
	
FinFuncion


Funcion prioridad <- ObtenerPrioridad(operador)
	
    Si operador = "*" O operador = "/" Entonces
        prioridad <- 2
    SiNo
        prioridad <- 1
    FinSi
	
FinFuncion


Algoritmo EvaluacionExpresion
	
    Definir numero1, numero2, numero3 Como Real
    Definir parcial, resultado Como Real
    Definir operador1, operador2 Como Cadena
	
    Dimension tokens[5]
	
    // Expresión tokenizada: 2 + 3 * 4
    tokens[1] <- "2"
    tokens[2] <- "+"
    tokens[3] <- "3"
    tokens[4] <- "*"
    tokens[5] <- "4"
	
    numero1 <- ConvertirANumero(tokens[1])
    operador1 <- tokens[2]
	
    numero2 <- ConvertirANumero(tokens[3])
    operador2 <- tokens[4]
	
    numero3 <- ConvertirANumero(tokens[5])
	
    // Compara la prioridad de los operadores
    Si ObtenerPrioridad(operador1) >= ObtenerPrioridad(operador2) Entonces
		
        Si operador1 = "*" O operador1 = "/" Entonces
            parcial <- ResolverMultiplicacionDivision(numero1, operador1, numero2)
        SiNo
            parcial <- ResolverSumaResta(numero1, operador1, numero2)
        FinSi
		
        Si operador2 = "*" O operador2 = "/" Entonces
            resultado <- ResolverMultiplicacionDivision(parcial, operador2, numero3)
        SiNo
            resultado <- ResolverSumaResta(parcial, operador2, numero3)
        FinSi
		
    SiNo
		
        parcial <- ResolverMultiplicacionDivision(numero2, operador2, numero3)
		
        Si operador1 = "*" O operador1 = "/" Entonces
            resultado <- ResolverMultiplicacionDivision(numero1, operador1, parcial)
        SiNo
            resultado <- ResolverSumaResta(numero1, operador1, parcial)
        FinSi
		
    FinSi
	
    Escribir "Resultado: ", resultado
	
FinAlgoritmo
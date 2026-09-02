Algoritmo TokenizarFormula
	
    Definir formula, caracter, tokenActual Como Cadena
    Definir i, cantidadTokens Como Entero
	
    Dimensionar tokens(100)
	
    formula <- "=A1+B2*3"
    tokenActual <- ""
    cantidadTokens <- 0
	
    Para i <- 1 Hasta Longitud(formula) - 1 Hacer
		
        caracter <- Subcadena(formula, i, i)
		
        Si caracter = "+" O caracter = "-" O caracter = "*" O caracter = "/" O caracter = "(" O caracter = ")" Entonces
			
            Si tokenActual <> "" Entonces
				
                cantidadTokens <- cantidadTokens + 1
                tokens[cantidadTokens] <- tokenActual
                tokenActual <- ""
				
            FinSi
			
            cantidadTokens <- cantidadTokens + 1
            tokens[cantidadTokens] <- caracter
			
        SiNo
			
            Si caracter <> " " Entonces
                tokenActual <- tokenActual + caracter
            FinSi
			
        FinSi
		
    FinPara
	
    Si tokenActual <> "" Entonces
		
        cantidadTokens <- cantidadTokens + 1
        tokens[cantidadTokens] <- tokenActual
		
    FinSi
	
    Para i <- 1 Hasta cantidadTokens Hacer
        Escribir tokens[i]
    FinPara
	
FinAlgoritmo
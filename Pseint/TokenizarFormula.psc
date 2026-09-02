Funcion cantidadTokens <- TokenizarFormula(formula, tokens Por Referencia)
	
    Definir caracter, tokenActual Como Cadena
    Definir i Como Entero
	
    tokenActual <- ""
    cantidadTokens <- 0
	
    // Recorre la fórmula después del signo =
    Para i <- 2 Hasta Longitud(formula) Hacer
		
        caracter <- Subcadena(formula, i, i)
		
        // Comprueba si es operador o paréntesis
        Si caracter = "+" O caracter = "-" O caracter = "*" O caracter = "/" O caracter = "(" O caracter = ")" Entonces
			
            Si tokenActual <> "" Entonces
				
                cantidadTokens <- cantidadTokens + 1
                tokens[cantidadTokens] <- tokenActual
                tokenActual <- ""
				
            FinSi
			
            cantidadTokens <- cantidadTokens + 1
            tokens[cantidadTokens] <- caracter
			
        SiNo
			
            tokenActual <- tokenActual + caracter
			
        FinSi
		
    FinPara
	
    // Guarda el último token
    Si tokenActual <> "" Entonces
		
        cantidadTokens <- cantidadTokens + 1
        tokens[cantidadTokens] <- tokenActual
		
    FinSi
	
FinFuncion


Algoritmo TokenizarFormulaPrincipal
	
    Definir formula Como Cadena
    Definir cantidadTokens, i Como Entero
	
    Dimension tokens[100]
	
    formula <- "=A1+B2*3"
	
    cantidadTokens <- TokenizarFormula(formula, tokens)
	
    Para i <- 1 Hasta cantidadTokens Hacer
        Escribir tokens[i]
    FinPara
	
FinAlgoritmo
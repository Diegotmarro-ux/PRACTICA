Función nuevoValor <- CalcularCelda(celda,valores)
	// 1 = A1
	// 2 = B1
	// 3 = B2
	Si celda=2 Entonces
		// B1 = A1 + 2
		nuevoValor <- valores[1]+2
	SiNo
		// B2 = B1 + 3
		nuevoValor <- valores[2]+3
	FinSi
FinFunción

Función total <- RecalcularCadena(celda,dependientes,cantidadDependientes,valores Por Referencia)
	Definir i, celdaDependiente Como Entero
	total <- 0
	Si cantidadDependientes[celda]>0 Entonces
		Para i<-1 Hasta cantidadDependientes[celda] Hacer
			celdaDependiente <- dependientes[celda,i]
			// Recalcula el valor de la celda dependiente
			valores[celdaDependiente] <- CalcularCelda(celdaDependiente,valores)
			Escribir 'Recalcular celda ', celdaDependiente
			Escribir 'Nuevo valor: ', valores[celdaDependiente]
			total <- total+1
			// Continúa con sus dependientes
			total <- total+RecalcularCadena(celdaDependiente,dependientes,cantidadDependientes,valores)
		FinPara
	FinSi
FinFunción

Algoritmo RecalculoEnCadena
	Definir celdaCambiada, totalRecalculadas Como Entero
	Dimensionar dependientes(10,10)
	Dimensionar cantidadDependientes(10)
	Dimensionar valores(10)
	// 1 = A1
	// 2 = B1
	// 3 = B2
	// B1 depende de A1
	cantidadDependientes[1] <- 1
	dependientes[1,1]<-2
	// B2 depende de B1
	cantidadDependientes[2] <- 1
	dependientes[2,1]<-3
	cantidadDependientes[3] <- 0
	// A1 cambia a 10
	valores[1] <- 10
	celdaCambiada <- 1
	totalRecalculadas <- RecalcularCadena(celdaCambiada,dependientes,cantidadDependientes,valores)
	Escribir 'A1 = ', valores[1]
	Escribir 'B1 = ', valores[2]
	Escribir 'B2 = ', valores[3]
FinAlgoritmo

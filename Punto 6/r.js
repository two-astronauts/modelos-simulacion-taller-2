// Datos proporcionados
const values = [
    0.8797, 0.3884, 0.6289, 0.8750, 0.5999, 0.8589, 0.9996, 0.2415, 0.3808, 0.9606,
    0.9848, 0.3469, 0.7977, 0.5844, 0.8147, 0.6431, 0.7387, 0.5613, 0.0318, 0.7401,
    0.4557, 0.1592, 0.8536, 0.8846, 0.3410, 0.1492, 0.8681, 0.5291, 0.3188, 0.5992,
    0.9170, 0.2204, 0.5991, 0.5461, 0.5739, 0.3254, 0.0856, 0.2258, 0.4603, 0.5027,
    0.8376, 0.6235, 0.3681, 0.2088, 0.1525, 0.2006, 0.4720, 0.4272, 0.6360, 0.0954
];

// Calculo de la media
const suma = values.reduce((acc, val) => acc + val, 0)
const mediaMuestral = suma / values.length

// Prueba de la media para la serie generada
// Verificar si la media observada de los números está cerca de la media teórica para una distribución uniforme entre 0 y 1, que es 0.5
function pruebaMedia(serie) {
    const n = serie.length
    const mediaEsperada = 0.5 // Valor esperado en [0,1]
    const varianza = 1 / 12 // Varianza teórica en [0,1]
    const desviacion = Math.sqrt(varianza)

    // Intervalo de confianza al 95%
    const z = 1.96 // Valor z para el intervalo al 95%
    const limiteInferior = mediaEsperada - z * (desviacion / Math.sqrt(n))
    const limiteSuperior = mediaEsperada + z * (desviacion / Math.sqrt(n))

    const resultado = {
        mediaMuestral: mediaMuestral,
        mediaEsperada: mediaEsperada,
        limiteInferior: limiteInferior,
        limiteSuperior: limiteSuperior,
        enIntervalo: mediaMuestral >= limiteInferior && mediaMuestral <= limiteSuperior
    }

    return resultado
}

// Prueba de varianza para la serie generada
function pruebaVarianza(serie) {
    const n = serie.length
    const varianzaEsperada = 1 / 12 // Varianza teórica para r_i en [0,1]

    // Calcular la varianza muestral
    const varianzaMuestral = serie.reduce((acc, val) => acc + Math.pow(val - mediaMuestral, 2), 0) / n

    // Calcular los límites del intervalo de confianza al 95%
    const z = 1.96 // Valor Z para el intervalo de confianza al 95%
    const desviacionVarianza = Math.sqrt(2 * Math.pow(varianzaEsperada, 2) / (n - 1))
    const limiteInferior = varianzaEsperada - z * desviacionVarianza
    const limiteSuperior = varianzaEsperada + z * desviacionVarianza

    const resultado = {
        varianzaMuestral: varianzaMuestral,
        varianzaEsperada: varianzaEsperada,
        limiteInferior: limiteInferior,
        limiteSuperior: limiteSuperior,
        enIntervalo: varianzaMuestral >= limiteInferior && varianzaMuestral <= limiteSuperior
    }

    return resultado
}

// Prueba de uniformidad usando chi-cuadrado
// Dividir el rango en subintervalos y verificar si los números se distribuyen aproximadamente igual en ellos
function pruebaChiCuadrado(serie, k) {
    const n = serie.length
    const frecuenciaEsperada = n / k
    
    // Contar frecuencias observadas en cada intervalo
    let frecuenciasObservadas = Array(k).fill(0)
    for (let i = 0; i < n; i++) {
        const intervalo = Math.floor(serie[i] * k)
        frecuenciasObservadas[intervalo]++
    }

    // Calcular el valor de chi-cuadrado
    // Contamos cuántos números caen en cada intervalo y calculamos el estadístico 𝜒2
    let chiCuadrado = 0
    for (let i = 0; i < k; i++) {
        chiCuadrado += Math.pow(frecuenciasObservadas[i] - frecuenciaEsperada, 2) / frecuenciaEsperada
    }

    // Valor crítico de chi-cuadrado para 9 grados de libertad y 95% de confianza
    const valorCritico = 16.919

    // Comparación del valor calculado con el valor crítico
    const esUniforme = chiCuadrado < valorCritico

    // Resultados de la prueba
    return {
        chiCuadrado: chiCuadrado,
        valorCritico: valorCritico,
        esUniforme: esUniforme,
        frecuenciaEsperada: frecuenciaEsperada,
        frecuenciasObservadas: frecuenciasObservadas,
        gradosLibertad: k - 1
    }
}

// Prueba de uniformidad usando Kolmogorov-Smirnov
function pruebaKolmogorovSmirnov(serie) {
    const n = serie.length
    const serieOrdenada = [...serie].sort((a, b) => a - b) // Ordenar los valores en forma ascendente

    // Calcular D+ y D-
    let dMas = 0
    let dMenos = 0

    for (let i = 0; i < n; i++) {
        const ri = serieOrdenada[i]
        const iSobreN = (i + 1) / n
        dMas = Math.max(dMas, iSobreN - ri)
        dMenos = Math.max(dMenos, ri - i / n)
    }

    const d = Math.max(dMas, dMenos)

    // Valor crítico para un nivel de significancia de 0.05
    const valorCritico = 1.36 / Math.sqrt(n)

    // Comparación del valor calculado con el valor crítico
    const esUniforme = d < valorCritico

    // Resultados de la prueba
    return {
        d: d,
        valorCritico: valorCritico,
        esUniforme: esUniforme
    }
}

// Realizar la prueba de media
const resultadoPruebaMedia = pruebaMedia(values)

// Realizar la prueba de varianza
const resultadoPruebaVarianza = pruebaVarianza(values)

// Realizar la prueba de chi-cuadrado
const k = 10 // Número de intervalos
const resultadoChiCuadrado = pruebaChiCuadrado(values, k)

// Realizar la prueba de Kolmogorov-Smirnov
const resultadoKS = pruebaKolmogorovSmirnov(values);

// Mostrar resultados
console.log("Resultado de la prueba de media:", resultadoPruebaMedia)
console.log("Resultado de la prueba de varianza:", resultadoPruebaVarianza)
console.log("Resultado de la prueba de uniformidad chi-cuadrado:", resultadoChiCuadrado)
console.log("Resultado de la prueba de uniformidad Kolmogorov-Smirnov:", resultadoKS)

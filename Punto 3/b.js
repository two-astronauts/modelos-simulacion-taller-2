const m = 177
const a = 121
const c = 553

var x = 23
var end = false

var values = []

const validateEnd = (ri) => {
    return values.some((value) => value === ri)
}

while (!end) {
    const xi = ((a * x) + c) % m
    const ri = xi / (m - 1)
    x = xi
    end = validateEnd(ri)
    if (!end) {
        values.push(ri)
    }
}

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
    // Fórmula que se utiliza es una estimación para el error estándar de la varianza muestral cuando se está trabajando con una distribución uniforme en el intervalo [0, 1]
    const desviacionVarianza = Math.sqrt(2 * Math.pow(varianzaEsperada, 2) / (n - 1))
    const limiteInferior = varianzaEsperada - z * desviacionVarianza // intervalo de confianza para la varianza muestral
    const limiteSuperior = varianzaEsperada + z * desviacionVarianza // intervalo de confianza para la varianza muestral

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

    // Valor crítico de la tabla de chi-cuadrado para 9 grados de libertad y 95% de confianza
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
console.log("Periodo de la serie:", values.length)
console.log("Resultado de la prueba de media:", JSON.stringify(resultadoPruebaMedia, null, "\t"))
console.log("Resultado de la prueba de varianza:", JSON.stringify(resultadoPruebaVarianza, null, "\t"))
console.log("Resultado de la prueba de uniformidad chi-cuadrado:", JSON.stringify(resultadoChiCuadrado, null, "\t"))
console.log("Resultado de la prueba de uniformidad Kolmogorov-Smirnov:", JSON.stringify(resultadoKS, null, "\t"))

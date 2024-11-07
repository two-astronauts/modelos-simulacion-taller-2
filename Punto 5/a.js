const m = 1679567
const a = 1117
const c = 3057

var x = 1457
var end = false

var values = []

const validateEnd = (ri) => {
    return values.some((value) => value === ri)
}

while (!end && values.length !== 200) {
    const xi = ((a * x) + c) % m
    const ri = xi / (m - 1)
    x = xi
    end = validateEnd(ri)
    values.push(ri)
}

// Tomamos los valores del 101 al 200, el array inicia en 0 por eso el 100 en el slice
const subValues = [ ...values.slice(100, 200) ];

// Calculo de la media
const suma = subValues.reduce((acc, val) => acc + val, 0)
const mediaMuestral = suma / subValues.length

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

// Realizar la prueba de media
const resultadoPruebaMedia = pruebaMedia(subValues)

// Realizar la prueba de varianza
const resultadoPruebaVarianza = pruebaVarianza(subValues)

// Mostrar resultados
console.log("Periodo de la serie:", values.length)
console.log("Resultado de la prueba de media:", JSON.stringify(resultadoPruebaMedia, null, "\t"))
console.log("Resultado de la prueba de varianza:", JSON.stringify(resultadoPruebaVarianza, null, "\t"))

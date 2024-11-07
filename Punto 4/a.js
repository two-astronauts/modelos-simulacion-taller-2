const m = 1679567
const a = 1117
const c = 3057

var x = 1457
var end = false

var values = []

const validateEnd = (ri) => {
    return values.some((value) => value === ri)
}

while (!end && values.length !== 100) {
    const xi = ((a * x) + c) % m
    const ri = xi / (m - 1)
    x = xi
    end = validateEnd(ri)
    if (!end) {
        values.push(ri)
    }
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

// Prueba de Independencia (Corridas arriba y abajo de la media)
function pruebaIndependenciaCorridas(numeros) {
    const media = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;

    // Convertir a secuencia de arriba (1) y abajo (-1) en relación a la media
    const signos = numeros.map(num => (num > media ? 1 : -1));

    // Contar las corridas / rachas
    let corridas = 1;
    for (let i = 1; i < signos.length; i++) {
        // Se cuenta una nueva corrida cada vez que el signo cambia de un número al siguiente
        if (signos[i] !== signos[i - 1]) {
            corridas++;
        }
    }

    // Calcular n1 y n2 (números arriba y abajo de la media)
    const n1 = signos.filter(signo => signo === 1).length;
    const n2 = signos.filter(signo => signo === -1).length;
    const n = numeros.length;

    // Calcular el número esperado y la varianza de las corridas
    const E_R = (2 * n1 * n2) / n + 1;
    const Var_R = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (Math.pow(n, 2) * (n - 1));

    // Calcular el valor z
    const z = (corridas - E_R) / Math.sqrt(Var_R);

    // Valor crítico para nivel de significancia de 90% (α = 0.10) -> Z = ±1.645
    const valorCritico = 1.645;
    const aceptaIndependencia = Math.abs(z) < valorCritico;

    return {
        media: media,
        corridasObservadas: corridas,
        numeroEsperadoCorridas: E_R,
        varianzaCorridas: Var_R,
        zScore: z,
        aceptaIndependencia: aceptaIndependencia
    };
}

// Realizar la prueba de chi-cuadrado
const k = 10 // Número de intervalos
const resultadoChiCuadrado = pruebaChiCuadrado(values, k)

// Realizar la prueba de Kolmogorov-Smirnov
const resultadoKS = pruebaKolmogorovSmirnov(values);

// Ejecutar la prueba de independencia
const resultadoIndependencia = pruebaIndependenciaCorridas(values);

// Mostrar resultados
console.log("Periodo de la serie:", values.length)
console.log("Resultado de la prueba de uniformidad chi-cuadrado:", JSON.stringify(resultadoChiCuadrado, null, "\t"))
console.log("Resultado de la prueba de uniformidad Kolmogorov-Smirnov:", JSON.stringify(resultadoKS, null, "\t"))

console.log("\nPrueba de Independencia (Corridas Arriba y Abajo de la Media):");
console.log("Media de los datos:", resultadoIndependencia.media);
console.log("Corridas observadas:", resultadoIndependencia.corridasObservadas);
console.log("Número esperado de corridas (E(R)):", resultadoIndependencia.numeroEsperadoCorridas);
console.log("Varianza de las corridas (Var(R)):", resultadoIndependencia.varianzaCorridas);
console.log("Z-score:", resultadoIndependencia.zScore); // Si el valor absoluto de z es menor que el valor crítico 1.645, se acepta la hipótesis de independencia
console.log("¿Acepta H0? (Independencia):", resultadoIndependencia.aceptaIndependencia);

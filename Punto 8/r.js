// Datos
const numeros = [
    0.5858, 0.8863, 0.8378, 0.3203, 0.4115, 0.2710, 0.9238, 0.1959, 0.9268, 0.6702,
    0.6213, 0.4360, 0.6279, 0.8415, 0.5786, 0.0543, 0.3567, 0.1655, 0.3880, 0.8080,
    0.1931, 0.0843, 0.9152, 0.6093, 0.7587, 0.4515, 0.3203, 0.5139, 0.7070, 0.9123,
    0.1242, 0.8826, 0.9921, 0.8523, 0.6723, 0.8540, 0.4722, 0.4781, 0.2101, 0.1680,
    0.8658, 0.4028, 0.6136, 0.8720, 0.1126, 0.5857, 0.9172, 0.8943, 0.8095, 0.6408
];

// Cálculo de la media
const media = numeros.reduce((acc, num) => acc + num, 0) / numeros.length;

// Cálculo de la varianza
const varianza = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0) / numeros.length;

// Valores teóricos de una distribución uniforme entre 0 y 1
const mediaUniforme = 0.5;
const varianzaUniforme = 1 / 12; // 0.0833

console.log("Media calculada:", media);
console.log("Varianza calculada:", varianza);
console.log("Media esperada (Uniforme):", mediaUniforme);
console.log("Varianza esperada (Uniforme):", varianzaUniforme);

// Prueba de independencia (prueba de corridas)
function pruebaDeCorridas(numeros) {
    let mediaCorridas = 0, numCorridas = 1;
    let signo = numeros[0] > media;

    for (let i = 1; i < numeros.length; i++) {
        const nuevoSigno = numeros[i] > media;
        // Se cuenta una nueva corrida cada vez que el signo cambia de un número al siguiente
        if (nuevoSigno !== signo) {
            numCorridas++;
            signo = nuevoSigno;
        }
    }
    
    const n1 = numeros.filter(num => num > media).length;
    const n2 = numeros.length - n1;
    mediaCorridas = (2 * n1 * n2) / (n1 + n2) + 1;
    const varianzaCorridas = (2 * n1 * n2 * (2 * n1 * n2 - n1 - n2)) / (Math.pow(n1 + n2, 2) * (n1 + n2 - 1));
    const z = (numCorridas - mediaCorridas) / Math.sqrt(varianzaCorridas);

    return {
        numCorridas,
        mediaCorridas,
        varianzaCorridas,
        z,
        esIndependiente: Math.abs(z) < 1.645 // Nivel de significancia de 90%
    };
}

const resultadoIndependencia = pruebaDeCorridas(numeros);

console.log("Número de corridas:", resultadoIndependencia.numCorridas);
console.log("Media de corridas esperada:", resultadoIndependencia.mediaCorridas);
console.log("Varianza de corridas esperada:", resultadoIndependencia.varianzaCorridas);
console.log("Valor Z:", resultadoIndependencia.z); // Si el valor absoluto de z es menor que el valor crítico 1.645, se acepta la hipótesis de independencia
console.log("¿Son independientes?:", resultadoIndependencia.esIndependiente);

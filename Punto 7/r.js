// Datos proporcionados
const values = [
    0.6351, 0.0272, 0.0227, 0.3827, 0.0659, 0.3683, 0.2270, 0.7323, 0.4088, 0.2139,
    0.4271, 0.4855, 0.2028, 0.1618, 0.5336, 0.7378, 0.3670, 0.6637, 0.1864, 0.6734,
    0.9498, 0.9323, 0.0265, 0.4696, 0.7730, 0.9670, 0.7500, 0.5259, 0.5269, 0.5406,
    0.3641, 0.0356, 0.2181, 0.0866, 0.6085, 0.4468, 0.0539, 0.9311, 0.3128, 0.1562,
    0.8559, 0.7280, 0.7789, 0.1746, 0.6637, 0.0687, 0.5494, 0.1504, 0.8397, 0.2995
];

// Calcular la media de los datos
// La media de los datos se calcula sumando todos los valores y dividiéndolos entre el número total de datos
const media = values.reduce((acc, num) => acc + num, 0) / values.length;

// Determinar los signos de cada dato en relación a la media
// Convertimos cada número en un signo (+1 si está arriba de la media, -1 si está abajo)
const signos = values.map(num => (num > media ? 1 : -1));

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
const n = values.length;

// Calcular el valor esperado y la varianza de las corridas
const E_R = (2 * n1 * n2) / n + 1; // Es el número esperado de corridas 
const Var_R = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (Math.pow(n, 2) * (n - 1)); // Es la varianza de las corridas

// Calcular el valor z
const z = (corridas - E_R) / Math.sqrt(Var_R);

// Determinar si se acepta la independencia
const valorCritico = 1.645;  // Nivel de confianza del 90%
const aceptaIndependencia = Math.abs(z) < valorCritico;

// Imprimir resultados
console.log("Prueba de Independencia (Corridas Arriba y Abajo de la Media):");
console.log("Media de los datos:", media);
console.log("Corridas observadas:", corridas);
console.log("Número esperado de corridas (E(R)):", E_R);
console.log("Varianza de las corridas (Var(R)):", Var_R);
console.log("Z-score:", z); // Si el valor absoluto de z es menor que el valor crítico 1.645, se acepta la hipótesis de independencia
console.log("¿Acepta independencia? (Nivel de 90%):", aceptaIndependencia);

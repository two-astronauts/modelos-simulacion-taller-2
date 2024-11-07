const m = 37
const a = 237
const c = 71

var x = 16
var end = false

var values = []

// Si nos retorna un true finaliza y significa que se encontro un número aleatorio repetido
const validateEnd = (ri) => {
    return values.some((value) => value === ri) // Busca si por lo menos uno coincide con el numero a buscar
}

while (!end) {
    const xi = ((a * x) + c) % m
    const ri = xi / (m - 1)
    x = xi
    console.log(`x${values.length + 1}: ${xi}, r${values.length + 1}: ${ri}`)
    end = validateEnd(ri)
    if (!end) {
        values.push(ri)
    }
}

console.log("Ciclo de vida: ", values.length, "Números pseudo-aleatorios")

const m = 37
const a = 157
const c = 47

var x = 10
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
    values.push(ri)
    console.log(`x${values.length}: ${xi}, r${values.length}: ${ri}`)
}

console.log("Ciclo de vida: ", values.length - 1, "Números pseudo-aleatorios")

const m = 64
const a = 21
const b = 15

var x = 21
var xOld = 43
var end = false

var values = []

const validateEnd = (ri) => {
    return values.some((value) => value === ri)
}

while (!end) {
    const xi = ((a * x) + (b * xOld)) % m
    const ri = xi / (m - 1)
    xOld = x
    x = xi
    end = validateEnd(ri)
    values.push(ri)
    console.log(`x${values.length}: ${xi}, r${values.length}: ${ri}`)
}

console.log("Ciclo de vida: ", values.length - 1, "Números pseudo-aleatorios")

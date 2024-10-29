const m = 64
const a = 21
const b = 15

var x = 21
var xOld = 43
var end = false

var values = []

const validateEnd = (theX) => {
    return values.some((value) => value === theX)
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

const m = 128
const a = 13
const c = 9

var x = 7
var end = false

var values = []

const validateEnd = (theX) => {
    return values.some((value) => value === theX)
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

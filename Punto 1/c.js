const m = 31
const a = 17

var x = 23
var end = false

var values = []

const validateEnd = (theX) => {
    return values.some((value) => value === theX)
}

while (!end) {
    const xi = (a * x) % m
    const ri = xi / (m - 1)
    x = xi
    end = validateEnd(ri)
    values.push(ri)
    console.log(`x${values.length}: ${xi}, r${values.length}: ${ri}`)
}

console.log("Ciclo de vida: ", values.length - 1, "Números pseudo-aleatorios")

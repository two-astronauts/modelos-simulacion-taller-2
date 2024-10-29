const m = 256
const a = 121

var x = 17
var end = false

var values = []

const validateEnd = (theX) => {
    return values.some((value) => value === theX)
}

while (!end) {
    const xi = (a + x) % m
    const ri = xi / (m - 1)
    x = xi
    end = validateEnd(ri)
    values.push(ri)
    console.log(`x${values.length}: ${xi}, r${values.length}: ${ri}`)
}

console.log("Ciclo de vida: ", values.length - 1, "Números pseudo-aleatorios")

const m = 177
const a = 121
const c = 553

var x = 23
var end = false

var values = []

const validateEnd = (ri) => {
    return values.some((value) => value === ri)
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

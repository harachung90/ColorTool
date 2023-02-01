const hexInputEl = document.getElementById('hexInput')
const inputColorEl = document.getElementById('inputColor')

const isValidHex = (hex) => {
    if (!hex) return false;

    const strippedHex = hex.replace('#', '');

    return strippedHex.length === 3 || strippedHex.length === 6;
}

hexInputEl.addEventListener('keyup', (event) => {
    const hex = hexInputEl.value;
    if (!isValidHex(hex)) return false;

    const strippedHex = hex.replace('#', '')
    inputColorEl.style.backgroundColor = "#" + hex;
})

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

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return {r, g, b}
}

const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;

}
convertHexToRGB('333');
console.log(convertRGBToHex(0,10,255))
const hexInputEl = document.getElementById('hexInput')
const inputColorEl = document.getElementById('inputColor')
const slider = document.getElementById('slider')
const sliderText = document.getElementById('sliderText')
const alteredColorEl = document.getElementById('alteredColor')
const alteredColorText = document.getElementById('alteredColorText')
const lightenText = document.getElementById('lighten')
const darkenText = document.getElementById('darken')
const toggleBtn = document.getElementById('toggleBtn')

toggleBtn.addEventListener('click', ()=> {
    if (toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled')
        lightenText.classList.remove('unselected')
        darkenText.classList.add('unselected')
    } else {
        toggleBtn.classList.add('toggled')
        lightenText.classList.add('unselected')
        darkenText.classList.remove('unselected')
    }
    reset();
})
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
    reset();

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
// convertHexToRGB('333');
// console.log(convertRGBToHex(0,10,255))

slider.addEventListener('input', () => {

    sliderText.textContent = `${slider.value}%`;
    const hex = hexInputEl.value
    const percentage = slider.value

    if(!isValidHex(hex)) return;


    const valueAddition = toggleBtn.classList.contains('toggled') ?
        -slider.value : slider.value;


    const alteredInput = alterColor(hex, percentage)
    //console.log(alteredInput)
    alteredColorEl.style.backgroundColor = alteredInput
    alteredColorText.textContent = `Altered Color: ${alteredInput}`
})

const alterColor = (hex, percentage) => {

    const {r, g, b} = convertHexToRGB(hex)

    const amount = Math.floor((percentage/100) * 255)

    const newR = increaseWithinRange(r, amount)
    const newG = increaseWithinRange(g, amount)
    const newB = increaseWithinRange(b, amount)
    //console.log(newR, newG, newB)
    return convertRGBToHex(newR, newG, newB)
}

const increaseWithinRange = (hex, amount) => {
    const newHex = hex + amount
    if (newHex > 255) return 255
    if (newHex < 0) return 0
    return newHex
}

const reset = () => {
    slider.value = 0;
    sliderText.textContent = `0%`;
    alteredColorEl.style.backgroundColor = hexInputEl.value;
    alteredColorText.textContent = `Altered Color: ${hexInputEl.value}`
}
//console.log(alterColor('fff', 10))


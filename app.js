/**
 * app name genaret random color and copy 
 * ahtor:md rafikul islam
 * data.12-02-2024
 */

// Golbel 
let toastContainer = null;
const copySound = new Audio('./bip.wav')
let customsColor = new Array(2);

/**
 * @param {Array} object
 */
const defaultColors = [
    '#ffcdd2',
    '#f8bbd0',
    '#e1bee7',
    '#ff8a80',
    '#ff80ab',
    '#ea80fc',
    '#b39ddb',
    '#9fa8da',
    '#90caf9',
    '#b388ff',
    '#8c9eff',
    '#82b1ff',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#80d8ff',
    '#84ffff',
    '#a7ffeb',
    '#c8e6c9',
    '#dcedc8',
    '#f0f4c3',
    '#b9f6ca',
    '#ccff90',
    '#ffcc80'
]






/**
 * 
 * @param {Object} color
 
 */
const difaultColor = {
    red: 21,
    green: 222,
    blue: 28,
}

// onload handler 
window.onload = () => {
    main()
    updateColorCodeToDom(difaultColor)

    // display box
    displayColorBoxes(document.getElementById('preset-colors'), defaultColors)


    const customColorsString = localStorage.getItem("custom-colors");
    if (customColorsString) {
        customsColor = JSON.parse(customColorsString);
        displayColorBoxes(document.getElementById('costoms-colors'), customsColor)
    }
};



// main or boot function, this function will takecare of getting all the DOM references
function main() {
    // dom references
    const genareteRandomColorBtn = document.getElementById('generate-random-color');
    const colorSliderRed = document.getElementById('color-selider-red');
    const colorSliderGreen = document.getElementById('color-selider-green');
    const colorSliderBlue = document.getElementById('color-selider-blu');
    const copyToClipboardBtn = document.getElementById('copy-to-clipboard');
    const saveToCostomsColordBtn = document.getElementById('save-to-color');
    const chengeInputHexColor = document.getElementById('text-input-hex');
    const presetColorsBox = document.getElementById('preset-colors');
    const costomsColorsBox = document.getElementById('costoms-colors');
    const bgproviewImg = document.getElementById('bacground-proview');
    const bgFillInput = document.getElementById('bg-input-file');
    const bgPreferencUpdateBtn = document.getElementById('update-bg-btn');
    const bgContolors = document.getElementById('bg-controller');
    const bgRemovBtn = document.getElementById('remove-bg-btn');
    bgRemovBtn.style.display = ' none';






    // event Elememt 
    genareteRandomColorBtn.addEventListener('click', handleGenareteRandomColorBtn);
    chengeInputHexColor.addEventListener('keyup', chengeInputHexColorHendelar);
    colorSliderRed.addEventListener('change', colorSliderHandelar(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderGreen.addEventListener('change', colorSliderHandelar(colorSliderRed, colorSliderGreen, colorSliderBlue));
    colorSliderBlue.addEventListener('change', colorSliderHandelar(colorSliderRed, colorSliderGreen, colorSliderBlue));
    copyToClipboardBtn.addEventListener('click', handleCopyToClipboard);
    presetColorsBox.addEventListener('click', presetColorcontainarHandelar);
    saveToCostomsColordBtn.addEventListener('click', saveTocostomBtn(costomsColorsBox, chengeInputHexColor));
    costomsColorsBox.addEventListener('click', costomsColorprantHandelar);
    bgPreferencUpdateBtn.addEventListener('click', function () {
        bgFillInput.click()
    });
    document.getElementById('bg-size').addEventListener('change',chengeBackgroundPreferenc)
    document.getElementById('bg-repeat').addEventListener('change',chengeBackgroundPreferenc)
    document.getElementById('bg-position').addEventListener('change',chengeBackgroundPreferenc)
    document.getElementById('bg-attachment').addEventListener('change',chengeBackgroundPreferenc)


    bgFillInput.addEventListener('change', function (evant) {
        const file = evant.target.files[0];
        const imgUrl = URL.createObjectURL(file)
        document.body.style.background = `url(${imgUrl})`;
        bgproviewImg.style.background = `url(${imgUrl})`;
        bgRemovBtn.style.display = 'inline'
        bgContolors.style.display = 'block'
    });

    bgRemovBtn.addEventListener('click',function(){
        document.body.style.background = 'none';
        document.body.style.backgroundColor = '#dddeee';
        bgproviewImg.style.background = 'none'
        bgproviewImg.style.background = '#dddeee'
        bgFillInput.value = null;
        bgContolors.style.display ='none'
       
    })
}


//start  evant heandelar 
// color random button handelar 
function handleGenareteRandomColorBtn() {
    const color = genareteDisimolColor()
    updateColorCodeToDom(color)
}

// chenge Input handelar
function chengeInputHexColorHendelar(e) {
    const hexColor = e.target.value
    if (hexColor) {
        this.value = hexColor.toUpperCase()
        if (isValidet(hexColor)) {
            const color = hexTodisimolColor(hexColor)
            updateColorCodeToDom(color)
        }
    }
    copySound.volume = 0.2;
    copySound.play();
}

/***
 * color slider handelar
 * @param {object} color 
 * @return {object},parsecolorSliderHandelar
 */
function colorSliderHandelar(colorSliderRed, colorSliderGreen, colorSliderBlue,) {
    return function () {
        const color = {
            red: parseInt(colorSliderRed.value),
            green: parseInt(colorSliderGreen.value),
            blue: parseInt(colorSliderBlue.value)
        };
        updateColorCodeToDom(color)
    }
};


// copy button handelar

function handleCopyToClipboard() {
    const colorModeRadios = document.getElementsByName('color-mode');
    const mode = getCheckedValueFromRadios(colorModeRadios);
    if (mode === null) {
        throw new Error('Invalide Radio Input')
    }
    if (toastContainer !== null) {
        toastContainer.remove();
        toastContainer = null;
    }
    if (mode === 'hex') {
        const hexColor = document.getElementById('text-input-hex').value;
        if (hexColor && isValidet(hexColor)) {
            navigator.clipboard.writeText(`#${hexColor}`);
            genareteToastMessage(`#${hexColor} Copid`);
        } else {
            alert('Invalit Color Code')
        }
    } else {
        const rgbColor = document.getElementById('text-input-rgb').value;
        navigator.clipboard.writeText(rgbColor);
        genareteToastMessage(`${rgbColor} Copied`);
    }
    copySound.volume = 0.2;
    copySound.play();
}

// Preset Colors handelar
function presetColorcontainarHandelar(evant) {
    const chaltd = evant.target
    const data = chaltd.getAttribute('data-color').slice(1)
    if (toastContainer !== null) {
        toastContainer.remove()
        toastContainer = null
    }
    if (chaltd.className === 'color-box') {
        navigator.clipboard.writeText(data)
        copySound.volume = 0.2;
        copySound.play();
        genareteToastMessage(`#${data} copid`)
        const color = hexTodisimolColor(data)
        updateColorCodeToDom(color)
    }
}

// save to custom color handelar 
function saveTocostomBtn(costomsColorsBox, chengeInputHexColor) {

    return function () {
        const saveColor = `#${chengeInputHexColor.value}`;
        if (customsColor.includes(saveColor)) {
            alert('Allredy save color')
            return;
        }
        customsColor.unshift(saveColor)
        if (customsColor.length > 24) {
            customsColor = customsColor.slice(0, 24);
        }
        localStorage.setItem("custom-colors", JSON.stringify(customsColor));
        removeChildren(costomsColorsBox)
        displayColorBoxes(costomsColorsBox, customsColor)
    }
}

function costomsColorprantHandelar(evant) {
    const child = evant.target
    const chaildColor = child.getAttribute('data-color').slice(1);
    if (toastContainer !== null) {
        toastContainer.remove();
        toastContainer = null;
    }
    if (child.className === 'color-box') {
        navigator.clipboard.writeText(chaildColor);
        const color = hexTodisimolColor(chaildColor);
        updateColorCodeToDom(color)
        genareteToastMessage(`#${chaildColor} copid`)
    }
    copySound.volume = 0.01
    copySound.play()
}



// dom releted function
/**
 * Generate dynamic DOM element to show a toast messege and toas container
 * @param {String} message
 */

function genareteToastMessage(msg) {
    toastContainer = document.createElement('div');
    toastContainer.innerText = msg;
    toastContainer.className = 'toast-message toast-message-slide-in'

    toastContainer.addEventListener('click', function () {
        toastContainer.classList.remove('toast-message-slide-in');
        toastContainer.classList.add('toast-message-slide-out');

        toastContainer.addEventListener('animationend', function () {
            toastContainer.remove();
            toastContainer = null;
        })
    })
    document.body.appendChild(toastContainer);
}



/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string} 
 */
function getCheckedValueFromRadios(nodes) {
    copySound

    let checkedValue = null;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            checkedValue = nodes[i].value;
            break;
        }
    }
    return checkedValue;
}


/**
 * update dom elment whit colculated color values
  * @param {Object} color
 */
function updateColorCodeToDom(color) {
    const hexColor = genareteHexCOlor(color);
    const rgbColor = genareteRgbColor(color);

    // dom refarenc
    document.getElementById('color-display').style.backgroundColor = `#${hexColor}`;
    document.getElementById('text-input-hex').value = hexColor;
    document.getElementById('text-input-rgb').value = rgbColor;
    document.getElementById('color-slider-red-label').innerText = color.red;
    document.getElementById('color-selider-red').value = color.red;
    document.getElementById('color-slider-green-label').innerText = color.green;
    document.getElementById('color-selider-green').value = color.green;
    document.getElementById('color-slider-blue-label').innerText = color.blue;
    document.getElementById('color-selider-blu').value = color.blue;

}

/***
 * genaret box  to dom Element 
 * @param {string}
 * @returns {object} color
 */
function genaretBoxContainar(color) {
    const boxContain = document.createElement('div');
    boxContain.className = 'color-box';
    boxContain.style.backgroundColor = color;
    boxContain.setAttribute('data-color', color)
    return boxContain;
}
/**
 * display color box function 
 * @param {*String} prant 
 * @param {Array} colors 
 */

function displayColorBoxes(prant, colors) {
    colors.forEach((color) => {
        if (color && isValidet(color.slice(1))) {
            const colorBox = genaretBoxContainar(color)
            prant.appendChild(colorBox)
        }
    });
}

/**
 * remov childs Element 
 * @ @param {object} parantNode 
 */
function removeChildren(parentNode) {
    let child = parentNode.lastElementChild;
    while (child) {
        parentNode.removeChild(child);
        child = parentNode.lastElementChild;
    }
}

function chengeBackgroundPreferenc(){
    document.body.style.backgroundSize = document.getElementById('bg-size').value;
    document.getElementById('bacground-proview').style.backgroundSize=document.getElementById('bg-size').value;
    document.body.style.backgroundRepeat = document.getElementById('bg-repeat').value;
    document.getElementById('bacground-proview').style.backgroundRepeat=document.getElementById('bg-repeat').value;
    document.body.style.backgroundPosition = document.getElementById('bg-position').value;
    document.getElementById('bacground-proview').style.backgroundPosition=document.getElementById('bg-position').value;
    document.body.style.backgroundAttachment = document.getElementById('bg-attachment').value;
    document.getElementById('bacground-proview').style.backgroundAttachment=document.getElementById('bg-attachment').value;
   
}

// utility function use to any project 

/**
 * generat decimal color
 * @param {Object} color
 * @returns {Object} 
 */

function genareteDisimolColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return {
        red,
        green,
        blue
    }
}

/**
 * grenert hex color 
 * @param {String} color
 * @returns {String} 
 */

function genareteHexCOlor(color) {
    const { red, green, blue } = color;
    const towCode = (value) => {
        let hex = value.toString(16)
        return hex.length === 1 ? `0${hex}` : hex;
    }
    return `${towCode(red)}${towCode(green)}${towCode(blue)}`.toUpperCase()
}


/**
 * take a color object of three decimol values and argb color
 * @param {String} color 
 * @returns {String}
 */

function genareteRgbColor({ red, green, blue }) {
    return `rgb(${red},${green},${blue})`
}

/**
 * convat hex number to desimal number 
  * @param {String} hex
  * @returns {Object}
 */

function hexTodisimolColor(hex) {
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16)
    const blue = parseInt(hex.slice(4), 16)
    return {
        red,
        green,
        blue,
    }
}

/**
 * check color validetion 
 *  @param {String} color
 * @return {boolean}
 */

function isValidet(color) {
    if (color.length !== 6) return false;
    return /^[0-9A-fa]{6}$/i.test(color);
}


let V_KEYBOARD = false;
let SHIFT_EN = false;
let CAPS_EN = false;
const withShiftKeys = document.querySelectorAll('[data-shiftKey]')
const keys = document.querySelectorAll('[data-key]')
const inputs = document.querySelectorAll('.inp')
const keyboard = document.querySelector('#keyboard')

const backspace = () => {
    const focusedInp = document.querySelector('.focused')
    focusedInp.value = focusedInp.value.substring(0, focusedInp.value.length - 1)
}
const enterFunc = () => {
    const focusedInp = document.querySelector('.focused')
    focusedInp.value += '\n'
}
const spacebarFunc = () => {
    const focusedInp = document.querySelector('.focused')
    focusedInp.value += ' '
}

//select input box for input
inputs.forEach((input, idx) => {
    input.addEventListener('focus', () => {
        try {
            document.querySelector('.focused').classList.remove('focused');
        } catch (err) { console.log(err) }
        input.classList.add('focused');
    })
})

//toggle SHIFT_EN 
const toggleShift = () => {
    SHIFT_EN = !SHIFT_EN;
    if (SHIFT_EN) {
        withShiftKeys.forEach((key, idx) => {
            key.innerHTML = key.dataset.shiftkey
        })
    } else {
        withShiftKeys.forEach((key, idx) => {
            key.innerHTML = key.dataset.key
        })
    }
}

//add key pressed value in focused input
const addOnFocusedInput = (input) => {
    if (SHIFT_EN) toggleShift()
    document.querySelector('.focused').value += input;
}


keys.forEach((key, idx) => {
    key.addEventListener('click', () => {
        // const ketSel = SHIFT_EN ? key.dataset.shiftkey : key.dataset.key
        addOnFocusedInput(key.innerHTML);
    })
})

const initKeys = () => {
    withShiftKeys.forEach((key, idx) => {
        key.innerHTML = key.dataset.key
    })
}
initKeys();

const toggleKeyboard = () => {
    V_KEYBOARD = !V_KEYBOARD;

    if (V_KEYBOARD) {
        document.querySelector('body').style.minHeight = '150vh';
        keyboard.style.transform = 'translate(-50%,0)'
        keyboard.style.opacity = 1;
    }else{
        document.querySelector('body').style.minHeight = 'auto';
        keyboard.style.opacity = 0;
        setTimeout(() => {
            keyboard.style.transform = 'translate(100%,0)'
        },1000)
    }
}

const toggleCaps = () => {
    CAPS_EN = !CAPS_EN;
    if(CAPS_EN){
        withShiftKeys.forEach((key,idx) => {
            if(!key.classList.contains('sp')){
                key.innerHTML = key.dataset.shiftkey
            }
        })
    }else initKeys()
}


//DISPLAY PAGE JS

const goBack = () => window.history.back()

const populateData = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlParams.entries())
    const content = document.querySelector('#content')
    const header = document.querySelector('#header')

    content.innerText = params.content

    header.innerHTML = `
    <div class='header_content'>
        <span class='fullname'>${params.first_name} ${params.last_name}</span>
        <button class='btn' onclick='goBack()'> X </button>
    </div>
    `
}
let V_KEYBOARD = false;
let SHIFT_EN = false;
let CAPS_EN = false;
const withShiftKeys = document.querySelectorAll('[data-shiftKey]')
const keys = document.querySelectorAll('.key')
const inputs = document.querySelectorAll('.inp')
const keyboard = document.querySelector('#keyboard')



const initKeys = () => {
    withShiftKeys.forEach((key, idx) => {
        key.innerHTML = key.dataset.key
        key.addEventListener('click', () => {
            // const ketSel = SHIFT_EN ? key.dataset.shiftkey : key.dataset.key
            enterChar(key.innerText)
        })
    })

    //select input box for input
    inputs.forEach((input, idx) => {
        input.addEventListener('focus', () => {
            try {
                document.querySelector('.focused').classList.remove('focused');
            } catch (err) { console.log(err) }
            input.classList.add('focused');
        })
    })

    keys.forEach(key => {
        key.addEventListener('mousedown',() => {
            key.style.backgroundColor = 'rgba(53, 57, 53, 0.7)'
        })
        key.addEventListener('mouseup',() => {
            key.style.backgroundColor = localStorage.key_bg || '#353935';
        })
        key.addEventListener('touchstart',() => {
            key.style.backgroundColor = 'rgba(53, 57, 53, 0.7)'
        })
        key.addEventListener('touchend',() => {
            key.style.backgroundColor = localStorage.key_bg || '#353935';
        })
    }) 

    changeKeyboardColor(localStorage.keyboard_bg)
    changeKeyBG(localStorage.key_bg)
    changeKeyColor(localStorage.key_color)

}

const toggleKeyboard = (e) => {
    V_KEYBOARD = !V_KEYBOARD;

    if (V_KEYBOARD) {
        document.querySelector('body').style.minHeight = '150vh';
        keyboard.style.transform = 'translate(-50%,0)'
        keyboard.style.opacity = 1;
        e.innerText = 'CLOSE VIRTUAL KEYBOARD'
    } else {
        document.querySelector('body').style.minHeight = 'auto';
        e.innerText = 'OPEN VIRTUAL KEYBOARD'
        keyboard.style.opacity = 0;
        setTimeout(() => {
            keyboard.style.transform = 'translate(100%,0)'
        }, 1000)
    }
}

const removeSelection = () => {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

const backspace = () => {
    const focusedInp = document.querySelector('.focused')
    focusedInp.focus()
    const selStr = focusedInp.selectionStart;
    if (selStr !== 0) {
        focusedInp.value = focusedInp.value.substring(0, selStr - 1) + focusedInp.value.substring(selStr, focusedInp.value.length);
        focusedInp.selectionStart = selStr - 1
        removeSelection()
    }
    // focusedInp.value = focusedInp.value.substring(0, focusedInp.value.length - 1)
}

const enterChar = (inp) => {
    const focusedInp = document.querySelector('.focused')
    focusedInp.focus()
    const selStr = focusedInp.selectionStart;
    if ((SHIFT_EN || selStr === 0) && ['\t', '\n', ' '].some(en => {
        if (en === inp) return true;
        return false;
    })) return
    focusedInp.value = focusedInp.value.substring(0, selStr) + inp + focusedInp.value.substring(selStr, focusedInp.value.length);
    focusedInp.selectionStart = selStr + 1
    removeSelection()
    if (SHIFT_EN) toggleShift()
}

const toggleCaps = (e) => {

    if (SHIFT_EN) return

    CAPS_EN = !CAPS_EN;

    if (CAPS_EN) {
        withShiftKeys.forEach((key, idx) => {
            if (!key.classList.contains('sp')) {
                key.innerHTML = key.dataset.shiftkey
            }
        })
        e.classList.add('selected')
    } else {
        document.querySelector('.selected').classList.remove('selected')
        initKeys()
    }
}

//toggle SHIFT_EN 
const toggleShift = (e) => {
    if (CAPS_EN) return
    SHIFT_EN = !SHIFT_EN;

    if (SHIFT_EN) {
        e.classList.add('selected')
    } else {
        document.querySelector('.selected').classList.remove('selected')
    }

    withShiftKeys.forEach((key, idx) => {
        key.innerHTML = SHIFT_EN ? key.dataset.shiftkey : key.dataset.key
    })
}


//KEYBOARD COLOR JS

const keyboard_bg = document.querySelector('#keyboard_bg')
const key_bg = document.querySelector('#key_bg')
const key_color = document.querySelector('#key_color')



const changeKeyboardColor = (e) => {
    if (e === '' || e === undefined){
        keyboard_bg.value = '#1d1d1d'
        return;
    }
    keyboard.style.backgroundColor = e
    localStorage.keyboard_bg = e;
    keyboard_bg.value = e;
}

const changeKeyBG = (e) => {
    if (e === '' || e === undefined){
        key_bg.value = '#353935'
        return
    }
    keys.forEach((key) => {
        key.style.backgroundColor = e
    })
    localStorage.key_bg = e;
    key_bg.value = e;
}

const changeKeyColor = (e) => {
    if (e === '' || e === undefined){
        key_color.value = '#ffffff'
        return
    }
    keyboard.style.color = e
    document.querySelector('.selected').style.borderColor = e
    localStorage.key_color = e;
    key_color.value = e;
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
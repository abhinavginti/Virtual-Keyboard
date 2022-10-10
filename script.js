let V_KEYBOARD = false;

const initKeyboard = () => {
    V_KEYBOARD = true;
    document.querySelector('body').style.minHeight = '150vh'
}

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
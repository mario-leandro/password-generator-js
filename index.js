const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const symbolCheckEl = document.querySelector("#symbol-check");
const securityIndicatorEl = document.querySelector("#security-indicator-bar");

let passwordLenght = 16;

function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolsChars = "!?@&*()[]";

    if(upperCaseCheckEl.checked) {
        chars += upperCaseChars;
    }

    if(numberCheckEl.checked) {
        chars += numberChars;
    }

    if(symbolCheckEl.checked) {
        chars += symbolsChars;
    }

    let password = "";

    for (let i = 0; i < passwordLenght; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);

        password += chars.substring(randomNumber, randomNumber + 1);
    }

    inputEl.value = password;
    calculateQuality();
    calculateFontSize();
}

function calculateQuality() {


    const percent = Math.round(((passwordLenght / 64) * 25 + 
        (upperCaseCheckEl.checked ? 15 : 0) + 
        (numberCheckEl.checked ? 25 : 0) + 
        (symbolCheckEl.checked ? 35 : 0)));
    securityIndicatorEl.style.width = `${percent}%`;

    if (percent > 69) {
        // safe
        securityIndicatorEl.classList.remove("critical");
        securityIndicatorEl.classList.remove("warning");
        securityIndicatorEl.classList.add("safe");
    } else if (percent > 50) {
        // warning
        securityIndicatorEl.classList.remove("critical");
        securityIndicatorEl.classList.remove("safe");
        securityIndicatorEl.classList.add("warning");
    } else { 
        // critical
        securityIndicatorEl.classList.remove("warning");
        securityIndicatorEl.classList.remove("safe");
        securityIndicatorEl.classList.add("critical");
    }

    if (percent >= 100) {
        securityIndicatorEl.classList.add("complete");
    } else {
        securityIndicatorEl.classList.remove("complete");
    }
}

function calculateFontSize() {
    if (passwordLenght > 45) {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.add("font-xxs");
    } else if (passwordLenght > 32) {
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xs");
        inputEl.classList.remove("font-xxs");
    } else if (passwordLenght > 22) {
        inputEl.classList.add("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    } else {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value);
}

const passwordLenghtEl = document.querySelector("#password-lenght");
passwordLenghtEl.addEventListener("input", function() {
    passwordLenght = passwordLenghtEl.value;
    document.querySelector("#password-lenght-text").innerText = passwordLenght;
    generatePassword();
});

upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
symbolCheckEl.addEventListener("click", generatePassword);

document.querySelector("#copy").addEventListener("click", copy);
document.querySelector("#copy2").addEventListener("click", copy);
document.querySelector("#reload").addEventListener("click", generatePassword);

generatePassword();
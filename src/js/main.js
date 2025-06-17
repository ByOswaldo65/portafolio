let vantaEffect = null;

inicio();

function inicio() {
    window.addEventListener("load", () => {
        const $btnToTop = document.getElementById('btnToTop');

        const colorHex = localStorage.getItem("colorHex");
        const colorBit = localStorage.getItem("colorBit");
        const isDarkMode = localStorage.getItem("isDarkMode") === "true";
        const colorSelected = localStorage.getItem("colorSelected");

        let $btnColor;
        const valid = colorHex && colorBit && colorSelected;

        const selected = valid ? colorSelected : "azul";
        $btnColor = document.getElementById(selected);

        if (!valid) {
            localStorage.setItem("colorSelected", "azul");
            localStorage.setItem("colorHex", "#0ea5e9");
            localStorage.setItem("colorBit", "0x0ea5e9");
            localStorage.setItem("isDarkMode", "false");
        }

        updateModeStyles(valid ? isDarkMode : false);
        newBorderColor($btnColor, selected);

        addClickHandler(".btnMode", changeMode);
        addClickHandler(".btnColor", changeColor);
        addClickHandler("#btnConfig", () => openMenu("menuChange"));

        window.addEventListener('scroll', () => toggleScrollButton($btnToTop));

        typewriterEffect("mainText", "Diseño de interfaces accesibles, funcionales y centradas en el usuario, combinando estética, usabilidad y tecnología para ofrecer experiencias web intuitivas y eficientes", 50);

        document.getElementById("Loader").style.display = "none";
    });
}

function addClickHandler(selector, handler) {
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener("click", handler);
    });
}

function openMenu(menuSelector) {
    const menu = document.getElementById(menuSelector);
    const isOpen = menu.classList.contains('max-h-0');

    const toAdd = isOpen ? ["max-h-[345px]", "opacity-100", "pointer-events-auto"] : ["max-h-0", "opacity-0", "pointer-events-none"];
    const toRemove = isOpen ? ["max-h-0", "opacity-0", "pointer-events-none"] : ["max-h-[345px]", "opacity-100", "pointer-events-auto"];

    menu.classList.remove(...toRemove);
    menu.classList.add(...toAdd);
}

function changeColor(event) {
    const $btnColor = event.currentTarget;

    const colorSelected = $btnColor.dataset.colorSelected;
    const colorHex = $btnColor.dataset.hex;
    const colorBit = $btnColor.dataset.bit;
    const isDarkMode = localStorage.getItem("isDarkMode");

    localStorage.setItem("colorSelected", colorSelected);
    localStorage.setItem("colorHex", colorHex);
    localStorage.setItem("colorBit", colorBit);

    cleanBorder('.btnColor');
    newBorderColor($btnColor, colorSelected);

    updateModeStyles(isDarkMode);
}

function changeMode() {
    const ckbBox = document.getElementById("ckbMode");
    const isChecked = ckbBox.checked;

    localStorage.setItem("isDarkMode", isChecked.toString());

    updateModeStyles(isChecked);
}

function createVanta(colorBit, colorMode) {
    if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
    }

    vantaEffect = VANTA.TOPOLOGY({
        el: "#mainFondo",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: parseInt(colorBit),
        backgroundColor: parseInt(colorMode),
        points: 2.0,
        maxDistance: 15.0,
        spacing: 18.0,
    });
}

function changeTextColor(colorHex) {
    document.querySelectorAll(".changeColor").forEach(el => {
        el.style.color = colorHex;
    });
}

function changeLogoColor(colorText) {
    if (colorText === "#ffffff") {
        document.querySelectorAll("#logo").forEach(el => {
            el.classList.add("img-white");            
        });
    } else {
        document.querySelectorAll("#logo").forEach(el => {
            el.classList.remove("img-white");
        });
    }
}

function toggleModeClass(isDarkMode) {
    querySelectAll(".changeMode", "dark-mode", "light-mode", isDarkMode);
    querySelectAll(".changeMode-border", "dark-mode-border", "light-mode-border", isDarkMode);
    querySelectAll(".changeMode-hover-bg", "dark-mode-hover-bg", "light-mode-hover-bg", isDarkMode);
    querySelectAll(".changeMode-back-text", "dark-mode-back-text", "light-mode-back-text", isDarkMode);
    querySelectAll(".changeMode-shadow", "dark-mode-shadow", "light-mode-shadow", isDarkMode);
    querySelectAll(".changeMode-img", "dark-mode-img", "light-mode-img", isDarkMode);
    querySelectAll(".changeMode-border-form", "dark-mode-border-form", "light-mode-border-form", isDarkMode);
}

function querySelectAll(selector, darkMode, lightMode, isDarkMode) {
    document.querySelectorAll(selector).forEach(el => {
        el.classList.toggle(darkMode, isDarkMode);
        el.classList.toggle(lightMode, !isDarkMode);
    });
}

function updateModeStyles(isChecked) {
    isChecked = isChecked === true || isChecked === "true";

    document.getElementById("ckbMode").checked = isChecked;

    const colorText = isChecked ? "#ffffff" : "#2b2928";
    const colorBackground = isChecked ? 0x0 : 0xffffff;
    const colorBit = localStorage.getItem("colorBit");
    const colorHex = localStorage.getItem("colorHex");

    createVanta(colorBit, colorBackground);
    changeLogoColor(colorText);
    changeTextColor(colorHex);
    toggleModeClass(isChecked);
}

function newBorderColor(el, colorSelected) {
    el.classList.remove(`borderNormal-${colorSelected}`);
    el.classList.add(`borderSelected-${colorSelected}`);
}

function cleanBorder(selector) {
    document.querySelectorAll(selector).forEach(el => {
        el.className = el.className.replace(/borderSelected-(\w+)/g, 'borderNormal-$1');
    });
}

function showElement(selector) {
    const element = document.getElementById(selector);
    element.classList.remove('hidden');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hiddenElement(selectorToHide, selectorToScroll) {
    const elementToHide = document.getElementById(selectorToHide);
    const elementToScroll = document.getElementById(selectorToScroll);

    elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
        elementToHide.classList.add('hidden');
    }, 300); // ajusta si hace falta
}

function toggleScrollButton(element, threshold = 500, hideOffset = 200) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isNearBottom = scrollY + windowHeight >= documentHeight - hideOffset;

    if (scrollY > threshold && !isNearBottom) {
        element.classList.add('opacity-100', 'pointer-events-auto');
        element.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        element.classList.remove('opacity-100', 'pointer-events-auto');
        element.classList.add('opacity-0', 'pointer-events-none');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleText(el) {
    const desc = el.querySelector('#desc');
    const btn = el.querySelector('#seeMore');

    desc.classList.toggle('expanded');

    desc.classList.contains('expanded') ? btn.style.display = 'none' : btn.style.display = 'inline';
}

function toggleMenu() {
    const menu = document.getElementById('responsiveMenu');

    menu.classList.contains('translate-x-[-100%]') ? menu.classList.remove('translate-x-[-100%]') : '' ;

    if (menu.classList.contains('animate-slideIn')) {
        menu.classList.remove('animate-slideIn');
        menu.classList.add('animate-slideOut');
    } else {
        menu.classList.remove('animate-slideOut');
        menu.classList.add('animate-slideIn');
    }
}

function sendEmail() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;
  
    const destinatario = "pedroben83@gmail.com";
    const asunto = encodeURIComponent("Consulta profesional desde tu portafolio");
    const cuerpo = encodeURIComponent(
        `Nombre: ${nombre}\nCorreo: ${correo}\n\nMensaje:\n${mensaje}`
    );
  
    const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
    window.location.href = mailtoLink;
}

function autoResize(el) {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight + 4) + 'px';
}

function typewriterEffect(elementId, text, speed) {
    let index = 0;
    const el = document.getElementById(elementId);
    const cursor = document.createElement("span");

    cursor.classList.add("cursor");
    cursor.textContent = "|";
    el.appendChild(cursor);

    function typeNextChar() {
        if (index < text.length) {
            el.insertBefore(document.createTextNode(text.charAt(index)), cursor);
            index++;
            setTimeout(typeNextChar, speed);
        } else {
            cursor.remove();
        }
    }

    typeNextChar();
}
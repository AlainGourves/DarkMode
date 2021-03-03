const prefersDarkScheme = window.matchMedia("(prefers-color-scheme : dark)");
const html = document.querySelector("html");
const os_pref = document.querySelector("#os_pref");
const user_pref = document.querySelector("#user_pref");
const toggle_btn = document.querySelector("#toggle");
const erase_btn = document.querySelector("#erase");

let theme = "Light"; // default mode

function updateOSTheme(){
    theme = (prefersDarkScheme.matches) ? "Dark" : "Light";
    os_pref.textContent = theme;
}

function setTheme(){
    if (theme === "Light"){
        html.classList.add("theme-light");
        html.classList.remove("theme-dark");
    }else{
        html.classList.add("theme-dark");
        html.classList.remove("theme-light");
    }
}

window.addEventListener("load", e => {
    if (window.matchMedia) {
        updateOSTheme();
        
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
            updateOSTheme();
        });
    }

    console.log("thème: ", theme)

    if(localStorage.getItem("theme")){
        theme = localStorage.getItem("theme");
        user_pref.textContent = theme;
        html.classList.add("theme-" + theme.toLowerCase())
    }else{
        user_pref.textContent = "None";
        console.log("Pas de thème enregistré");
    }
    
    setTheme();
    
    toggle_btn.addEventListener('click', e => {
        theme = (theme === "Light") ? "Dark" : "Light";
        user_pref.textContent = theme;
        localStorage.setItem("theme", theme);
        setTheme();
    })
    
    erase_btn.addEventListener('click', e => {
        localStorage.removeItem('theme');
        user_pref.textContent = "None";
        // mode defaults to OS's setting
        updateOSTheme();
        setTheme();
    })
});
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme : dark)");
const html = document.querySelector("html");
const myThemeOSPref = document.querySelector("#os_pref");
const myThemeUserPref = document.querySelector("#user_pref");
const myThemeToggleBtn = document.querySelector("#select__mode");
const myThemeEraseLocalStorage = document.querySelector("#localStorage__erase");
const myThemeEraseBtn = myThemeEraseLocalStorage.querySelector("#erase");

let myThemeOS, myThemeUser, myTheme;

function updateOSTheme(){
    myThemeOS = (prefersDarkScheme.matches) ? "Dark" : "Light";
    myThemeOSPref.textContent = myThemeOS;
}

function setTheme(){
    if (myThemeUser && (["Light", "Dark"].includes(myThemeUser))) {
        // User's change has priority
        myTheme = myThemeUser;
        if (myThemeEraseLocalStorage.classList.contains('disabled')){
            myThemeEraseLocalStorage.classList.remove('disabled');
        }
    }else if(myThemeOS && (["Light", "Dark"].includes(myThemeOS))){
        myTheme = myThemeOS;
    }else{
        // defaults to "Light"
        myTheme = "Light"
    }
    myThemeToggleBtn.checked = (myTheme === "Light");

    // switch
    switch(myTheme) {
        case "Dark":
            html.classList.add("theme-dark");
            html.classList.remove("theme-light");
            break;
        default:
            html.classList.add("theme-light");
            html.classList.remove("theme-dark");
    }
}

window.addEventListener("load", e => {
    if (window.matchMedia) {
        updateOSTheme();
        
        // Listen for OS level theme's changes
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
            updateOSTheme();
            setTheme();
        });
    }

    if(localStorage.getItem("myTheme")){
        myThemeUser = localStorage.getItem("myTheme");
        myThemeUserPref.textContent = myThemeUser;
    }else{
        myThemeUserPref.textContent = "None";
        myThemeEraseLocalStorage.classList.add('disabled');
    }
    
    setTheme();
    
    // Button for local theme's change
    myThemeToggleBtn.addEventListener('change', e => {
        myThemeUser = (myTheme === "Light") ? "Dark" : "Light";
        myThemeUserPref.textContent = myThemeUser;
        localStorage.setItem("myTheme", myThemeUser);
        setTheme();
    })
    
    // Button to erase local setting
    myThemeEraseBtn.addEventListener('click', e => {
        myThemeUser = undefined;
        localStorage.removeItem('myTheme');
        myThemeUserPref.textContent = "None";
        myThemeEraseLocalStorage.classList.add('disabled');
        // mode defaults to OS's setting
        updateOSTheme();
        setTheme();
    })
});
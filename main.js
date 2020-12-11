const toggleMenu = document.querySelector(".toggle-menu");
const toggleButton = document.querySelector(".toggle-button");

toggleButton.addEventListener('click',()=>{
    if(toggleMenu.classList.contains("open")){
        toggleMenu.classList.remove("open");
    } else{
        toggleMenu.classList.add("open");
    }
})
"use strict"

function buttonClick(event){
    const clicked = event.target;
    //alert("Bottone cliccato "+clicked.);
    console.log(event);
    clicked.getAttribute("data-color");
}

function colorChanger(event){
    const clicked = event.target;
    const color = clicked.getAttribute("data-color");
    const paragrafo = document.getElementById("p_cambia_colore");
    //aggiunge solo ma non toglie
    //paragrafo.classList.add(color);
    paragrafo.className = "altro_box "+ color;

    //generico, posso usare setattibute e getattirbute su tutti i valori
    paragrafo.setAttribute("class","altro_box "+color);
}

document.addEventListener(
    "DOMContentLoaded",
    (e)=>{
        const button_1 = document.getElementById("button_1");
        button_1.addEventListener('click',buttonClick);

        const button_changers = document.querySelectorAll(".color_changer");
        button_changers.forEach((v,k,p)=>{
            const color = v.getAttribute("data-color");
            v.innerHTML = color.toUpperCase();
            v.addEventListener('click',colorChanger);
        });

        const button_resetter = document.getElementById("color_resetter");
        button_resetter.innerText = "RESETTER";
    }
)
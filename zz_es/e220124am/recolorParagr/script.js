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


        /**
         * aggiungiamo 2 btn ingrandisci e riduci poi aggiungere un tag <img> con dentro un img che abbia
         * 2 attributi width e height, premendo il tasto ingr o riduci fai +10, -10 
         */

        function zoomFunction(event){
            //ferma la propagazione dell'evento
            event.stopPropagation();

            const myBtn = event.target;
            const amount = parseInt(myBtn.getAttribute('data-zoom'));
            const imgElement = document.getElementById("random_img_600x600");
            imgElement.setAttribute('width',parseInt(imgElement.getAttribute('width'))+amount);
            imgElement.setAttribute('height',parseInt(imgElement.getAttribute('height'))+amount);
        }

        const zoomBtns = document.querySelectorAll('.btn_zoom');
        zoomBtns.forEach((v)=>v.addEventListener('click',zoomFunction));
    }
)
"use strict"

function zoomFunction(event){
    //ferma la propagazione dell'evento
    event.stopPropagation();

    const myBtn = event.target;
    const amount = parseInt(myBtn.getAttribute('data-zoom'));
    const imgElement = document.getElementById("random_img_600x600");
    imgElement.setAttribute('width',parseInt(imgElement.getAttribute('width'))+amount);
    imgElement.setAttribute('height',parseInt(imgElement.getAttribute('height'))+amount);
}

document.addEventListener(
    "DOMContentLoaded",
    (e)=>{
        /**
         * aggiungiamo 2 btn ingrandisci e riduci poi aggiungere un tag <img> con dentro un img che abbia
         * 2 attributi width e height, premendo il tasto ingr o riduci fai +10, -10 
         */

        const zoomBtns = document.querySelectorAll('.btn_zoom');
        zoomBtns.forEach((v)=>v.addEventListener('click',zoomFunction));
    }
)
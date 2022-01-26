"use strict"

 /**
 * qualunque elemento di tipo display hanno una dimensione esprimibile come width e height
 * ciò si esprime nei fogli stile, ogni elemento ha un attributo specifico style
 * rimodificare il codice in modo da usare lo style al posto degli attributi html4 
 */

function zoomFunction(event){
    //ferma la propagazione dell'evento
    event.stopPropagation();

    const myBtn = event.target;
    let amount = 1+parseInt(myBtn.getAttribute('data-zoom'))/100;
    const imgElement = document.getElementById("random_img");
    const oldVal = imgElement.style.width;
    console.log(oldVal);
    if(oldVal==null || oldVal ===""){    
        amount *= 600;
    }
    else{
        amount *= parseInt(oldVal);
    }
    console.log(amount);
    imgElement.style.width = imgElement.style.height = amount+"px";        
}


document.addEventListener(
    "DOMContentLoaded",
    (e)=>{
        
        const zoomBtns = document.querySelectorAll('.btn_zoom');
        zoomBtns.forEach((v)=>v.addEventListener('click',zoomFunction));
        
        const imgElement = document.getElementById("random_img");
        imgElement.style.width = imgElement.style.height = "600px";
    }
)
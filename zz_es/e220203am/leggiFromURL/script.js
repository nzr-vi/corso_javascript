"use strict";

//file:

function onFetchRequest(event){
    event.stopPropagation();
    const inputNode = document.getElementById("input_url");
    const url = inputNode.value;
    /*
        XMLHttpRequest
    */

    if(!url ||url===document.url || url==='#' || url==='')
        alert("avoid using empty link");
    else
        fetch(url)
            .then(response => {
                if (!response.ok) 
                    throw new Error('Responce was not ok');
                return response.text();
            })
            .then(text => {
                //console.log(text);
                const myDiv = document.getElementById("output_codice");
                myDiv.innerHTML = text;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert("something went wrong");
            });

}

window.addEventListener(
    'DOMContentLoaded', 
    function(event){
        const fetchBtn = document.getElementById("btn_fetch_url");
        fetchBtn.addEventListener('click',onFetchRequest);
    }
);


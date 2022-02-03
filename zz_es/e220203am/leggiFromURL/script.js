"use strict";

//file:

function onFetchRequest(event){
    event.stopPropagation();
    const inputNode = document.getElementById("input_url");
    const url = inputNode.value;
    inputNode.value='';
    /*
        XMLHttpRequest
    */

    if(!url ||url===document.url || url==='#' || url==='')
        alert("avoid using empty link");
    else
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    const error = new Error('Responce was not ok');
                    error.response = response;
                    throw error;
                }
                return response.text();
            })
            .then(text => {
                //console.log(text);
                document.getElementById("output_codice").innerHTML = text;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert("something went wrong");
                document.getElementById("output_codice").innerHTML = '';
            });
}
function onFetchRequestJSON(event){
    event.stopPropagation();
    const inputNode = document.getElementById("input_url");
    const url = inputNode.value;
    inputNode.value='';
    /*
        XMLHttpRequest
    */

    if(!url ||url===document.url || url==='#' || url==='')
        alert("avoid using empty link");
    else
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    const error = new Error('Responce was not ok');
                    error.response = response;
                    throw error;
                }
                return response.json();
            })
            .then(json => {
                let htmlTemplate = document.getElementById("template").innerText;
                let listaFrutti = json.frutti.map(x=>"<li>"+x+"</li>").join('');
                htmlTemplate = htmlTemplate
                    .replaceAll("{{name}}",json.persona.nome)
                    .replaceAll("{{surname}}",json.persona.cognome)
                    .replaceAll("{{fruit_list}}",listaFrutti);
                    
                document.getElementById("output_codice").innerHTML = htmlTemplate;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                alert("something went wrong");
                document.getElementById("output_codice").innerHTML = '';
            });
}

window.addEventListener(
    'DOMContentLoaded', 
    function(event){
        const fetchBtn = document.getElementById("btn_fetch_url");
        fetchBtn.addEventListener('click',onFetchRequestJSON);
    }
);


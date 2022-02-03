/**
 * Esercizio
 * 1. creare una textarea e dargli un id
 * 2. aggiungere un bottone che chiamiamo analizza
 * 3. alla pressione di analizza leggere il contenuto della text area
 * 4. se il contenuto della text area è un array scritto in json
 *    aggiungere nel dom (da qualche parte ex: div)
 *    tanti paragrafi contenenti le stringhe presenti nell'array
 *      4.a WARNING: se la parse va male bisogna gestire l'errore
 *      4.b bisogna testare se si ha un array o un obj
 * 5. aggiungere anche un bottone pulisci che svuota la text area
 *    e butta via i paragrafi precedentemente creati.
 */

"use strict";

function generateJsonObjElement(object){
    const newParagraph = document.createElement("p");
    let textToPutInto;
    if(typeof object === 'object')
        textToPutInto=JSON.stringify(object);
    else
        textToPutInto=object;
    newParagraph.appendChild(document.createTextNode(textToPutInto));
    return newParagraph;
}

function convertAsJson(text){
    const getTargetDiv = document.getElementById("json_window"); 
    if(Array.isArray(text)){
        text.forEach(element => {
            convertAsJson(element);
        });
    }
    else{
        getTargetDiv.appendChild(generateJsonObjElement(text));
    }
}

function pulisciText(event){
    event.stopPropagation();

    document.getElementById("input_json").value = "";
    document.getElementById("json_window").innerText = ""; 
}

function readText(event){
    event.stopPropagation();

    const textBox = document.getElementById("input_json");
    const message = textBox.value;
    console.log(message);
    
    try{
        const parsedJSON = JSON.parse(message);
        if(parsedJSON != null)
            convertAsJson(parsedJSON);
    }
    catch(e)
    {
        alert(e);
    }
}

window.addEventListener(
    'DOMContentLoaded', 
    function(event){
        const analizza = document.getElementById("btn_process_input");
        analizza.addEventListener('click',readText);
        const pulisci = document.getElementById("btn_clear_previous");
        pulisci.addEventListener('click',pulisciText);
        
/*         const toBeAdded = generateJsonObjElement({key:"value"});
        const getTargetDiv = document.getElementById("json_window");
        getTargetDiv.appendChild(toBeAdded); */
    }
);
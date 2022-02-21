"use strict";

// Questo è il commento di una linea.

/* Esercizio:
1. TODO creare form con nome, cognome, data di nascita, telefono, email, indirizzo, peso
2. TODO utilizzare gli input corretti per la tipologia di dato indicato
3. TODO intercettare il submit 
4. TODO annullare l'invio se i campi non sono tutti riempiti e validi
5. TODO inviare il modulo a una certa URL

EVOLUTIVA 
1.TODO

*/

function logSubmit(event) {

    /*
    if(document.getElementById("input_name").value.length==0)
        alert("nome non può essere vuoto");
    else if(document.getElementById("input_surname").value.length==0)
        alert("cognome non può essere vuoto");
    else if(document.getElementById("input_email").value.length==0)
        alert("email non può essere vuoto");

    console.log(document.getElementById("input_birth"));
*/

    let url = "https://postman-echo.com/get?a=5&b=5";
    fetch(url,{mode:"cors"}).then(response=>console.log(response));
    event.preventDefault();
}

function validate_input_form(event){

}

function send_to(url,json){

}


window.addEventListener(
    'DOMContentLoaded', 
    function(event){
		const form = document.getElementById('inputForm');
		form.addEventListener('submit', logSubmit);
    }
);


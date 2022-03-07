"use strict";

const apiURLBase = "http://127.0.0.1:10001/";

let data_list = null;
let item_template = null;

function getAllThoughts(){
    const api_get = "list";

    fetch(apiURLBase+api_get).then(r=>r.json())
        .then(json=>{
            if(json.result==0){

                let thoughts = json.data;
                data_list.innerHTML="";

                thoughts.forEach(thought => {
                    let new_item = item_template
                        .replaceAll("{{id}}",thought.id)
                        .replaceAll("{{thought}}","["+thought.id+"] "+thought.thought);
                    select_list.innerHTML+=option_element;
                    let paragraph_element = thought_template
                        .replaceAll("{{linkID}}",thought.id)
                        .replaceAll("{{thought}}",thought.thought);
                    list_thought.innerHTML+=paragraph_element;
                });
            }
            else{
                //TODO show error
            }
        })
}

window.addEventListener(
	'DOMContentLoaded', 
	function(event){
        data_list = document.getElementById("data-list");
        item_template = data_list.innerHTML;

        getAllThoughts();
    });
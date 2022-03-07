"use strict";

const apiURLBase = "http://127.0.0.1:10001/";

let data_list = null;
let item_template = null;
let btn_add_thought = null;
let input_text = null;
let order_select = null;


    function orderChange(event){

    }

    function delElement(event){
        const api_get = "delete";
        //dataset get all data- attributes and makes an "array"
        let thought_id =  event.currentTarget.dataset.thought_id;
        
        fetch(apiURLBase+api_get+`?id=${thought_id}`).then(r=>r.json())
        .then(json=>{
            //TODO change alert to something human
                alert(json.message);
            }).catch(e=>{
                console.log(e);
            })
    
        getAllThoughts();
    }
    
    function likeThought(event){
        const api_get = "like";
        //get the attribute by the id
        let thought_id =  event.currentTarget.getAttribute("data-thought_id");
        
        fetch(apiURLBase+api_get+`?tid=${thought_id}`).then(r=>r.json())
        .then(json=>{
            //TODO change alert to something human
                alert(json.message);
            }).catch(e=>{
                console.log(e);
            })
    
        getAllThoughts();
    }

    function addThought(event){
        const api_get = "create";
        
        fetch(apiURLBase+api_get+`?thought=${input_text.value}`).then(r=>r.json())
        .then(json=>{
            //TODO change alert to something human
                alert(json.message);
            }).catch(e=>{
                console.log(e);
            })
            
        input_text.value = "";

        getAllThoughts();
    }

    function getAllThoughts(){
        const api_get = "list";

        fetch(apiURLBase+api_get).then(r=>r.json())
            .then(json=>{
                if(json.result==0){
                    data_list.innerHTML="";
                    let thoughts = json.data;
                    
                    if(order_select.value=="gradimento"){
                        thoughts.sort((a,b)=>{
                            return a.likes.lenght-b.likes.lenght;
                        });
                    }

                    for(let i = 0; i<thoughts.length; i++){

                        let thought = thoughts[i];
                        data_list.innerHTML+=item_template
                            .replaceAll("{{id}}",thought.id)
                            .replaceAll("{{thought}}",thought.thought);
                    }

                    let btns_del = document.querySelectorAll('.btn_del');
                    btns_del.forEach(btn=>{
                        btn.addEventListener('click',delElement);
                    });
                    
                    let btns_like = document.querySelectorAll('.btn_like');
                    btns_like.forEach(btn=>{
                        btn.addEventListener('click',likeThought);
                    });
                }
                else{
                    //TODO show error
                }
            });
    }

    window.addEventListener(
        'DOMContentLoaded', 
        function(event){
            data_list = document.getElementById("data-list");
            item_template = data_list.innerHTML;
            
            btn_add_thought = document.getElementById("btn_add_thought");
            btn_add_thought.addEventListener('click',addThought)
            
            input_text = document.getElementById("input_thought");

            order_select = document.getElementById("table_order_select");
            order_select.addEventListener("change", orderChange);

            data_list.innerHTML="";
            getAllThoughts();
    });
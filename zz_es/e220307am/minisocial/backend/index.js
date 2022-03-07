
console.log("minisocial started!");

const fs = require('fs');
const express = require('express');
const app = express();
const port = 10001;

// TODOs del minisocial
// 1. TODO fare un frontend che mostri sempre due cose: 
//      1 form di inserimento di un pensiero (1 testo) 
//        e una lista dei pensieri precedentemente inseriti (in ordine INVERSO di inserimento)
// 2. TODO fare un backend che implementi le seguenti operazioni:
// 3. TODO list (dei pensieri)
// 4. TODO create pensiero
// 5. TODO delete pensiero
// 6. TODO mostrare un gradimento (numero) del pensiero
// 7. TODO gestire l'aggiunta di un +1 al gradimento di un pensiero
// 8. TODO gestire un selettore di cambio ordinamento lista che consente di mostrare la list in due modi (ordine temporale INVERSO oppure GRADIMENTO DISCENDENTE)


app.use(express.static('static'));

// creo una rotta per la create song
// required params: title, author, composer
app.get('/create', (req, res) => {

    let robj = {
          "result":0,
          "message":"thought successfully created",
          "data":[]
      };
      
      try{
  
          if(typeof req.query.thought === 'undefined' || req.query.thought =='') throw('thought parameter required in GET');
  
          const d = new Date();
          let time = d.getTime();
  
          let s = fs.readFileSync('thought_data_db.json', 'utf8');

          let sobj = JSON.parse(s);
          let id = sobj.incremental_id++;

          sobj.data.push(
              {
                  id: id,
                  thought: req.query.thought,
                  likes:[]
              }
          );

          let new_s = JSON.stringify(sobj);
          fs.writeFileSync('thought_data_db.json', new_s, 'utf8');
          
      } catch(err){
          robj.result = 2000;
          robj.message = err.toString();
      }
      let s= JSON.stringify(robj);
      res.send(s);
  });
    
  // creo una rotta per la list songs
  // required params: (none)
  app.get('/list', (req, res) => {
  
      let robj = {
          "result":0,
          "message":"thought_data_db list successfully retrieved",
          "data":[]
      };
      
      try{
          let s = fs.readFileSync('thought_data_db.json', 'utf8');
          robj.data = JSON.parse(s).data;
          
      } catch(err){
          robj.result = 1000;
          robj.message = err.toString();
      }
      let s= JSON.stringify(robj);
      res.send(s);
  });
  
  // creo una rotta per la delete song
  // required params: id
  app.get('/delete', (req, res) => {
    
    let robj = {
        "result":0,
        "message":"thought successfully deleted",
        "data":[]
    };
    
    try{

        if(typeof req.query.id === 'undefined' || req.query.id =='') throw('id parameter required in GET');

        let s = fs.readFileSync('thought_data_db.json', 'utf8');
        let sobj = JSON.parse(s);
        let data = sobj.data;
        let found = false;
        for(li=0; li<data.length; li++){
            if(data[li].id == req.query.id){
                // trovato cancello ed esco
                data.splice(li,1);
                found = true;
                break;
            }
        }
        if(!found) throw('song to delete not found');

        sobj.data = data;
        let new_s = JSON.stringify(sobj);
        fs.writeFileSync('thought_data_db.json', new_s, 'utf8');
        
    } catch(err){
        robj.result = 3000;
        robj.message = err.toString();
    }
    let s= JSON.stringify(robj);
    res.send(s);
});

// creo una rotta per la edit song
// required params: id, title, author, composer
app.get('/like', (req, res) => {
  let robj = {
        "result":0,
        "message":"thought successfully liked",
        "data":[]
    };
    
    try{

        if(typeof req.query.tid === 'undefined' || req.query.tid =='') throw('thought id parameter required in GET');
        if(typeof req.query.uid === 'undefined' || req.query.uid =='') throw('user id parameter required in GET');

        let s = fs.readFileSync('thought_data_db.json', 'utf8');
        let fake_db = JSON.parse(s);
        let sobj = fake_db.data;
        let found = false;
        for(li=0; li<sobj.length; li++){
            if(sobj[li].id == req.query.tid){
                // trovato modifico ed esco
                let likes = sobj[li].likes;
                for(like_index=0; like_index<likes.length; like_index++)
                    if(likes[like_index].uid == req.query.uid)
                        throw(`likes already added by id:${req.query.uid} to post ${req.query.tid}`);   
                sobj[li].likes.push({uid:req.query.uid});
                found = true;                
                break;
            }
        }
        if(!found) throw('thought to like not found');

        fake_db.data = sobj;
        let new_s = JSON.stringify(fake_db);
        fs.writeFileSync('thought_data_db.json', new_s, 'utf8');
        
    } catch(err){
        robj.result = 4000;
        robj.message = err.toString();
    }
    let s= JSON.stringify(robj);
    res.send(s);
});

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

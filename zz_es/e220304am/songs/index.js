const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000;
const jsonDb = '\\stub\\songs.json';

// TODO creare un file JSON (copy of old stub) which would work as the song DB
// TODO implement the list using the JSON file itself (look how to send static files in express js)
// TODO implement 'create' which reads the JSON, adds an obj to the array, save it and reply like the stub
// TODO implement 'edit' read JSON, search and modify object, saves it and reply like the precedent
// TODO implement 'delete' read JSON, find and in case delete the object, saves it and reply

/*
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {

  res.send('Song API - welcome aboard - available routings: create, delete, edit, list')
})
*/

app.use(express.static('statico'));


function readFile(file_name){
    let file = fs.readFileSync(__dirname+file_name);
    return JSON.parse(file);
}

function writeFile(file_name, json){
    fs.writeFileSync(__dirname+file_name,JSON.stringify(json));
}

app.get('/list',(req,res)=>{
    res.send(readFile(jsonDb));
})

app.get('/create',(req,res)=>{
    //console.log(req);
    let newObj = req.query;
    if(newObj!=null){
        
        if( newObj.title!=null && newObj.author!=null && newObj.composer!=null )
        {
            let newSong = {};
            newSong['title'] = newObj.title;
            newSong['author'] = newObj.author;
            newSong['composer'] = newObj.composer;
            
            let json = readFile(jsonDb);
            newSong("id")= ++json.lastID;

            json.data.push(newSong);
            writeFile(json,jsonDb);
            res.send('create complete');
            return;
        }
    }
    res.send('create failed');
})

app.get('/delete',(req,res)=>{
    res.send('from delete');
})

app.get('/edit',(req,res)=>{
    res.send('from edit');
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
    //to use $ you must use ` (alt+96) and not ' 
    //console.log('Example app listening on port '+port);
})

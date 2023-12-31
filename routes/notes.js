const notes = require('express').Router();
const uuid = require('../helpers/uuid.js');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/utils.js')


notes.get('/', (req, res)=>{
    readFromFile('./db/db.json').then((data)=>res.json(JSON.parse(data)));
});

notes.post('/', (req, res)=>{
    const { title, text } = req.body;

    if (req.body){
        const newNote = {
            title,
            text,
            time: Date.now(),
            id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
        res.json("Note saved successfully.");
    } else{
        res.error("Unable to add note.");
    };
});

notes.delete('/:id', (req, res)=>{
    if(req.params.id){
        readAndDelete(req.params.id, './db/db.json');
        res.json("Note deleted successfully.")
    } else{
        res.error("Unable to delete note.")
    };     
});


module.exports = notes;
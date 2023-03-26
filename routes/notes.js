const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {

    const { title , text, } = req.body;

    if(req.body){
      const newNote ={
        title,
        text,
        id: uuidv4(),
      };

      readAndAppend(newNote, './db/db.json' );

      res.json('New note added!');
    } else {
      res.error('An error occured. No note added.');
    }
});

notes.delete('/:id', (req,res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data)) 
    .then((notes) => {
      console.log(res.json);
      let previousNotes = notes.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', previousNotes);
      res.json('Note deleted!');
    });

  });

module.exports = notes;
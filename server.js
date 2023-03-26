const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;

//declare middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);

app.use(express.static('public'));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});


//declare path to notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});





app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});
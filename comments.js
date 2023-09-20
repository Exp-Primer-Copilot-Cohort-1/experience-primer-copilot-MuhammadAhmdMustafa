//create web server
const express = require('express');
const app = express();
const port = 3000;

//load the comments module
const comments = require('./comments.js');

//load the body parser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load the CORS module
const cors = require('cors');
app.use(cors());

//set up the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//get all comments
app.get('/comments', (req, res) => {
    res.json(comments.getAll());
});

//get a specific comment
app.get('/comments/:id', (req, res) => {
    let comment = comments.getById(req.params.id);
    if (comment == null) {
        res.status(404).send('Comment not found');
    } else {
        res.json(comment);
    }
});

//create a comment
app.post('/comments', (req, res) => {
    let newComment = comments.add(req.body);
    res.json(newComment);
});

//update a comment
app.put('/comments/:id', (req, res) => {
    let comment = comments.getById(req.params.id);
    if (comment == null) {
        res.status(404).send('Comment not found');
    } else {
        comment = comments.update(req.params.id, req.body);
        res.json(comment);
    }
});

//delete a comment
app.delete('/comments/:id', (req, res) => {
    let comment = comments.getById(req.params.id);
    if (comment == null) {
        res.status(404).send('Comment not found');
    } else {
        comments.delete(req.params.id);
        res.json(comment);
    }
});

//delete all comments
app.delete('/comments', (req, res) => {
    comments.clear();
    res.send('All comments deleted');
});
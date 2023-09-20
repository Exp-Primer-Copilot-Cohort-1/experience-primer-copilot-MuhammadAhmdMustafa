//create web server
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to database
const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//connect to database
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

//create a new comment
app.post('/comments', (req, res) => {
    res.send('Create a new comment');
});

//get all comments
app.get('/comments', (req, res) => {
    res.send('Get all comments');
});

//get a comment by id
app.get('/comments/:id', (req, res) => {
    res.send('Get a comment by id');
});

//update a comment by id
app.put('/comments/:id', (req, res) => {
    res.send('Update a comment by id');
});

//delete a comment by id
app.delete('/comments/:id', (req, res) => {
    res.send('Delete a comment by id');
});

//listen on port 3000
app.listen(3000, () => console.log('Listening on port 3000...'));
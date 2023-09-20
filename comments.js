//create web server
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
//import mongoose
const mongoose = require('mongoose');
//import body-parser
const bodyParser = require('body-parser');

//import model
const Comment = require('./models/comment');

//connect to mongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

//configure express app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure express app to use router
app.use('/api', router);

//set the server to listen on port 8080
app.listen(8080, function () {
    console.log(`Server started on port 8080`);
});

//configure GET route to fetch all comments
router.get('/comments', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            res.send(err);
        } else {
            res.json(comments);
        }
    });
});

//configure POST route to add new comment
router.post('/comments')

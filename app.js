const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/toWatchDB');

let towatchSchema = {
    name: String
}; 

const film = mongoose.model('film', towatchSchema)

let toWatch = [];

app.get("/", function(req, res){

    film.find({}, function(err, docs){
        res.render('todo', {movie: docs});
    })
  
 
});

app.post("/", function(req, res){
    const newMovie = req.body.newItem;

    const movie1 = new  film ({
        name: newMovie
    });

    movie1.save();
    res.redirect("/");
});

app.post("/delete", function(req, res){
    const checked = req.body.checkbox;

    film.findByIdAndRemove(checked, function(err){
        console.log(err);
    });
    res.redirect("/");
});




app.listen(3000, function(){
    console.log("server is working");
})
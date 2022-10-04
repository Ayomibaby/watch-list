const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

let toWatch = [];

app.get("/", function(req, res){
    res.render('todo', {movie: toWatch});
   

 
});

app.post("/", function(req, res){
    const newMovie = req.body.newItem;

    toWatch.push(newMovie);

    res.redirect("/")
})






app.listen(3000, function(){
    console.log("server is working");
})
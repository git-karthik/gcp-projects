var xpress = require('express');
console.log("Loaded Express Module");
const port = 3000;

var app = xpress();

app.get('/', function(req, res){
    res.render('index.ejs',{title: 'Hello World!!!'});
});

app.get('/about', function(req, res){
    res.render('layout.ejs',{title: 'About Us', body:'<h1>About Us</h1>'});
});

app.get('/*', function(req, res){
    res.status(404).render('error.ejs',{title: 'Error Page'});
});

app.listen(port, ()=>{
    console.log('Server started on port:'+port);
});

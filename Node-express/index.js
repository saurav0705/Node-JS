const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const host = 'localhost';
const port = 8000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
});


//this is for normal rest api
app.get('/dishes',(req,res,next) => {
    res.end("Here get method is invoked from the server. get method is working fine.");
});

app.post('/dishes',(req,res,next) => {
    res.statusCode = 201;
    res.end(`Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user.`);
});

app.put('/dishes',(req,res,next) => {
    res.statusCode = 403;
    res.end("Here PUT method is invoked from the server. PUT method is working fine.");
});

app.delete('/dishes',(req,res,next) => {
    res.statusCode = 678;
    res.end("Here DELETE method is invoked from the server. DELETE method is working fine.");
});

//this is for dishid rest api
app.get('/dishes/:dishId',(req,res,next) => {
    res.end("Here get method is invoked from the server. get method is working fine. Dish ID is :: "+req.params.dishId);
});

app.post('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 201;
    res.end(`Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user. Dish ID is :: ${req.params.dishId}`);
});

app.put('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 403;
    res.end("Here PUT method is invoked from the server. PUT method is working fine. Dish ID is :: "+req.params.dishId);
});

app.delete('/dishes/:dishId',(req,res,next) => {
    res.statusCode = 678;
    res.end("Here DELETE method is invoked from the server. DELETE method is working fine. Dish ID is :: "+req.params.dishId);
});




app.use(express.static(__dirname+"/public"));

app.use(
(req,res,next) => {
    res.statusCode =200;
    res.setHeader('Content-type','text/html');
    res.end("<h1>this is an express server.</h1>");
}
);

const server = http.createServer(app);
server.listen(port,host,() => {
    console.log(`server is up and running on http://${host}:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Here get method is invoked from the server. get method is working fine.");
})
.post((req,res,next) => {
    res.statusCode = 201;
    res.end(`Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user.`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Here PUT method is invoked from the server. PUT method is working fine.");
})
.delete((req,res,next) => {
    res.statusCode = 678;
    res.end("Here DELETE method is invoked from the server. DELETE method is working fine.");
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Here get method is invoked from the server. get method is working fine. Dish ID is :: "+req.params.dishId);
})
.post((req,res,next) => {
    res.statusCode = 201;
    res.end(`Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user. Dish ID is :: ${req.params.dishId}`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Here PUT method is invoked from the server. PUT method is working fine. Dish ID is :: "+req.params.dishId);
})
.delete((req,res,next) => {
    res.statusCode = 678;
    res.end("Here DELETE method is invoked from the server. DELETE method is working fine. Dish ID is :: "+req.params.dishId);
});


module.exports = dishRouter;
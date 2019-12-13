const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Promo :: Here get method is invoked from the server. get method is working fine.");
})
.post((req,res,next) => {
    res.statusCode = 201;
    res.end(`Promo :: Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user.`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Promo :: Here PUT method is invoked from the server. PUT method is working fine.");
})
.delete((req,res,next) => {
    res.statusCode = 678;
    res.end("Promo :: Here DELETE method is invoked from the server. DELETE method is working fine.");
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end("Promo ID:: Here get method is invoked from the server. get method is working fine. promo ID is :: "+req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode = 201;
    res.end(`Promo ID:: Here post method is invoked from the server. post method is working fine. ${req.body} is the data in the post method that is sent by the user. Dish ID is :: ${req.params.promoId}`);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("Promo ID:: Here PUT method is invoked from the server. PUT method is working fine. Promo ID is :: "+req.params.promoId);
})
.delete((req,res,next) => {
    res.statusCode = 678;
    res.end("Promo ID:: Here DELETE method is invoked from the server. DELETE method is working fine. Promo ID is :: "+req.params.promoId);
});


module.exports = promoRouter;
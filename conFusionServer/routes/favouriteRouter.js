const express = require('express');
const bodyParser = require('body-parser');
const Favourites = require('../node_models/favourites');
var authenticate = require('../authenticate');

const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());


favouriteRouter.route('/')
.all(authenticate.verifyUser,(req,res,next)=>{
    next();
    
})
.get((req,res,next)=>{
    Favourites.find({user:req.user._id})
    .populate('dishes')
    .populate('user')
    .then((favourites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favourites);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    Favourites.findOne({user:req.user._id})
    .then((favourite)=>{
        //console.log(favourite);
        if(favourite=== null)
        {
            console.log("inside if.............");
            Favourites.create({
                user:req.user._id,
                dishes : req.body.dishes
            })
            .then((favourites)=>{
                console.log("added successfully");
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourites);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else{
            console.log("inside else.............");
            console.log("type .........",typeof(favourite.dishes));
            for(let i=0;i<req.body.dishes.length;i++)
            {
            favourite.dishes.push(req.body.dishes[i]);
                }
            favourite.save()
            .then((favourite)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourite);
            },(err)=>next(err))
            .catch((err)=>next(err));

        }
    })
})
.delete((req,res,next)=>{
    Favourites.findOneAndRemove({user:req.user._id})
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status:"ok", message:"successfully deleted"});
    },(err) => next(err))
    .catch((err) => next(err));
});

favouriteRouter.route('/:dishId')
.post(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({user:req.user._id})
    .then((favourite)=>{
        //console.log(favourite);
        if(favourite=== null)
        {
            console.log("inside if.............");
            Favourites.create({
                user:req.user._id,
                dishes : [req.params.dishId]
            })
            .then((favourites)=>{
                console.log("added successfully");
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourites);
            },(err)=>next(err))
            .catch((err)=>next(err));
        }
        else{
            console.log("inside else.............");
            console.log("type .........",typeof(favourite.dishes));
            favourite.dishes.push(req.params.dishId);
                
            favourite.save()
            .then((favourite)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourite);
            },(err)=>next(err))
            .catch((err)=>next(err));

        }
    })
});
module.exports = favouriteRouter;
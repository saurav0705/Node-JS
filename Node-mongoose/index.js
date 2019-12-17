const mongoose = require('mongoose');
const Dish = require('./node_models/dishes');
const url = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected to server.................");
    Dish.create({
        name:"pasta & red sauce",
        description:"this is an italian dish"
    })
    .then((dish) =>{
        console.log("dish added to db is ",dish);
        return Dish.findByIdAndUpdate(dish._id,{
            $set : { description : "this is pasta with red sauce"}
        },{ new :true});
    })
    .then((dish) => {
        console.log("dishes in the db is ",dish);
        dish.comments.push({
            rating:3.5,
            comment:"this is just ok",
            author :"Rahul"
        });
        return dish.save();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
    
})
.catch((err) =>{
    console.log("error connecting to server..... ",err);
});


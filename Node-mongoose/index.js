const mongoose = require('mongoose');
const Dish = require('./node_models/dishes');
const url = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected to server.................");
    var newDish = Dish({
        name:"pasta",
        description:"this is an italian dish"
    });

    newDish.save()
    .then((dish) =>{
        console.log("dish added to db is ",dish);
        return Dish.find({});
    })
    .then((dish) => {
        console.log("dishes in the db is ",dish);
        return Dish.remove({});
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


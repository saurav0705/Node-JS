const mongoose = require('mongoose');
const schema = mongoose.Schema;

const favouriteSchema = new schema({
     user:{
         type: mongoose.Schema.Types.ObjectId,
         ref : 'User'
     },
     dishes : [ {
         type:mongoose.Schema.Types.ObjectId,
         ref : 'Dish'
     }]
},{ timestamps:true }
);
var favourite =  mongoose.model("Favourite",favouriteSchema);
module.exports = favourite; 
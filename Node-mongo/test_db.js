
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }else{
   console.log('Connected...');
   const collection = client.db("users").collection("userData");
   console.log(collection);
   // perform actions on the coullection object
   client.close();}
});
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');


const url = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "nodeJS_DB";
const collection = "nodeJS_collection";
//const client = new MongoClient(url, { useNewUrlParser: true });
MongoClient.connect(url).then((client) => {
        
        console.log("Connecting to the server >>>>>>>>>>>>>");
        const db = client.db(dbName);

        

        dboper.insertDocument(db,{"name":"test1","description":"test1 description...."},collection)
        .then((result) =>{
            console.log("",result.ops);
        

            return dboper.updateDocument(db,{"name":"test1"},{"description":"updated......."},collection)
                .then((result) =>{
                    console.log("Updating documents ::::::: ",result.result);

                    return  dboper.findDocuments(db,collection)
                    .then((result) => {
                        console.log("Finding docs :::::::::: ",result);

                        return  db.dropCollection(collection)
                        .then((result) => {
                            console.log("dropped the whole collection ",result);

                            return  client.close();
                        });                        
                     });                    
                });

            }).catch((err) =>{console.log(err);});
             
}).catch((err) => { console.log("error connecting to the client ::: "+err)});
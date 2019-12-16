const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "NodeJS_testDB";
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect((err,client) => {
        assert.equal(err,null);
        console.log("Connected>>>>>>>>>>>>>");
        const db = client.db(dbName);
        const collection = db.collection("Nodejs_testCollection");
        collection.insert({"name":"test1","password":"test1_password"},(err,result) =>
        {
            assert.equal(err,null);
            console.log("successfully inserted data.");

            collection.find({}).toArray((err,allData) =>
            {
                assert.equal(err,null);
                console.log("data of the collection is:: \n",allData);
                db.dropCollection("Nodejs_testCollection", (err, result) => {
                    assert.equal(err,null);
                    console.log("deleted all data");
                    client.close();
                });
            });
        });

});
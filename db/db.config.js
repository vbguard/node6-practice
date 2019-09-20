const MongoClient = require('mongodb').MongoClient;

const { mongodb_URI } = require('../config');

const client = new MongoClient(mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  collection.insertOne({ bala: "bla bla bal", counter: 1, products: [] }, (err, result) => {
      if (err) console.log(err);
      if (result) console.log("insertOne: ", result);
  });

  collection.insertMany([{bala: "bla bla bal", counter: 1 }, { bala: "bla bla bal", counter: 2 }], (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
});

  collection.find({}, (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
});

  collection.findOne({}, (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
});

  collection.updateMany({ counter: 1 }, { $push: { products: "add element in array" } }, (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
  });
  
  collection.updateOne({ counter: 2 }, { $set: { bala: "New Text" } }, (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
  });
  collection.update({ _id: ObjectId("5d838e74f1c0a8bc4c620426") }, { $set: { name: "NewText" } }, (err, result) => {
    if (err) console.log(err);
    if (result) console.log("insertOne: ", result);
  });

  client.close();
});

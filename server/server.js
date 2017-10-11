import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
const MongoClient = require('mongodb').MongoClient
import assert from 'assert';
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); //dotenv used so I can hide password and username in .env which is in .gitignore
let url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds113445.mlab.com:13445/family`;
let port = process.env.PORT || 3000;
let parseUrlencoded = bodyParser.urlencoded({ extended: false});

app.use(logger('combined'));
app.use(express.static(path.join(__dirname, '..', 'dist')));

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  let collection = db.collection('member');
  console.log("Connected successfully to mongodb server");
  app.route('/family').get(function(request, response){
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      response.json(docs);
    });
  }).post(parseUrlencoded, function(request,response){
    let newMember = request.body;
    collection.insertOne(newMember);
    collection.find({name:newMember.name}).toArray(function(err, doc) {
      assert.equal(err, null);
      response.status(201).json(doc);
    })


  });
  app.delete('/family/:id', function(req, res){
    collection.deleteOne({"_id": ObjectId(req.params.id)});
    res.send(req.params.id +" deleted");
  });
  });

app.listen(port, () => {
  console.log('express server listening on port ' + port);
});

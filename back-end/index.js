//[HEAD0]imports / essential global variables-------------------
const express = require('express')
const fs = require("fs")
const { MongoClient,ObjectID } = require("mongodb");
const app = express()
const port = 3001
app.use(express.json())   //parse request body as JSON
app.use(express.urlencoded({extended: true}))

//[HEAD1] watson speech to text api-----------------------------
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { exit } = require('process');
const { response } = require('express');
const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: "KgEBjyakPycAhGOkFuKJXudV3wrAFdPFVFHKCWoPtDyS",
    }),
    serviceUrl: "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/c61d30d0-848b-4d6c-8b7c-d5a8c58ecb0d",
  });

//[HEAD2] mangodb connection------------------------------------
const uri = "mongodb://localhost:27017/?poolSize=20&writeConcern=majority&useUnifiedTopology=true";



//[MAIN0] main code----------------------------------------------
app.listen(port, () => {
  console.log(`Backend server AUDIO to TEXT 🎵 at http://localhost:${port}`)
})

app.post('/api/verifytoken', (req,res) =>{
  //this code gonna change later on when a real method of generating token is istablished (wich is not for now)
  if(req.body.token){
    const clientlog = new MongoClient(uri);
    clientlog.connect((err) => {
      const collection = clientlog.db('audiotext').collection('users');
      let query = { _id:  new ObjectID(req.body.token)};
      // perform actions on the collection object
      collection.find(query).toArray( (err,resultat)=>{
          if (err) throw err;
          if(resultat.length == 0){
              //bad token
              clientlog.close();
              res.sendStatus(403)
          }else if(resultat.length == 1 && resultat[0]._id == req.body.token){
              //found token
              clientlog.close();
              res.sendStatus(200)
          }else{
              //what ?! something went bad very badly
              clientlog.close();
              res.sendStatus(500)
          }
      });
    }); 
  }else{
    res.sendStatus(400)
  }

})

app.post('/api/login', (req,res) =>{
      //simple connection no encryption
      if(req.body.username && req.body.password){
        const clientlog = new MongoClient(uri);
        clientlog.connect((err) => {  //connecting to mangodb
          const collection = clientlog.db('audiotext').collection('users');
          let query = { username: req.body.username,password: req.body.password};
          // perform actions on the collection object
          collection.find(query).toArray( (err,resultat)=>{
              if (err) throw err;
              
              if(resultat.length == 0){
                  //bad password / username
                  res.sendStatus(403)
              }else if(resultat.length == 1){
                  //found username
                  res.send(JSON.stringify({token:resultat[0]._id}))
              }else{
                  //what something went bad very badly
                  res.sendStatus(500)
              }
              clientlog.close();
          });
        });
      }else{
        res.sendStatus(400)
      }
})



//[TRASH]
/*
app.get('/', (req, res) => {
    const params = {
        objectMode: true,
        contentType: 'audio/flac',
        model: 'en-US_BroadbandModel',
        keywords: [],
        maxAlternatives: 3,
      };
    const recognizeStream = speechToText.recognizeUsingWebSocket(params);
    fs.createReadStream('./audio/Recording.flac').pipe(recognizeStream);
    recognizeStream.on('data', function(event)  { res.send(JSON.stringify(event, null, 2)); });
  })


  const clientlog = new MongoClient(uri);
    
    clientlog.connect((err) => {
      const collection = clientlog.db('audiotext').collection('users');
      let query = { _id:req.body.token};
      // perform actions on the collection object
      collection.find(query).toArray( (err,resultat)=>{
          if (err) throw err;
          
          if(resultat.length == 0){
              //bad token
              res.sendStatus(403)
          }else if(resultat.length == 1){
              //found token
              res.send(200)
          }else{
              //what something went bad very badly
              res.sendStatus(500)
          }
          clientlog.close();
      });
    });
*/
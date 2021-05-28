//[HEAD0]imports / essential global variables-------------------
const express = require('express')
const nodemailer = require('nodemailer')
const fs = require("fs")
const { MongoClient,ObjectID } = require("mongodb");
const fileUpload = require('express-fileupload');
const app = express()
const port = 3001
app.use(express.json())   //parse request body as JSON
app.use(fileUpload());
app.use(express.urlencoded({extended: true}))

//[HEAD1] watson speech to text api-----------------------------
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { exit, nextTick } = require('process');
const { response } = require('express');
const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: "KgEBjyakPycAhGOkFuKJXudV3wrAFdPFVFHKCWoPtDyS",
    }),
    serviceUrl: "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/c61d30d0-848b-4d6c-8b7c-d5a8c58ecb0d",
  });

//[HEAD2] mangodb connection------------------------------------
const uri = "mongodb://localhost:27017/?poolSize=20&writeConcern=majority&useUnifiedTopology=true";
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'cullen59@ethereal.email',
      pass: 'RU65EFmqfV7kmx85eX'
  }
});


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
      try{
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
      }catch(e){
        res.sendStatus(400)
        return;
      }
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

app.post('/api/signup', (req,res)=>{
  if(req.body.username,req.body.password,req.body.email){
    const clientlog = new MongoClient(uri);
    let query = { username: req.body.username,password: req.body.password,email:req.body.email};
    clientlog.connect((err) => {  //connecting to mangodb
      const collection = clientlog.db('audiotext').collection('users_tmp');
      
      // perform actions on the collection object
      collection.insertOne(query,function(err,res){
        if (err) throw err;
      })
      var mailOptions = {
        from: 'cullen59@ethereal.email',
        to: 'sintexte@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        html: '<h1>test</h1>'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    });

    res.sendStatus(200);  
  }
})

app.post('/api/upload', (req,res)=>{
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded. :p');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/audio/' + sampleFile.name;

    // Use the mv() method to place the file somewhere on the server
    sampleFile.mv(uploadPath, function(err) {
    if (err) return res.status(500).send(err);
          const params = {
            objectMode: true,
            contentType: 'audio/mpeg',
            model: 'en-US_NarrowbandModel',
            keywords: [],
            maxAlternatives: 1,
          };

          const recognizeStream = speechToText.recognizeUsingWebSocket(params);
          fs.createReadStream('./audio/'+sampleFile.name).pipe(recognizeStream)
          recognizeStream.on('data', function(event)  { 
            res.send(JSON.stringify(event, null, 2)); 
          })

    });
})

//[TRASH]
/*

Allowable values: 
https://cloud.ibm.com/docs/speech-to-text?topic=speech-to-text-models#models
[ar-MS_BroadbandModel, ar-MS_Telephony, de-DE_BroadbandModel, de-DE_NarrowbandModel, de-DE_Telephony, en-AU_BroadbandModel, en-AU_NarrowbandModel, en-AU_Telephony, en-GB_BroadbandModel, en-GB_NarrowbandModel, en-GB_Telephony, en-US_BroadbandModel, en-US_Multimedia, en-US_NarrowbandModel, en-US_ShortForm_NarrowbandModel, en-US_Telephony, es-AR_BroadbandModel, es-AR_NarrowbandModel, es-ES_BroadbandModel, es-ES_NarrowbandModel, es-ES_Telephony, es-CL_BroadbandModel, es-CL_NarrowbandModel, es-CO_BroadbandModel, es-CO_NarrowbandModel, es-MX_BroadbandModel, es-MX_NarrowbandModel, es-PE_BroadbandModel, es-PE_NarrowbandModel, fr-CA_BroadbandModel, fr-CA_NarrowbandModel, fr-CA_Telephony, fr-FR_BroadbandModel, fr-FR_NarrowbandModel, fr-FR_Telephony, it-IT_BroadbandModel, it-IT_NarrowbandModel, it-IT_Telephony, ja-JP_BroadbandModel, ja-JP_NarrowbandModel, ko-KR_BroadbandModel, ko-KR_NarrowbandModel, nl-NL_BroadbandModel, nl-NL_NarrowbandModel, pt-BR_BroadbandModel, pt-BR_NarrowbandModel, pt-BR_Telephony, zh-CN_BroadbandModel, zh-CN_NarrowbandModel] 



app.get('/', (req, res) => {
    
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
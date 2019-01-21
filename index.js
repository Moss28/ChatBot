const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT||5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.send({status: 'ok'});
   });

app.post('/webhook',(req,res) =>{
    let body = req.body;
    let event = body.event[0];
    let source = event.source;
    let message = event.message;
    console.log(`body ===> `);
    console.log(body);
    console.log(`source ===> `);
    console.log(source);
    console.log(`message ===> `);
    console.log(message);
    let respon = {
        status : 'ok',
        body : body

    }
console.log('Body ====>');
console.log(body)


   res.send(respon);
});

app.listen(port,() =>{
 console.log(`listen on port ${port}`)
});
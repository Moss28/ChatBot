const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT||5000
const line = require('@line/bot-sdk');

const client = new line.Client({
    channelAccessToken: 'ANOX1QMOTFBIbkZJfyAd/seoFWVhEhtOwzgiqi3HZkmoJSzyTTyl2darpUtsVKZj+Ytm1FjWviHZHFmGQ26Ue/Ar3PNsFVFn3D/AG9p+8exS5I633TiLLhEbdcWpxG8tB5Dj3w6ZOK7gHchYTHsuVAdB04t89/1O/w1cDnyilFU='
  });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.send({status: 'ok'});
   });

app.post('/webhook',(req,res) =>{
    let body = req.body;
    let events = body.events[0];
    let source = events.source;
    let message = events.message;
    let type = events.type;
    let type = events.replyToken;
    console.log(`body ===> `);
    console.log(body); 
    console.log(`source ===> `);
    console.log(source);
    console.log(`message ===> `);
    console.log(message);
    console.log(`type ===> `);
    console.log(type);
    console.log(`replyToken ===> `);
    console.log(replyToken);

switch(type){
    case 'message':
    
    let type = message.type;
    console.log(`[message type] ===> ${type}`);
    let id = message.id;
        if(type =='text'){
            let text = message.text;
            const message = [
            {
                type: 'text',
                text: 'Moss สวัสดีครับ'
            },
            {
                type: 'sticker',
                stickerId: '2',
                packageId: '1'
            }
        
        ];
            
           replyMessage(replyToken, message)
            }

        else if(type =='sticker'){
            let stickerId = message.stickerId;
            let packageId = message.packageId;

        }

    break;
    case 'follow':
    break;
    case 'unfollow':
    break;
    case 'join':
    break;
    case 'leave':
    break;
    default:
    break;
}






    let respon = {
        status : 'ok',
        body : body

    }

   res.send(respon);
});


//Method


const replyMessage = (replyToken, message)=>{
    console.log(` ===> [replyMessage]`);
    console.log(` ===> replyToken: ${replyToken}`);
    console.log(`message ===> `);
    console.log(message);

    client.replyMessage (replyToken, message)
        .then(() => {
            console.log('replyMessage is successfully!');
        })
        .catch((err) => {
          console.log(err);
        });
    }

app.listen(port,() =>{
 console.log(`listen on port ${port}`)
});
const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const line = require('@line/bot-sdk');
const mysql = require('mysql');
const conn = mysql.createConnection({
   host: 'localhost',
    user : 'root',
    password :'',
    database : 'linebot'
})
const port = process.env.PORT||5000


const client = new line.Client({
    channelAccessToken: 'ANOX1QMOTFBIbkZJfyAd/seoFWVhEhtOwzgiqi3HZkmoJSzyTTyl2darpUtsVKZj+Ytm1FjWviHZHFmGQ26Ue/Ar3PNsFVFn3D/AG9p+8exS5I633TiLLhEbdcWpxG8tB5Dj3w6ZOK7gHchYTHsuVAdB04t89/1O/w1cDnyilFU='
  });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.send({status: 'ok'});
    conn.connect((err) =>{
        if(err) throw err;
            
        })
       let query =  conn.query(`select * from reply where reqdata = ${text}`,(error,result) =>{
        if(error) throw console.error();
       else {console.log('connect database');}
        })
       
        console.log(query.sql)
        conn.end();
   });

app.post('/webhook',(req,res) =>{
    let body = req.body;
    let events = body.events[0];
    let source = events.source;
    let message = events.message;
    let type = events.type;
    let replyToken = events.replyToken;
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
            const messageResponse = [
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
            
           replyMessage(replyToken, messageResponse)
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
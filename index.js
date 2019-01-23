const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const line = require('@line/bot-sdk');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
//connect URL
const dbUrl = 'mongodb://user02:user02@ds157834.mlab.com:57834/smartqr';
//Database Name
const dbName = 'smartqr';

const port = process.env.PORT||5000


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
    let text = events.text;
  
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
    let text = message.text;
    console.log(`[text] ===> ${text}`);
    let id = message.id;
        if(type =='text'){
            var messagedata = text.split(" ");
            let key = messagedata[0];
            var data = messagedata[1];

            if (key=='img'){
                key = 'imgUrl';
            }
                console.log(`key ===> `);
                console.log(key);
                console.log(`data ===> `);
                console.log(data);
          
            MongoClient.connect(dbUrl,(err,client)=>{
                assert.equal(null,err);
                var db = client.db(dbName)
                const collection = db.collection('users');
                collection.find({name: data}).toArray((err,result)=>{
                    if(err) throw err
                    console.log("Connected successfully to server");
             switch(key){
                 case 'name':
                                var result =result[0].name;
                                console.log(`result ===> `);
                                console.log(result);
                                const messageResponse = [
                                { 
                        
                                        type: 'text',
                                        text:  result + ' คือใคร? '
                        
                                }
                                ];
                                replyMessage(replyToken, messageResponse)
                 break;
                 case 'age':
                                var result1 =result[0].name;
                                var result2 =result[0].age;
                                console.log(`result ===> `);
                                console.log(result1);
                                const messageResponseage = [
                                { 
                        
                                        type: 'text',
                                        text:  result1 + ' are ' + result2 + ' years old. '
                        
                                }
                                ];
                                replyMessage(replyToken, messageResponseage)

                 break;
                 case 'facebook':
                                var result1 =result[0].name;
                                var result2 =result[0].facebook;
                                console.log(`result ===> `);
                                console.log(result1);
                                const messageResponsefacebook = [
                                { 
                        
                                        type: 'text',
                                        text: 'Facebook is '  + result1 + ' are ' + result2 
                        
                                }
                                ];
                                replyMessage(replyToken, messageResponsefacebook)

                 break;
                 case 'imgUrl':
                                var result1 =result[0].name;
                                var result2 =result[0].imgUrl;
                                console.log(`result ===> `);
                                console.log(result1);
                                const messageResponseimg = [
                                { 
                                    "type": "image",
                                    "originalContentUrl": result2 ,
                                    "previewImageUrl": result2
                        
                                }
                                ];
                                replyMessage(replyToken, messageResponseimg)

                break;
                case 'help':
                const messageResponsehelp = [
                    { 
                        type: 'text \nท่านสามารถใช้คำสั่ง เหล่านี้ได้ \n- name <name> \n- facebook <name> \n- img <name> \n- age <name> '
                    
                    }
                 
                    ];
                    replyMessage(replyToken, messageResponsehelp)
                break;
                 default:
                 const messageResponsehelp2 = [
                    { 
                        type: 'text',
                        text: 'ท่านใช้คำสั่งไม่ถูกต้องกรุณากด help เพื่อขอความช่วยเหลือ'
                    }
                    ];
                    replyMessage(replyToken, messageResponsehelp2)

                 break;

                }
               
                })
            })

           
        
            
           
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
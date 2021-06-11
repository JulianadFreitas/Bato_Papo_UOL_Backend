import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
let participants = [];
let messagesInfos =[];
let dataMessage = {};

app.post("/participants", (req, res)=> { try{
    const userName = req.body;

        const participant = {
        name: userName.name, 
        lastStatus: Date.now()
        }
    
    if(!participants.some(({name}) => name === participant.name)) {
     participants.push(participant);

     messagesInfos.push(
        {from: participant.name,
         to: 'Todos',
         text: 'entra na sala...',
         type: 'status',
         time: dayjs().format('HH:mm:ss')}
     );  
     console.log("oii");
     return res.sendStatus(200);
    } res.sendStatus(400);
    
   
    //deixar do status de send
}catch(e){console.log(e)}
}); 


app.get("/participants", (req, res)=> {
const headerOfParticipants = req.headers; 
console.log("participantes");

res.send(headerOfParticipants.user);

}); 

app.post("/messages", (req, res)=> {
    const headerOfMessages = req.headers;
    const userMessages = req.body;
    dataMessage = {
      from: headerOfMessages.user,
      to: userMessages.to,
      text: userMessages.text,
      type: userMessages.type, 
      time: dayjs().format('HH:mm:ss')
    }; 
const participant = participants.find((e) => e.name === dataMessage.from);
    if ((participant) && (dataMessage.to !== "") && (dataMessage.type === "message" || "private_message")){
    //&& (dataMessage.to !== "") && (type === ("message" || "private_message"))
    
    messagesInfos.push(dataMessage);
    console.log(dataMessage);

    return  res.sendStatus(200)
    } else res.sendStatus(400)
console.log("tecsted");
console.log(dataMessage);
console.log(dayjs().format('HH:MM:SS'));
}); 

app.get("/messages", (req, res)=> {
    const limit =  req.query.limit;
    limit? res.send(messagesInfos.slice(-limit)) : res.send(messagesInfos);
    console.log("limit",limit,messagesInfos.slice(-limit));
}); 

app.post("/status", (req, res)=> {
    const user = req.header('User');
    const participant = participants.find((e, i) => e.name === user);
    console.log(user);
    participant ? participant.lastStatus = Date.now() &&  res.sendStatus(200) : res.sendStatus(400) ;
}); 




setInterval(() => {

  participants = participants.filter(element => {
      if ((Date.now() - element.lastStatus) < 10000) {
          return true
      }
         else {
            messagesInfos.push({from: element.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: dayjs().format('HH:mm:ss')})
             return false
         }    
     })
   
}, 15000)


app.listen(4000, () => {
    console.log("rodanfdo");
    console.log(participants)
});

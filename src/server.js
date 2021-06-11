import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());

let participants = [];
let messagesInfos =[];
//{from: 'João', to: 'Todos', text: 'oi galera', type: 'message', time: '20:04:37'} message format


app.post("/participants", (req, res)=> {
    const userName = req.body;

    app.use(function (res) {
        if(userName === "") { 
            res.status(400).send('CHECK YOUR NAME');
            return
             }
      })
    // if(userName === "") { 
    //    res.status(400).send('CHECK YOUR NAME');
    //    return
    //     }
        const participant = {
        name: userName.name, 
        lastStatus: Date.now()
        }

    participants.push(participant);
//const jsonP = JSON.pars(participants))
console.log("oii");
JSON.stringify(participants);
res.json(JSON.stringify(participants));

}); 


app.get("/participants", (req, res)=> {
const headerOfParticipants = req.headers; 
console.log("participantes");

res.send(headerOfParticipants.user);

}); 


app.post("/messages", (req, res)=> {
    const headerOfMessages = req.headers;
    const userMessages = req.body;
    const dataMessage = {
      from: headerOfMessages.user,
      to: userMessages.to,
      text: userMessages.text,
      type: userMessages.type, 
     // time: 
    };

//JSON.stringify(participants);
console.log("teste")
res.send(dataMessage);
}); 

app.listen(4000, () => {
    console.log("rodandol");
    console.log(participants)
});

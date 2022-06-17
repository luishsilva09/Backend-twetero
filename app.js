import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

let usuarios = []
let tweet = []
let tweets = []

app.post('/sign-up',(request,response) =>{
    if(request.body.username.trim() === '' || request.body.avatar.trim() === ''){
        response.status(400).send('Todos os campos são obrigatórios!')  
    }else{
        usuarios.push(request.body)
        response.status(201).send("OK")
    } 
})

app.post('/tweets',(request, response) =>{
    if(request.body.username === '' || request.body.tweet.trim() === ''){
        response.status(400).send('Todos os campos são obrigatórios!') 
    }else{
        tweet.push(request.body)
        let usuarioAtual = usuarios.find(avatarAtual => avatarAtual.username === request.headers.user)
        tweets.unshift({
            username: request.headers.user,
            avatar: usuarioAtual.avatar,
            tweet: request.body.tweet
        })
        response.status(201).send("OK")
    }
   
})
app.get('/tweets', (request,response) =>{
    if(tweets.length > 10){
        tweets.length = 10
    }
    response.send(tweets)
})
app.listen(5000)
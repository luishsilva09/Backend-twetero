import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

let usuario = []
let tweet = []
let tweets = []

app.post('/sign-up',(request,response) =>{
    usuario.push(request.body)
    response.send("OK")
})

app.post('/tweets',(request, response) =>{
    tweet.push(request.body)
    let usuarioAtual = usuario.find(avatarAtual => avatarAtual.username === request.body.username)
    tweets.unshift({
        username: request.body.username,
        avatar: usuarioAtual.avatar,
        tweet: request.body.tweet
    })
    response.send("OK")
})
app.get('/tweets', (request,response) =>{
    if(tweets.length > 10){
        tweets.length = 10
    }
    response.send(tweets)
})
app.listen(5000)
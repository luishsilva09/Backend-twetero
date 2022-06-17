import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());

let usuarios = []
let tweet = []
let tweets = [
    {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "10"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "9"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "8"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "7"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "6"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "5"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "4"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "3"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "2"
      },
      {
        "username": "luis",
        "avatar": "https://sm.ign.com/ign_br/screenshot/default/naruto-shippuden_f134.png",
        "tweet": "1"
      }
]

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
    let page = parseInt(request.query.page)
    let atualizaTweets =[]
    if(page === 1 ){
        for(let i  = 0; i < 10 ; i++){
            atualizaTweets.push(tweets[i])  
        }
        response.send(atualizaTweets)
    }
    if(page > 1){
      atualizaTweets = []
        for(let i = (page*10-10); i < page*10;i++){
            if(tweets[i] == null ){
                break
            }
            atualizaTweets.push(tweets[i])
        }
        response.send(atualizaTweets) 
    }  
    
})
app.listen(5000)
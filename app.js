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
    if(page < 1){
      response.status(400).send('Informe uma página válida!')
    }
})
app.get('/tweets/:username',(request,response) => {
  let user = request.params.username
  let tweetUser = tweets.filter(e => e.username === user)
  response.send(tweetUser)
})
app.listen(5000)
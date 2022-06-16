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

app.listen(5000)
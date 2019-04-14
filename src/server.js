const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


app.use(cors())

io.on('connection', socket =>{
    socket.on('connectRoom', box=>{
        socket.join(box)
    })
})


mongoose.connect(
    'mongodb+srv://week6:week6@cluster0-dvqp5.mongodb.net/week6?retryWrites=true',
    {
    useNewUrlParser: true
    })

app.use((req, res, next) =>{
    req.io = io

    return next()
})

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))// Criado para envio de arquivos

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
// Caminho do arquivo

app.use(require('./routes'))

server.listen(process.env.PORT || 3333)
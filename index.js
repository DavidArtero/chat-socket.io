//npm run dev -> start with nodemon

const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//start the server
const server = app.listen(app.get('port'),()=>{
    console.log("server on port", app.get('port'));
});

const SocketIO= require('socket.io');
const { isObject } = require('util');

const io = SocketIO(server);

//websockets
io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data); //emitir a todos
    });

    socket.on('chat:typing', (data)=>{
        console.log(data);
        socket.broadcast.emit('chat:typing', data);
    });

});



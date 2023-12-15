const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');  // Cambiado de 'node:http' a 'http'
const { Server } = require('socket.io');  // Asegurarse de importar 'Server' desde 'socket.io'

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);  // Crear el servidor con http
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(logger('dev'));
app.use(cors());  // Habilitar CORS

io.on('connection', (socket) => {
    console.log('User connected');

    // Aquí puedes manejar eventos del socket
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat_message', (msg) => {
        console.log(msg);
        io.emit('chat_message', msg);  // Enviar mensaje a todos los clientes conectados
    });
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

import { Server } from 'socket.io';


// Array to store messages
let messages = [
    { id: 1, author: 'Juan', text: '¡Hola! ¿Que tal?' },
    { id: 2, author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
    { id: 3, author: 'Ana', text: '¡Genial!' }
];



export const socketService = (server) => {
    // Create a new instance of socket.io by passing the server(app)
    const io = new Server(server);
    // Listen for new connections
    io.on('connection', (socket) => {
        // Print a message when a new user connects
        console.log('New connection', socket.id);
        // Send the messages to the client
        socket.emit('messages', messages);
        // Listen for new messages and broadcast them to all users
        socket.on('new-message', (data) => {
            const message = { id: messages.length + 1, ...data };
            console.log(message);
            messages.push(message);
            io.sockets.emit('messages', messages);
        });

        socket.on('delete-message', (id) => {
            messages = messages.filter(message => message.id !== id);
            io.emit('messages', messages);
        });
    });
    return io;
}
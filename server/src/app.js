import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from 'node:http';
import { socketService } from "./socket/socketServices.js";


const app = express();
// Create a new server by passing the app
const server = createServer(app);
// Call the socketService function and pass the server
socketService(server);
// Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Routes

app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to my application' });
});

server.listen(3000, () => {
    console.log('Server on port 3000');
});

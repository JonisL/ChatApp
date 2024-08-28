const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const cors = require('cors');
const http = require('http'); // Required to create an HTTP server
const { Server } = require('socket.io'); // Import Server from socket.io

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.io server and attach it to the HTTP server
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust this as needed for your frontend origin
        methods: ['GET', 'POST'],
    },
});

// Socket.io logic
io.on('connection', (socket) => {
    console.log('New client connected');

    // Event: Client joins a room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
    });

    // Event: Client sends a message
    socket.on('sendMessage', (message) => {
        io.to(message.conversationId).emit('messageReceived', message);
    });

    // Event: Client disconnects
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

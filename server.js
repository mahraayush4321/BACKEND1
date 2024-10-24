const app = require('./app');
const http = require('http');
const { PORT } = require('./config');
const socketIo = require('socket.io');
const cors = require('cors');

app.use(cors());

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
    cors: {
      origin: "https://sportstriviax.netlify.app",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

httpServer.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});

process.on("SIGTERM",shutDown);
process.on("SIGINT", shutDown);

function shutDown() {
    console.log("received signal to shutdown");
    httpServer.close(() => {
        console.log('closing');
        process.exit(0);
    });
};
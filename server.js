const app = require('./app');
const http = require('http');
const { PORT } = require('./config');

const httpServer = http.createServer(app);

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
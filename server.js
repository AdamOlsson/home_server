const http = require("http");
const app = require("./app");
const dgram = require("dgram")
const io = require("socket.io")

const port = process.env.PORT || 5000
const udpSocket = dgram.createSocket("udp4")

// Check dgram clusters
udpSocket.bind({
    address: "localhost",
    port: 5001
});

const server = http.createServer(app);

server.listen(port, () => console.log(`API is listening on port ${port}`));
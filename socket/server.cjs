var app = require('express')();
var http = require('http').createServer(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Set up CORS headers for Express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

var canvasData = '';

io.on('connection', (socket) => {
    console.log('User Online');

    socket.on('canvas-init', () => {
      //console.log(canvasData);
      socket.broadcast.emit('canvas-data', canvasData);
    })

    socket.on('canvas-data', (data) => {
        canvasData = data;
        socket.broadcast.emit('canvas-data', data);
    })

    socket.on('disconnect', () => {
      console.log('User Offline');
    });
});

var server_port = process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on: " + server_port);
});
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true })
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./server/router/route.js")
var users=require("./server/controllers/userController.js")
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);
//var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

// var roomno = 1;
io.on('connection', function (client) {
    console.log("Client connected ")

    client.on('disconnect',function () {
        console.log("client disconnected");
    })

client.on('tobackend',function (data) {
    users.addtodb(data.userid, data.userName,data.message,data.date);
    io.emit('tofrontend',data)
})




})

// var clients = 0;
// io.on('connection', function(socket) {
//    clients++;
//    io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    socket.on('disconnect', function () {
//       clients--;
//       io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//    });
// });

var router = require('./server/router/route')
// app.use(expresssession({secret: 'max', saveuninitialized: false, resave:false}));
app.use('/', router);

server.listen(8000);
console.log("Listening to PORT 8000");
app.use(express.static('./public'));


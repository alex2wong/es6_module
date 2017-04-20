// websocket server for audio chat..

var https = require('https');
var fs = require('fs');
var ws = require('ws');

var userMap = Object.create(null);
var options = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt")
};
var server = https.createServer(options, function(req, res) {
    res.writeHead(200);
    // // 路由中间件 required !!
    // res.writeHead({
    //     'Content-Type' : 'text/html'
    // });
 
    fs.readFile('../bk.html', function(err, data) {
        if(err) {
            return ;
        }
 
        res.end(data);
    });
});

// 依赖于https server 实例化一个ssl websocket 实例.
var wss = new ws.Server({server: server});
 
wss.on('connection', function(o) {
    // ws 连接产生 socket对象. 
    o.on('message', function(message) {
        if(message.indexOf('user') === 0) {
            var user = message.split(':')[1];
            // socket对象池. 以user name 来标识socket 实例.
            console.log("DEBUG: new online user - " + user);
            userMap[user] = o;
        } else {
            /// broadcast to all clients..
            try {
                for(var u in userMap) {
                    userMap[u].send(message);
                    console.log("Sending audio to" + u.toString());
                }
            }
            catch(e) {

            }            
        }
    });
});

server.listen(8888);
console.log(".. Starting serve at port 8888");

var net = require('net');

var server = net.createServer(function(socket){
    socket.on('data',function(data){
        socket.write('hello net  ');
    })

    socket.on('end',function(){
        console.log('connect end');
    })

    socket.write('net createServer success');
});

server.listen(3333,function(){
    console.log('net listen 3333')
});

//telnet 127.0.0.1 3333
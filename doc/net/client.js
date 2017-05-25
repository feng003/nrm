var net = require('net');

var client = net.connect({port:3333},function(){
    console.log('client connected');
    client.write('net client connect');
})

client.on('data',function(data){
    console.log(data.toString());
    client.end();
})

client.on('end',function(){
    console.log('client disconnected');
});
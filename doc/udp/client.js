var dgram = require('dgram');

var message = new Buffer('udp and dgram');

var client = dgram.createSocket('udp4');

client.send(message,0,message.length,3334,"localhost",function(err,bytes){
    client.close();
})
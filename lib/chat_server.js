/**
 * Created by Administrator on 2017/3/30.
 */

var socketio    = require('socket.io');
var io;
var guestNumber = 1;
var nickNames   = {};
var nameUsed    = [];
var currentRoom = {};

exports.listen = function(server){
    io = socketio.listen(server);
    io.set('log level',1);
    io.sockets.on('connection',function(socket){
        // console.log(socket);
        guestNumber = assignGuestName(socket,guestNumber,nickNames,nameUsed);
        joinRoom(socket,"Lobby");
        handleMessageBroadCasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,nameUsed);
        handleRoomJoining(socket);
        socket.on('rooms',function(){
            // socket.emit('rooms',io.sockets.manager.rooms);
            socket.emit('rooms',io.of('/').adapter.rooms);
        });
        handleClientDisconnection(socket,nickNames,nameUsed);
    });
};

/**
 * 分派用户名称
 * @param {*} socket 
 * @param {*} guestNumber 
 * @param {*} nickNames 
 * @param {*} nameUsed 
 */
function assignGuestName(socket,guestNumber,nickNames,nameUsed){
    var name = 'Guest'+guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult',{success:true,name:name});
    nameUsed.push(name);
    return guestNumber+1;
}

/**
 * 处理加入房间
 * @param {*} socket 
 * @param {*} room 
 */
function joinRoom(socket,room){
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult',{room:room});
    socket.broadcast.to(room).emit('message',{text:nickNames[socket.id] + " has joined " + room + "."});

    // var usersInRoom = io.sockets.clients(room);
    var usersInRoom = io.sockets.adapter.rooms[room];
    // var usersInRoom = io.sockets.sockets.length;
    // console.log(usersInRoom);
    if(Object.keys(usersInRoom).length > 1){
        var usersInRoomSummary = "users currently in " + room + ":";
        for(var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;
            if(userSocketId != socket.id){
                if(index>0){
                    usersInRoomSummary += ",";
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += ".";
        socket.emit('message',{text:usersInRoomSummary});
    }
}

function handleNameChangeAttempts(socket,nickNames,nameUsed){
    socket.on('nameAttempt',function(name){
        if(name.indexOf('Guest') == 0){
            socket.emit('nameResult',{success:false,message:'Name cannot begin with "Guest" .'});
        }else{
            if(nameUsed.indexOf(name) == -1){
                var previousName = nickNames[socket.id];
                // var previousNameIndex = nameUsed.indexOf(previousName);
                nameUsed.push(name);
                nickNames[socket.id] = name;
                delete nameUsed[previousName];
                socket.emit('nameResult',{success:true,name:name});
                socket.broadcast.to(currentRoom[socket.id]).emit('message',{text:previousName + "is now konwn as "+name+"."});
            }else{
                socket.emit('nameResult',{success:false,message:"that name is already in use"});
            }
        }
    });
}

/**
 * 群发消息
 * @param {*} socket 
 */
function handleMessageBroadCasting(socket){
    socket.on('message',function(message){
        socket.broadcast.to(message.room).emit('message',{text:nickNames[socket.id]+":" + message.text});
    });
}

/**
 * 加入房间
 * @param {*} socket 
 */
function handleRoomJoining(socket){
    socket.on('join',function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    });
}

/**
 * 用户退出
 * @param {*} socket 
 */
function handleClientDisconnection(socket){
    socket.on('disconnect',function(){
        var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
        delete nameUsed[nameIndex];
        delete nickNames[socket.id];
    });
}
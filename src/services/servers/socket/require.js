const openSocket = require('socket.io-client')

const socket = openSocket('http://192.168.42.109:8000');

function request(receive){
    socket.on('receive', data => {
        receive(data)
    })
}

function send(data){
    socket.emit('send', data);
}

function sendSocketId(){
    const data = {_socket: socket.id}
    socket.emit('sendSocketId', data)
}

function receiveSocketId(data){
    console.log(data)
    socket.on('receiveSocketId', data)
}

function emit(spotify){
    const socket_id = socket.id
    const data = {_socket: socket_id, _spotify: spotify }
    socket.emit('data', data )
}

function receive(emit){
    socket.on('socket', data => {
        emit(data)
    })
}

module.exports = {
    send,
    request,
    emit,
    receive,
    sendSocketId,
    receiveSocketId
}
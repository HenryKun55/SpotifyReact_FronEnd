import openSocket from 'socket.io-client';

const socket = openSocket('http://192.168.42.109:8000');

function request(receive){
    socket.on('receive', data => {
        receive(data)
    })
}

function token(data){
    socket.emit('send', data);
}

export { token, request };
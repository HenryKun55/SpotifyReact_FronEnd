const io = require('socket.io')()
const port = 8000

io.on('connection', (client) => {

  client.on('send', posts => {
    io.emit('receive', posts)
  });

  client.on('data', data => {
    io.to(data._socket).emit('socket', data._spotify)
  })

  client.on('sendSocketId', data => {
    io.emit('receiveSocketId', data)
  })

})

io.listen(port)
console.log('listening on port ', port)
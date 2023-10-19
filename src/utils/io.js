const socketIO = require('socket.io');

const io = socketIO();

io.on('connection', (socket) => {
    console.log('Client connected'); 
  
    // Ngắt kết nối khi client thoát
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});
module.exports = io;

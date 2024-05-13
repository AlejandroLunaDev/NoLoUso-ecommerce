export default (io) => {
    io.on('connection', (socket) => {
      console.log(`Se ha conectado un cliente con el id ${socket.id}`);
  
  
      socket.on("disconnect", () => {
        console.log("Se ha desconectado un cliente");
      });
  
 
      socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data);
      });
    });
  };
  
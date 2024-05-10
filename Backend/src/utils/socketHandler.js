export default (io) => {
    io.on('connection', (socket) => {
      console.log(`Se ha conectado un cliente con el id ${socket.id}`);
  
      // Manejar evento de desconexión
      socket.on("disconnect", () => {
        console.log("Se ha desconectado un cliente");
      });
  
      // Manejar evento de mensaje de chat
      socket.on("chatMessage", (data) => {
        io.emit("chatMessage", data);
      });
    });
  };
  
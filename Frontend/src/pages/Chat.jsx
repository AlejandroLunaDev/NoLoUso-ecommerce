import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

export const Chat = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Emitir un mensaje cuando se conecte el cliente
    socket.emit("chatMessage", "Hola");

    // Escuchar el evento "chatMessage" para recibir mensajes del servidor
    socket.on("chatMessage", (data) => {
      setMessage(data);
    });

/*     return () => {
      socket.disconnect();
    }; */
  }, []);

  return (
    <div>
      <h1>Chat Room</h1>
      <p>mensaje:{message}</p>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../auth/context/AuthProvider"; // Importar el contexto de autenticación

const socket = io("http://localhost:8080");

export const Chat = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Emitir evento "joinRoom" solo cuando el usuario esté disponible y el componente se monte
    if (user) {
      socket.emit("joinRoom", user.first_name);
      setUsers((prevUsers) => [...prevUsers, user.first_name]);
    }

    // Manejar la recepción de mensajes de chat
    socket.on("chatMessage", (data) => {
      setMessage(data);
    });

    // Manejar la actualización de la lista de usuarios conectados
    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    // Manejar la limpieza del efecto cuando el componente se desmonte
    return () => {
      // Desconectar el socket u otras limpiezas necesarias
      // socket.disconnect();
    };
  }, [user]); // Dependencia de user para ejecutar el efecto cuando cambie

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-lg font-bold mb-4">Usuarios Conectados</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="mb-2">{user}</li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-300 p-4">
        <h1 className="text-lg font-bold mb-4">Chat Room</h1>
        <p className="mb-2">Mensaje: {message}</p>
      </div>
    </div>
  );
};

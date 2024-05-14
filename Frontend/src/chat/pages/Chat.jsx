import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Swal from "sweetalert2";

const socket = io("http://localhost:8080");

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      const { value: name } = await Swal.fire({
        title: "Ingresa tu nombre",
        input: "text",
        inputLabel: "Nombre",
        inputPlaceholder: "Escribe tu nombre",
        showCancelButton: true,
      });

      if (name) {
        setUsername(name);
        socket.emit("joinRoom", name);
        setUsers((prevUsers) => [...prevUsers, name]); 
      }
    };

    getUsername();

    socket.on("chatMessage", (data) => {
      setMessage(data);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    /* return () => {
      socket.disconnect();
    }; */
  }, []);

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

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../auth/context/AuthProvider";

const socket = io("http://localhost:8080");

export const Chat = () => {
  const { user, usersList } = useAuth(); 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState(""); // Nueva variable para manejar el destinatario seleccionado

  useEffect(() => {
    if (user) {
      socket.emit("joinRoom", user);
      setUsers((prevUsers) => {
        if (!prevUsers.includes(user)) {
          return [...prevUsers, user];
        }
        return prevUsers;
      });
    }

    socket.on("chatMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    return () => {
      // socket.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    if (message && recipient) {
      const messageData = {
        sender: user._id,
        recipient: recipient,
        content: message,
        timestamp: new Date()
      };
      socket.emit("chatMessage", messageData);
      setMessage("");
    }
  };

  return (
    <div className="flex h-dvh">
      <div className="w-1/4 p-4">
        <h1 className="text-lg font-bold mb-4">Usuarios</h1>
        <ul>
          {usersList.map((user, index) => (
            <li key={index} onClick={() => setRecipient(user._id)}>
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: user.online ? 'green' : 'gray' }}></span>
              {user.first_name}
            </li>
          ))}
        </ul>
      </div>
      <article className="w-3/4 bg-gray-300 p-4">
        <header>
          <h1 className="text-lg font-bold mb-4">Chat</h1>
        </header>
        <div className="chat-messages mb-2">
          {messages.map((msg, index) => (
            <p key={index} className="mb-2">
              <strong>{msg.sender.first_name}: </strong>
              {msg.content}
            </p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2"
          />
          <button onClick={sendMessage} className="p-2 bg-blue-500 text-white">Enviar</button>
        </div>
      </article>
    </div>
  );
};

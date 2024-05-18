// /path/to/ChatComponent.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../auth/context/AuthProvider";
import chatService from "../../service/db/chatService";

const socket = io("http://localhost:8080");

export const Chat = () => {
  const { user, usersList } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    socket.emit("joinChat", user._id);

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await chatService.getMessages();
        if (Array.isArray(fetchedMessages)) {
          setMessages(fetchedMessages);
        } else {
          console.error("API response is not an array of messages:", fetchedMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [user._id]);

  const sendMessage = async () => {
    if (message.trim() === "" || sending) return;

    setSending(true);
    const messageData = {
      sender: user._id,
      message: message.trim(),
      timestamp: new Date(),
    };

    try {
      const savedMessage = await chatService.createMessage(messageData);
      setMessage("");
      socket.emit("chatMessage", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getSenderName = (senderId) => {
    const sender = usersList.find((user) => user._id === senderId);
    return sender ? sender.first_name : "Desconocido";
  };

  return (
    <div className="flex h-dvh">
      <div className="w-1/4 p-4">
        <h1 className="text-lg font-bold mb-4">Usuarios</h1>
        <ul>
          {usersList.map((userItem) => (
            <li key={userItem._id} style={{ cursor: "pointer" }}>
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{
                  backgroundColor: userItem.online ? "green" : "gray",
                }}
              ></span>
              {userItem.first_name}
            </li>
          ))}
        </ul>
      </div>
      <article className="w-3/4 bg-gray-300 p-4">
        <header>
          <h1 className="text-lg font-bold mb-4">Chat</h1>
        </header>
        <div className="chat-messages mb-2 h-96 overflow-auto">
          {messages.map((msg) => (
            <p key={msg._id} className="mb-2">
              <strong>{getSenderName(msg.sender)}: </strong>
              {msg.message}
            </p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-2"
            disabled={sending}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white"
            disabled={sending}
          >
            Enviar
          </button>
        </div>
      </article>
    </div>
  );
};

export default Chat;

import { useState, useMemo, useEffect } from 'react'
import io from 'socket.io-client'
import './App.css'
import { MessagesList } from './components/MessagesList.jsx'

function App() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState({
    text: '',
    author: '',
  })
  // Conexion con el servidor de socket
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        transports: ["websocket", "polling"],
        autoConnect: false,
      }),
    []
  )

  // Efecto para conectar, desconectar el socket  y escuchar los mensajes 
  useEffect(() => {
    socket.connect()
    socket.emit("message")
    socket.on('messages', (messages) => {
      setMessages(messages)
    })

    return () => {
      console.log("desconectado")
      socket.disconnect()
    }
  }, [socket])

  // Funcion para enviar un mensaje
  const sendMessage = (e) => {
    e.preventDefault()
    console.log(message);
    if (message.text && message.author) {
      socket.emit('new-message', message);
      setMessage({ text: '', author: message.author });
    }
  }
  // Funcion para eliminar un mensaje
  const deleteMessage = (id) => {
    socket.emit('delete-message', id);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-auto">
        {messages.length > 0 ? (
          <MessagesList messages={messages} deleteMessage={deleteMessage} />
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
      </div>
      <div className="p-4 bg-white border-t border-gray-300">
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={message.author}
            onChange={(e) => setMessage({ ...message, author: e.target.value })}
            className="w-1/6 px-4 py-2 border border-gray-300 rounded-l"
            placeholder="Your name..."
          />
          <input
            type="text"
            value={message.text}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className=" px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
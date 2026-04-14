"use client"
import { saveMessages } from "@/lib/actions/saveMessages"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://localhost:4000")

export function Chat({ roomId, sender, initialMessages }: {
  roomId: string
  sender: string
  initialMessages: { sender: string, content: string }[]
}) {
  const [messages, setMessages] = useState<{ sender: string, content: string }[]>(
    initialMessages.map(m => ({ sender: m.sender, content: m.content }))
  )
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    if (!message.trim()) return
    socket.emit("sendMessage", { roomId, content: message, sender })
    await saveMessages({ roomId, content: message, sender })
    setMessages(prev => [...prev, { sender, content: message }])
    setMessage("")
  }

  useEffect(() => {
    socket.off("receiveMessage")
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.sender === sender) return
      setMessages(prev => [...prev, { sender: newMessage.sender, content: newMessage.content }])
    })
    socket.emit("joinRoom", roomId)

    return () => {
      socket.off("receiveMessage")
    }
  }, [roomId])

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <span>{msg.sender}: </span>{msg.content}
          </li>
        ))}
      </ul>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

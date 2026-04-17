"use client";

import { saveMessages } from "@/lib/actions/saveMessages";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";

const socket = io("http://localhost:4000");

export function Chat({
  roomId,
  sender,
  initialMessages,
}: {
  roomId: string;
  sender: string;
  initialMessages: { sender: string; content: string }[];
}) {
  const [messages, setMessages] = useState<
    { sender: string; content: string }[]
  >(initialMessages.map((m) => ({ sender: m.sender, content: m.content })));
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;
    socket.emit("sendMessage", { roomId, content: message, sender });
    await saveMessages({ roomId, content: message, sender });
    setMessages((prev) => [...prev, { sender, content: message }]);
    setMessage("");
  };

  useEffect(() => {
    socket.off("receiveMessage");
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.sender === sender) return;
      setMessages((prev) => [...prev, newMessage]);
    });
    socket.emit("joinRoom", roomId);
    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId, sender]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <h3 className="text-md font-semibold text-purple-200 mb-3">Live Chat</h3>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm ${msg.sender === sender
                ? "text-right bg-purple-600/20 ml-auto"
                : "text-left bg-purple-900/20"
              } rounded-lg px-3 py-1.5 max-w-[85%] break-words`}
          >
            <span className="font-semibold text-purple-300">{msg.sender}:</span>{" "}
            <span className="text-white/80">{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-purple-900/50 bg-black/60 px-4 py-2 text-sm text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          className="rounded-full bg-gradient-to-r from-purple-600 to-violet-700 p-2 text-white hover:from-purple-500 hover:to-violet-600 transition"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

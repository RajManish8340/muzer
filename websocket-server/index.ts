import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(express.json())

const server = http.createServer(app)

app.use(cors({
  origin: process.env.NEXT_PUBLIC_URL,
  methods: ["GET", "POST"],
  credentials: true
}))

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_URL,
    methods: ["GET", "POST"]
  },
})

io.on("connection", (socket) => {
  console.log("A user connected", socket.id)

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId)
    console.log(`${socket.id} joined room ${roomId}`)
  })

  socket.on("sendMessage", ({ roomId, content, sender }) => {
    console.log("=================================================")
    console.log({ roomId, content, sender })
    io.to(roomId).emit("receiveMessage", { content, sender })
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
  })
})

server.listen(4000, () => {
  console.log("listening at port 4000")
})

import express from "express"
import http from "http"
import { Server as WsServer } from "socket.io"
import cors from "cors"

const app = express()
app.use(express.json())

const server = http.createServer(app)

app.use(cors({
  origin: process.env.NEXT_PUBLIC_URL,
  methods: ["GET", "POST"],
  credentials: true
}))

const io = new WsServer(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_URL,
    methods: ["GET", "POST"]
  },
})

const WS_SECRET = process.env.WS_SECRET
app.post("/broadcast", (req, res) => {
  const authHeader = req.headers["x-api-key"]
  if (WS_SECRET !== authHeader) {
    return res.status(403).json({ error: "unauthorised" })
  }

  const { roomId, event, data } = req.body
  if (!roomId || !event) {
    return res.status(400).json({ error: "missing roomId or event" })
  }

  io.to(roomId).emit(event, data)
  console.log(`broadcast ${event} to room ${roomId}`)
  res.status(200).json({ ok: true })
})

io.on("connection", async (socket) => {
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

let port = 4000
server.listen(port, () => {
  console.log("listening at port 4000")
})

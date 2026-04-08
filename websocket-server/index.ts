import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
app.use(express.json())

const server = http.createServer(app)

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}))

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
})

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id)

  socket.on("sendMessage", (message) => {
    console.log("recieved message from client", message)
  })
  socket.on("disconnect", () => {
    console.log("User Disconneced", socket.id)
  })
})

app.post("/reply", (req, res) => {
  const { message } = req.body;
  io.emit("receivedMessage", message)
  res.status(200).send({ success: true })
})


server.listen(4000, () => {
  console.log(`server started at port 9000`)
})


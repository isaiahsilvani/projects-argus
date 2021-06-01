import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import config from './config/config'
import logging from './config/logging'
import { getUsers, userJoin, userLeave} from './util/user'

const NAMESPACE = 'Server'

const app = express()

/**  Logging the request  **/
app.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP = [${req.socket.remoteAddress}]`)

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP = [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`)
  })
  next() // need to call the next function so request will pass through our middleware without stopping here
})
// create server
const server = http.createServer(app)

//socketio connection...
const io = new Server(server, {cors: {origin: "http://localhost:3000"}})

io.on("connection", (socket) => {
  socket.join('chatroom')

  socket.on("handle-connection", (username: string) => {
    if (!userJoin(socket.id, username)) {
        console.log('username taken hit server')
        io.emit("username-taken")
    } else {
        io.emit('username-submitted')
        console.log('username submited hit')
        const users = getUsers()
        console.log('users', users)
        io.to('chatroom').emit("get-connected-users", getUsers())
    }
  })

  socket.on("message", ({message, username}) => {
    console.log('backend hit message', message, username)
    io.to('chatroom').emit("recieve-message", ({message, username}))
  })

  socket.on("disconnect", () => {
    userLeave(socket.id)
  })
})
// server listen...
const PORT = config.server.port
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
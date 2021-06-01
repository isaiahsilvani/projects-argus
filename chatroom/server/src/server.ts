import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import config from './config/config'
import logging from './config/logging'

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

io.on("connection", () => {
  console.log("client connected")
})
// server listen...
const PORT = config.server.port
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
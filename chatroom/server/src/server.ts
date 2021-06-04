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

/** Parse the request */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/** Rules of our API */
app.use((req, res, next) => {
  // When going into production mode, you must change * to specific port
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
});

/** Routes **/


/** Error Handling **/
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
      message: error.message
  });
});

// create server
const server = http.createServer(app)

//socketio connection...
const io = new Server(server, {cors: {origin: "http://localhost:3000"}})

io.on("connection", (socket) => {

  socket.on("handle-connection", (username: string) => {
    if (!userJoin(socket.id, username)) {

    } else {
        io.emit('username-submitted')

        const users = getUsers()

        io.emit("get-connected-users", getUsers())
    }
  })

  socket.on("message", ({message, username}) => {

    if(message.length > 0){
      io.emit("recieve-message", ({message, username}))
    }
  })

  socket.on("disconnect", () => {
    userLeave(socket.id)
  })
})
// server listen...
const PORT = config.server.port
server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
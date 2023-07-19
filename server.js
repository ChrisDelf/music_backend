require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const http = require('http');
const sequelize = require('./config/sequelize')
/* const {logger} = require('./middleWare/logEvents') */
/* const connectDB = require('./config/connectDB') */
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials.js');
const corsOptions = require('./config/corsOptions')
const initDB = require('./scripts/initDB')
const socketScript = require('./scripts/socketScript')
const socketio = require('socket.io');
const PORT = process.env.PORT || 3500;


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware for json 
app.use(express.json());

// middleware for cookies 
app.use(cookieParser())

// connecting to the database
initDB()
// routes

app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register_user'))
app.use('/refresh', require('./routes/refresh'))

app.use('/song', require('./routes/api/song'))
app.use('/role', require('./routes/role.js'))


// the links below will be restricted 
/* app.use(verifyJWT) */
app.use('/addSong', require('./routes/api/addSong'))

app.use('/user', require('./routes/user.js'))
app.use('/logout', require('./routes/logout'))
app.use('/playlist', require('./routes/api/playlist'))
app.use('/like', require('./routes/api/like'))

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// initializing socketio
const io = require('socket.io')(server, {
 cors: {
    origin: '*',
  },
  allowRequest: (req, callback) => {
    if (req.headers.origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Invalid origin'));
    }
  }
});

// testing socket.io 

io.on('connection', (socket) => {
  console.log('A user connected');
  socketScript.jobsStream(io)
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

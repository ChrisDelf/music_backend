require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const sequelize = require('./config/sequelize')

/* const {logger} = require('./middleWare/logEvents') */
/* const connectDB = require('./config/connectDB') */
const User = require('./models/User')
const Song = require('./models/Song')
const Like = require('./models/Like')
const AddSong = require('./models/AddSong')
const SongList = require('./models/SongList')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials.js');
const corsOptions = require('./config/corsOptions')
const initDB = require('./scripts/initDB')
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
app.use('/user', require('./routes/user.js'))
// the links below will be restricted 
app.use(verifyJWT)
app.use('/logout', require('./routes/logout'))
app.use('/playlist', require('./routes/api/playlist'))
app.use('/song', require('./routes/api/song'))
app.use('/like', require('./routes/api/like'))
app.use('/addSong',require('./routes/api/addSong'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

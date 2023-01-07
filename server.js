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
const PORT = process.env.PORT || 3500;

app.use(cors())
const initDB = async() => {
try{

  await sequelize.authenticate();
  //creating tables
  await User.sync({ force: true }); 
  await Like.sync({force:true});
  await Song.sync({force:true});
  await AddSong.sync({force:true});
  await SongList.sync({force:true});
  //creating relationships
  // Like Song User Related
  User.hasMany(Like)
  Like.belongsTo(User)
  Song.hasMany(Like)
  Like.belongsTo(Song)
  SongList.hasMany(Like)
  Like.belongsTo(SongList)
  // Add Song Playlist related
  Song.hasMany(AddSong)
  AddSong.belongsTo(Song)
  SongList.hasMany(AddSong)
  AddSong.belongsTo(SongList)
  User.hasMany(SongList)
  SongList.belongsTo(User)
  // Like playlist relationship




} 
catch (error)
{
  console.log("Failed database connection")
}
}
// <---------------------------------------->


// connecting to the database
initDB()
// built-in middleware for json 
app.use(express.json());

// routes

app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register_user'))
app.use('/playlist', require('./routes/api/playlist'))
app.use('/song', require('./routes/api/song'))
app.use('/user', require('./routes/user.js'))
app.use('/like', require('./routes/api/like'))
app.use('/addSong',require('./routes/api/addSong'))
// app.use('/register', require('./routes/register_user'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

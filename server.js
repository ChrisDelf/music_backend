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
const PORT = process.env.PORT || 3500;
const initDB = async() => {
try{

  await sequelize.authenticate();
  //creating tables
  await User.sync({ force: true }); 
  await Like.sync({force:true});
  await Song.sync({force:true});
  //creating relationships
  User.hasMany(Like)
  Like.belongsTo(User)
  Song.hasMany(Like)
  Like.belongsTo(Song)


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
// app.use('/register', require('./routes/register_user'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

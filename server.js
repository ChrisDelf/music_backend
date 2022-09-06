require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const { Sequelize, DataTypes, Model } = require('sequelize');
/* const {logger} = require('./middleWare/logEvents') */
/* const connectDB = require('./config/connectDB') */
const PORT = process.env.PORT || 3500;



// routes

app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register_user'))
app.use('/playlist', require('./routes/api/playlist'))
app.use('/song', require('./routes/api/songs'))
// app.use('/register', require('./routes/register_user'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

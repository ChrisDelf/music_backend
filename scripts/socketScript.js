require('dotenv').config();
const socketio = require('socket.io');
const Song = require('../models/Song');


const jobsStream = async(io) => {
  
  const jobs = await Song.findAll({
  where: {
    status: "unfinished"
  }
    })

    io.emit('unfinished-jobs', jobs )
  console.log("Jobs queued", jobs)
}







module.exports = {jobsStream}


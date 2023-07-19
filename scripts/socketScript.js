require('dotenv').config();
const socketio = require('socket.io');
const Song = require('../models/Song');


const jobsStream = async(io) => {
  
  const jobs = await Song.findAll({
  where: {
    status: "unfinished"
  }
    })

    io.emit('unfinishedJobs', jobs )
  console.log(jobs)
}






module.exports = {jobsStream}


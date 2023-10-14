const Song = require("../models/Song");
const downLoadSong = require("../scripts/downLoadSong.js");
const songStream = require("../scripts/songStream");
const express = require("express");
const fs = require("fs");
const path = require("path");

const uploadSong = async (req, res) => {
  // downLoadSong.downLoadSong(req.body)
  // before we start a job queue we want to make sure we are not duplicating jobs with the same links
  const checkJob = await Song.findOne({
    where: {
      link: req.body.link,
    },
  });

  if (checkJob !== null) {
    res.status(400).json({ message: "This song is already in the job queue" });
  }
  // going add a song to my postgres database
  else {
    let newJob = Song.build({
      link: req.body.link,
      status: "unfinished",
    });

    await newJob.save();

    res
      .status(201)
      .json({ success: "Job has been sent wait for it to download" });
  }
};
const selectSong = async (req, res) => {
  // checking if request is compatible
  if (!req?.params?.id)
    return res.status(400).json({ message: "Song ID is required" });
  // next we need to check if the song id is in our database
  const song = await Song.findOne({ where: {id: req.params.id }});

  res.json(song);
};

const getAllSongs = async (req, res) => {
  const Songs = await Song.findAll();

  res.status(201).json({ success: Songs });
};

// going to check the song's table to see which songs are still in queue to download
const getAllJobs = async (req, res) => {
  const Jobs = await Song.findAll({
    where: {
      status: "unfinished",
    },
  });
  res.status(201).json({ success: Jobs });
};

const playSong = async (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).json({ message: "Song ID is required" });
  }
  // going first we need to see if the id: is valid
  if (!req?.params?.id)
    return res.status(400).json({ message: "Song ID is required" });
  // next is to locate the song in our database
  const song = await Song.findOne({ where: { id: req.params.id } });

  if (!song) {
    res
      .status(400)
      .json({ message: `Song by the id ${req.params.id} was not found` });
  } else {
    songStream(song.fileName, req.params.range, res);
  }
};

const sendSongFile = async (req, res) => {
  // going first we need to see if the id: is valid
  if (!req?.params?.id)
    return res.status(400).json({ message: "Song ID is required" });
  const song = await Song.findOne({ where: { id: req.params.id } });
   if (!song) {
    res
      .status(400)
      .json({ message: `Song by the id ${req.params.id} was not found` });
  } else {

  const fileName = song.fileName;
  console.log(fileName);
  /*  going to grab the file now */
  var filePath = path.join(__dirname, "../", "music/", `${fileName}`);
  // Set the appropriate headers for MP3 file download
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=downloadedAudio.mp3",
  );
  res.setHeader("Content-Type", "audio/mpeg");

  // Send the MP3 file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending MP3 file:", err);
      res.status(500).send("Internal Server Error");
    }
  });
  }
};

module.exports = {
  uploadSong,
  selectSong,
  getAllSongs,
  playSong,
  sendSongFile,
  getAllJobs,
};

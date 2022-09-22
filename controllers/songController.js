const Song = require('../models/Song')
const downLoadSong = require('../scripts/downLoadSong.js')
const songStream = require('../scripts/songStream')
const express = require('express');
const path = require('path');

const uploadSong = async (req, res) => {
  // deconstructing the resquest body


  downLoadSong.downLoadSong(req.body)
  res.status(201).json({ 'success': "song has been uploaded" })

}
const selectSong = async (req, res) => {
  // checking if request is compatible
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Song ID is required' })
  // next we need to check if the song id is in our database
  const song = await Song.findOne({ id: req.params.id })

  res.json(song)
}

const getAllSongs = async (req, res) => {
  const Songs = await (Song.findAll())

  res.status(201).json({ 'success': Songs })
}

const playSong = async (req, res) => {
  // going first we need to see if the id: is valid
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Song ID is required' })
  // next is to locate the song in our database
  const song = await Song.findOne({ id: req.params.id })

  if (!song) {
    res.status(400).json({ 'message': `Song by the id ${req.params.id} was not found` })

  }
  // now stream the Song to the user we need the file name and the range of the request

  songStream(song.fileName, req.params.range, res)

}

const sendSongFile = async (req, res) => {
  // going first we need to see if the id: is valid
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Song ID is required' })
  const song = await Song.findOne({ id: req.params.id })

  // if (!song) {
  //   res.status(400).json({ 'message': `Song by the id ${req.params.id} was not found` })
  //
  // }
  /*  going to grab the file now */
  var filePath = path.join(__dirname, "../", "music/", `${song.fileName}.mp3`)
  console.log(filePath)

    res.status(200).download(filePath)

}

module.exports = { uploadSong, selectSong, getAllSongs, playSong, sendSongFile }

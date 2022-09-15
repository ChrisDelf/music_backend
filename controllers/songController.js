const Song = require('../models/Song')
const downLoadSong = require('../scripts/downLoadSong.js')

const uploadSong = async (req, res) => {
  // deconstructing the resquest body
  const { name } = req.body


  downLoadSong.downLoadSong(name)
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

module.exports = { uploadSong, selectSong, getAllSongs}

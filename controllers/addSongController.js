const SongList = require('../models/SongList')
const Song = require('../models/Song')
const AddSong = require('../models/AddSong.js')


const createAddSong = async (req, res) => {
  // checking body if you have a correct 
  if (!req?.body?.songId) return res.status(400).json({ 'message': 'Need song or a song id ' })
  if (!req?.body?.songListId) return res.status(400).json({ 'message': 'Need a user id' })

  // before we add the song to the playlist list we need to check if its 
  // in our database
  const song = await Song.findOne({
    where: {
      id: req.body.songId
    }
  })

  // next forh the playlist

  const songList = await SongList.findOne({
    where: {
      id: req.body.songListId
    }
  })

  if (!song || !songList) {
    return res.status(400).json({ "message": "could not find the playlist or the song" })
  }

  const addSong = AddSong.build(
    {
      songListId: req.body.songListId,
      songId: req.body.songId
    }
  )
  await addSong.save()

  res.status(200).json({ "message": "success" })
}

const deleteAddSong = async(req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": 'addSong ID required' });

  const deleteAddSong = await AddSong.destroy(
    {
      where:
      {
        id: req.params.id
      }
    }
  )
  res.status(200).json(deleteAddSong)
}

module.exports = { createAddSong , deleteAddSong}

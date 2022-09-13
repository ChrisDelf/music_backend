const SongList = require('../models/SongList')
const AddSong = require('../models/AddSong')

const selectPlaylist = async (req, res) => {
  
  if (!req?.params?.id) return res.status(400).json({ "message": 'Playlist ID required' });
  console.log(req.params.id)
  const songList = await SongList.findOne({
    where: {
      id: req.params.id
    },
    include: AddSong,
  })
  
  if (!songList) return res.status(400).json({ "message": `The playlist by the id of ${req.params.id} was not found` })

 
  res.status(200).json({ 'message': songList })

}

const allPlaylists = async (req, res) => {
  const playlists = await SongList.findAll()

  return res.status(200).json(playlists)
}

const createPlaylist = async (req, res) => {
  if (!req.body) return res.status(400).json({ 'invalid': "Body was not found" })

  const newPlaylist = SongList.build(
    {
      name: req.body.name,
      userId: req.body.userId,
      listType: req.body.listType
      
    }
  )
  await newPlaylist.save()

  res.status(200).json({ 'success': newPlaylist })
}


const deletePlaylist = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Playlist ID is required" })

  SongList.destroy(
    {
      where:
      {
        id: req.params.id
      }
    }
  )
  res.status(200).json({ 'message': `User by the id of ${req.params.id}` })
}

module.exports = { selectPlaylist, allPlaylists, createPlaylist, deletePlaylist }

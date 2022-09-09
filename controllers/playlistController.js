const SongList = require('../models/SongList')
const Song = require('../models/Song')
const selectPlaylist = async (req, res) =>
{
    if (!req?.params?.id) return res.status(400).json({ "message": 'Playlist ID required' });
    
    const songList = await SongList.findOne({
      where: {
      id: req.params.id
      },
      include: Song
    })
    

}

const allPlaylists = async (req, res) =>
{

}

const createPlaylist = async (req, res) =>
{

}


const deletePlaylist = async (req, res) =>
{

}

module.exports = {selectPlaylist, allPlaylists, createPlaylist, deletePlaylist}

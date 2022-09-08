const Song = require('../models/Song')


const uploadSong = async (req, res) =>
{
  // deconstructing the resquest body
  const {name} = req.body

  newSong = Song.build(
    {
      name: name,
    }
  )
  await newSong.save()

  res.status(201).json({'success': newSong})

}
const selectSong = async (req, res) =>
{
  // checking if request is compatible
  if (!req?.params?.id) return res.status(400).json({'message': 'Song ID is required'})
  // next we need to check if the song id is in our database
  const song = await Song.findOne({id: req.params.id})
  
  res.json(song)
}

module.exports = {uploadSong, selectSong}

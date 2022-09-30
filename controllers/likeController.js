const Like = require('../models/Like')
const Song = require('../models/Song')
const User = require('../models/User')
const SongList = require('../models/SongList')
const createLike = async (req, res) =>
{
  console.log("create like")
  //in order to create a like we the song or songlist id and we need the user id
  if(!req?.body?.songid && !req?.body?.songlistid) return res.status(400).json({'message':'Need song or a song id '})
  if(!req?.body?.userid) return res.status(400).json({'message':'Need a user id'})
  // now we should check if both user and song exist in our database
  const user = await User.findOne({
    where:{
      id: req.body.userid,
    }
  })
  if (req.body.songid)
  {
    console.log("!!!! ITs a song")
  const song = await Song.findOne({id: req.body.songid})
  
  if(!user || !song)
  {
    return res.status(204).json({"message": 'Could not find either valid user or song'})
  }
  

  // now we create the like object
  const like = Like.build({
    userId: req.body.userid,
    songId: req.body.songid 
  })
  await like.save()
  }
  else
  {

    console.log("!!!! ITs a songList ")
    console.log("hello")
  const songList = await SongList.findOne({id: req.body.songlistid})
  
  if(!user || !songList)
    {
    return res.status(204).json({"message": 'Could not find either valid user or songlist'})
  }
  

  // now we create the like object
  const like = Like.build({
    userId: req.body.userid,
    playlistId: req.body.songlistid 
  })
    
  await like.save()
  }
  

  res.status(201).json({'success':'the like has been create'})
  // const songLikes = await song.getLike()
  // res.status(201).json({'success': songLikes})
}
  


const deleteLike = async (req, res) =>
{

}

const getAllLikes = async (req, res) =>
{
  const Likes = await Like.findAll() 
  res.status(201).json({'success': Likes})
}


module.exports = {createLike, deleteLike, getAllLikes}




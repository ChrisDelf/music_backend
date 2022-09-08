const Like = require('../models/Like')
const Song = require('../models/Song')
const User = require('../models/User')

const createLike = async (req, res) =>
{
  //in order to create a like we the song or songlist id and we need the user id
  if(!req?.body?.songid) return res.status(400).json({'message':'Need song or a songlist id '})
  if(!req?.body?.userid) return res.status(400).json({'message':'Need a user id'})
  // now we should check if both user and song exist in our database
  const user = await User.findOne({
    where:{
      id: req.body.userid,
    }
  })
// later ! we are going to need to add code for song lists
  const song = await Song.findOne({id: req.body.songid})
  if(!user || !song)
  {
    return res.status(204).json({"message": 'Could not find either valid user or song'})
  }

  // now we create the like object
  const like = Like.build({
    userid: req.body.userid,
    songid: req.body.songid 
  })
  await like.save()

  res.status(201).json({'success':'the like has been create'})
}
  


const deleteLike = async (req, res) =>
{

}


module.exports = {createLike, deleteLike}




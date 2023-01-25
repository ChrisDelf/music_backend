const User = require('../models/User')
const Song = require('../models/Song')
const Like = require('../models/Like')
const AddSong = require('../models/AddSong')
const SongList = require('../models/SongList')
const Role = require('../models/Roles')
const AddRole = require('../models/AddRole.js')


const bcrypt = require('bcrypt');
const createRole = require('../scripts/creatingRoles.js')
const sequelize = require('../config/sequelize')

require('dotenv').config();

const create_admin = async (adminId) => {
const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)

const admin_user = User.build(
  {
  username: "BigBoss",
  password: hashedPassword,
  }
)
 await admin_user.save()
  // now need to create the join object
  const newAddRole = AddRole.build(
    {
      userId: admin_user.id,
      roleId: adminId
    }
  )
  await newAddRole.save()
}

const initDB = async() => {
try{

  await sequelize.authenticate();
  //creating tables
  await User.sync({ force: true }); 
  await Like.sync({force:true});
  await Song.sync({force:true});
  await AddSong.sync({force:true});
  await SongList.sync({force:true});
  await Role.sync({force:true})
  await AddRole.sync({force:true})
  //creating relationships
  // Like Song User Related
  User.hasMany(Like)
  Like.belongsTo(User)
  Song.hasMany(Like)
  Like.belongsTo(Song)
  SongList.hasMany(Like)
  Like.belongsTo(SongList)
  // Add Song Playlist related
  Song.hasMany(AddSong)
  AddSong.belongsTo(Song)
  SongList.hasMany(AddSong)
  AddSong.belongsTo(SongList)
  User.hasMany(SongList)
  SongList.belongsTo(User)
  // Roles
  User.hasMany(AddRole)
  Role.hasMany(AddRole)
  AddRole.belongsTo(Role)
  AddRole.belongsTo(User)

  // Like playlist relationship
  //creating Roles
   adminId = await createRole("admin")
   user_Id = await createRole("user")
  
  //creating admin
  create_admin(adminId)
  


} 
catch (error)
{
  console.log("Failed database connection")
}
}
// <---------------------------------------->

module.exports = initDB

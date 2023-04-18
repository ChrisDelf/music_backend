const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const short = require('short-uuid');
const { exec } = require("child_process");
const crypto = require('crypto');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const jsmediatags = require("jsmediatags");

const Song = require('../models/Song')

const addingShortUuid = (data) => {
  return new Promise(async (resolve, reject) => {
   
    // creating the uuid tag that i'm going to add onto the end of the filename
    const translator = short();
    const shortUuid = translator.new();
    const fileName = data.fileName
    // if there is still a hex on a the filename we will now remove it
    let newFileName = ""
    if (data.isFailed === true) {
      newFileName = fileName.split("[").reverse()[1]
      

    }
    else {
      newFileName = fileName.split(".mp3")[0]
    }
    newFileName = newFileName + shortUuid + ".mp3"

   
    // nex I will rename the file
    const oldPath = path.resolve(__dirname, '..', 'music', fileName)
    const newPath = path.resolve(__dirname, '..', 'music', newFileName)

    fs.renameSync(oldPath, newPath)
    data.fileName = newFileName
    resolve(data)
  })


}

const duplicateCheck = (data) => {

  return new Promise(async (resolve, reject) => {
    
    let filename = data.fileName
    if (typeof data.tags === "object") {
      filename = data.tags.title + ".mp3"
    }
    else {
      filename = data.fileName
    }

    try {

      const newSong = await Song.findOne({
        where: { fileName: filename }
      })

      if (!newSong) {
        resolve(data)
      }
    }
    catch (error) {
      reject(error)
    }

  })

}
const createSong = (data) => {


  return new Promise(async (resolve, reject) => {
    // going to need a check to make sure that we are not adding dublicate song into our data base

    let tempData = ""
    if (typeof data.tags === "object") {
     
      tempData =
      {
        name: data.tags.tags.title,
        fileName: data.fileName,
        artist: data.tags.tags.artist,
      }

    }
    else {

      let titleName = data.name

      tempData =
      {
        name: titleName,
        fileName: data.fileName,
        grene: "unknown",
        artist: "unknown"
      }


    }
    newSong = Song.build(
      {
        name: tempData.name,
        fileName: tempData.fileName,
        genre: tempData.genre,
        artist: tempData.artist,
        originalLink: data.webpage_url
      }
    )

    await newSong.save()
    resolve()
  })
}

const createFile = (data) => {
 
  let song = data
  return new Promise(async (resolve, reject) => {


    exec(`yt-dlp ${song.webpage_url}`, { cwd: './music/' }, (error, stdout, stderr) => {
      try {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        const result = stdout.match(/\has already been downloaded\b/)

        exec(`yt-dlp --get-filename ${song.webpage_url}`, { cwd: './music/' }, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          data.tempFileName = stdout.split("\n")[0]
          resolve(data)
        })

        if (result !== null) {
          if (result[0] === "has already been downloaded") {
            throw new Error("Song has already been downloaded")
          }
        }


      }
      catch (error) {

        reject(error)
      }
    })

  })
}

const idnTagging = (data) => {
  return new Promise((resolve, reject) => {

    let result = ""
    exec(`idntag "${data.tempFileName}"`, { cwd: './music/' }, (error, stdout, stderr) => {
      try {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        result = stdout.split('/music/')
        data.isFailed = false
        data.fileName = result[2].slice(0, -1)
       
        resolve(data)
      }
      catch
      {
        data.fileName = data.tempFileName
        data.isFailed = true
        resolve(data)
        console.log("idntag error")
      }
    }

    )

  })
}
const useIdntag = (data) => {

  return new Promise(async (resolve, reject) => {
    data = await (idnTagging(data))
   
    resolve(data)
  })

}
const readTags = async (data) => {

  return new Promise((resolve, reject) => {
    let filename = data


    const fullPath = path.resolve(__dirname, '..', 'music', filename)

    jsmediatags.read(fullPath, {
      onSuccess: function(tag) {

        result = tag
        resolve(tag)

      },

      onError: function(error) {
        console.log(error.type, error.info)
        reject(error)
      }
    })
    resolve()


  })
}

const jsmediaTagsCheck = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {

      const tags = await readTags(data.fileName)
      if (tags !== null) {
        data.tags = tags
        resolve(data)
      }
      else {
        console.log("NO TAGS", data)
        resolve(data)
      }
    }
    catch (error) {
      console.error(error)
    }

  })

}




const soundcloudDownload = async (link, length) => {
  // need to check if this like is a playlist



  return new Promise((resolve, reject) => {
    let tempSong = {}


    exec(`yt-dlp --dump-json ${link}`, { cwd: './music/' }, (error, stdout, stderr) => {


      try {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        const result = stdout.split("\n")


        let tempData = JSON.parse(result[0])


        tempSong = {
          name: tempData.fulltitle,
          webpage_url: tempData.webpage_url
        }


        resolve(tempSong)
      }
      catch
      {

      }
    });

  })




}

const youtubeDownload = async (link) => {
  exec(`yt-dlp --no-playlist -f bestaudio -x --audio-format mp3 ${link}`, { cwd: './music/' }, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

  });

}

const jobMaker = async (link) => {
  exec(`yt-dlp --dump-json ${link}`, { cwd: './music/' }, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

  });

}

const downLoadSong = async (body) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const { link, genre, artist } = body

  let playlistCheck = link.match("/sets/")

  if (playlistCheck !== null) {

    let response = "Link was a playlist"
    return response
  }
  // going to check if the song list was already downloaded using the same link
  const newSong = await Song.findOne({
    where: { originalLink: link }
  })
 
  if (newSong !== null) {
    let response = "Link has already been downloaded"
    return response
  }

  // going to check if the folder already exist
  // and if it doesn't then we create one
  let resArray = []

  if (!fs.existsSync(path.join(__dirname, '..', 'music'))) {
    await fsPromises.mkdir(path.join(__dirname, '..', "music"))
  }
  exec(`yt-dlp --get-filename ${link}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    resArray = stdout.split(".mp3")

    // next we want to know where the link is coming from
    // we have to read the link
    let linkSource = link.split("/", 3)

    if (linkSource[2] == "youtube.com") {
      youtubeDownload(link)
    }
    console.log("Download link", link)
    if (linkSource[2] == "soundcloud.com") {
      // grab some of the information from the links and send back an array of the information we find
      soundcloudDownload(link, resArray.length)
        // now we download the song
        .then(createFile)
        // now we want to use Idntag to double check if our information matches up
        .then(useIdntag)
        // going to add our own identifier
        .then(addingShortUuid)
        // using jsmediatags to grab the information from the mp3 file
        .then(jsmediaTagsCheck)

        // now create the songs in our dataBase
        .then(createSong).catch(error => { console.error(error) })


    }
  })





}

module.exports = { downLoadSong }

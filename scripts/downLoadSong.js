const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { exec } = require("child_process");
const crypto = require('crypto');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const Song = require('../models/Song')


const createSong = async (name, fileName, genre, artist) => {
  newSong = Song.build(
    {
      name: name,
      fileName: fileName,
      genre: genre,
      artist: artist
    }
  )
  await newSong.save()
}

const createFile = (data) => {
  return new Promise((resolve, reject) => {
        data.forEach(song => {

      exec(`yt-dlp ${song.webpage_url}`, { cwd: './music/' }, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        exec(`yt-dlp --get-filename ${song.webpage_url}`, { cwd: './music/' }, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }

        song.tempFileName = stdout.split("\n")[0]
        resolve(song)
      })
      })
    
    })


  })
}

const useIdntag = (data) => {
  return new Promise((resolve, reject) => {
    /*  let tempFileName = fileName + ".mp3" */
    console.log("hello", data)
    resolve(console.log("hello"))

    // exec(`idntag ${tempFileName}`, { cwd: './music/' }, (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //
    // resolve(stdout) 
    // })

  })

}




const soundcloudDownload = async (link, length) => {
  // we can get the 
  // thumbnail
  // extractor
  // fulltitle
  // playlist 
  // webpage_url

  return new Promise((resolve, reject) => {
    exec(`yt-dlp --dump-json ${link}`, { cwd: './music/' }, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      const result = stdout.split("\n")
      const webLinkArray = []
      result.slice(0, (length - 1)).forEach(song => {
        let tempData = JSON.parse(song)


        let tempSong = {
          name: tempData.fulltitle,
          webpage_url: tempData.webpage_url
        }
        webLinkArray.push(tempSong)

      })

      resolve(webLinkArray)
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
  })

  // next we want to know where the link is coming from
  // we have to read the link
  let linkSource = link.split("/", 3)

  if (linkSource[2] == "youtube.com") {
    youtubeDownload(link)
  }
  if (linkSource[2] == "soundcloud.com") {

    // grab some of the information from the links and send back an array of the information we find
    soundcloudDownload(link, resArray.length)
      // //   // now we download the song
      .then(createFile)
      // //   // now we want to use Idntag to double check if our information matches up
      .then(useIdntag)
    // // // now create the songs in our dataBase
    //



  }



}

module.exports = { downLoadSong }

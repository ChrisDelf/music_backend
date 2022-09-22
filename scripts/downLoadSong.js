const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { exec } = require("child_process");

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
const downLoadSong = async (body) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const {link, genre, artist} = body
  const Testname = "https://soundcloud.com/spirit-fingers-bot-musics/sumeru-tavern-lambads-tavern-puspa-cafe-genshin-impact-30-ost-1"
  // going to check if the folder already exist
  // and if it doesn't then we create one
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'music'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', "music"))
    }
    exec(`youtube-dl --get-filename ${link}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      const resArray = stdout.split('.mp3')


      resArray.forEach(song => {

        let songName
        var prefix = song[0][1]
        if (song[0] == "\n") {


          // going to have need to remove the - and id
          for (let i = 0; i < song.length; i++) {
            if (song[i] == "-") {
              // now we check if we can cut off the name
              if (parseInt(song[i + 1]) != undefined && song[i + 1] != " ") {

                songName = song.slice(1, i)
                createSong(songName, song.slice(1), genre, artist)
                break
              } 
            }
          }

        }
        else {
          // going to have need to remove the - and id
          for (let i = 0; i < song.length; i++) {
            if (song[i] == "-") {
              // now we check if we can cut off the name
              if (parseInt(song[i + 1]) != undefined && song[i + 1] != " ") {

                songName = song.slice(0, i)
                createSong(songName, song, genre, artist)
                break
              }
            }
          }
        }
      })

    });
      exec(`youtube-dl ${link}`,{cwd:'./music/'}, (error, stdout, stderr) => {
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
  catch
  {
    console.log(err);
  }

}

module.exports = { downLoadSong }

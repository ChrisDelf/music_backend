const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { exec } = require("child_process");

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const downLoadSong = async (name) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  // const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const Testname = "https://soundcloud.com/spirit-fingers-bot-musics/sumeru-tavern-lambads-tavern-puspa-cafe-genshin-impact-30-ost-1"
  // going to check if the folder already exist
  // and if it doesn't then we create one
  try
  {
  if(!fs.existsSync(path.join(__dirname,'..','music')))
    {
      await fsPromises.mkdir(path.join(__dirname, '..', "music"))
    }
  exec(`youtube-dl --get-filename https://soundcloud.com/gingkaew/sets/genshin-impact-inazuma-ost`, (error, stdout, stderr) => {
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
    console.log(resArray)

    resArray.forEach(song => {
      var prefix = song[0] + song[1]
      if (song[0] == "\n")
      {
      console.log(song.slice(1))
      }
      else
      {
        console.log(song)
      }
    })
   
  });
//   exec(`youtube-dl ${Testname}`, (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
  }
  catch
  {
      console.log(err);
  }

}

module.exports = {downLoadSong}

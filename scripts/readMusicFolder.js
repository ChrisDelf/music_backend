const fs = require("fs");
const path = require("path");
const NodeID3 = require("node-id3");
const Song = require("../models/Song");

//the the path to the folder
const musicFolderPath = path.resolve(__dirname, "..", "music");

async function readMp3File(filePath, file) {
    console.log(file)
    const name = file.split('.mp3')[0]

     newSong = Song.build({
        name: name,
        fileName: file,
        link: "notFromWeb"
      });
      await newSong.save();
}

// Function to iterate through the music folder
function readMusicFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = `${folderPath}/${file}`;

      // Check if the file is an MP3 file
      if (file.endsWith(".mp3")) {
        readMp3File(filePath,file);
      }
    });
  });
}

function checkFolder() {
  readMusicFolder(musicFolderPath);
}

module.exports = checkFolder;

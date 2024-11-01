// const fs = require('node:fs');
const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.argv[2] || ".";

async function ls(folder) {
  let files;
  
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.log("No se pudo leer el directorio", folder);
    process.exit(1);
  }

  const filesPromises = files.map( async (file) => {
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath); // => Información del archivo
    } catch (error) {
      console.log("No se pudo leer", filePath);
      process.exit();
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "-d" : "-f";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleDateString();

    return `${fileType}, ${file.padEnd(20)}, ${fileSize.toString()}, ${fileModified}`;

  })
  const filesInfo = await Promise.all(filesPromises);
  filesInfo.forEach(fileInfo => console.log(fileInfo));
};

ls(folder);

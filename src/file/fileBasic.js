import { Basic } from 'purephp'; // Assuming the correct import path for the Basic class
import { ZipArchive } from 'zip'; // Assuming the correct import path for the ZipArchive class

class FileBasic extends Basic {
  constructor() {
    super();
  }

  writeToFile(fileName, data, format = 'json') {
    try {
      if (format.toLowerCase() === 'csv') {
        this.writeToCSV(fileName, data);
      } else {
        const fs = require('fs');
        fs.writeFileSync(
          fileName,
          `${(format.toLowerCase() === 'json') ? JSON.stringify(data) : data}${require('os').EOL}`
        );
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  writeToCSV(fileName, list) {
    const fs = require('fs');
    const csvWriter = require('csv-writer').createObjectCsvWriter({
      path: fileName,
      header: Object.keys(list[0]).map(key => ({ id: key, title: key })),
    });
    csvWriter.writeRecords(list);
  }

  getBaseNameOfFile(url) {
    const path = require('path');
    return path.basename(url);
  }

  deleteDirectoryAndFiles(directory) {
    const rimraf = require('rimraf');
    rimraf.sync(directory);
  }

  deleteDirectory(directory, recursive = false) {
    const rimraf = require('rimraf');
    rimraf.sync(directory, { glob: { dot: true, maxDepth: recursive ? Infinity : 1 } });
  }

  zipDirectory(srcDir, recursive = false) {
    const path = require('path');
    const fs = require('fs');
    const archiver = require('archiver');
    const output = fs.createWriteStream(`${srcDir}-new.zip`);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('error', err => {
      throw err;
    });
    archive.pipe(output);
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
      const filePath = path.join(srcDir, file);
      if (fs.lstatSync(filePath).isFile()) {
        archive.file(filePath, { name: file });
      } else if (fs.lstatSync(filePath).isDirectory()) {
        archive.directory(filePath, file);
      }
    });
    archive.finalize();
  }
}

export { FileBasic };

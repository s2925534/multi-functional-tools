const fs = require('fs');
const { exec } = require('child_process');
const { FileBasic } = require('@it.specialist/multi-functional-tools/src/file/fileBasic');

class Image extends FileBasic {
  constructor() {
    super();
  }

  generateImageThumbnail(
    sourceImagePath,
    thumbnailImagePath,
    thumbnailWidth = 250,
    thumbnailHeight = 300
  ) {
    const imageFormats = {
      IMAGETYPE_GIF: 'gif',
      IMAGETYPE_JPEG: 'jpeg',
      IMAGETYPE_PNG: 'png'
    };

    const sourceImageType = getImageType(sourceImagePath);

    if (!sourceImageType || !(sourceImageType in imageFormats)) {
      throw new Error('Invalid source image format');
    }

    const sourceImageFormat = imageFormats[sourceImageType];

    const sourceImageSize = getImageSize(sourceImagePath);
    const sourceImageWidth = sourceImageSize.width;
    const sourceImageHeight = sourceImageSize.height;

    let sourceGdImage;
    switch (sourceImageType) {
      case 'IMAGETYPE_GIF':
        sourceGdImage = imagecreatefromgif(sourceImagePath);
        break;
      case 'IMAGETYPE_JPEG':
        sourceGdImage = imagecreatefromjpeg(sourceImagePath);
        break;
      case 'IMAGETYPE_PNG':
        sourceGdImage = imagecreatefrompng(sourceImagePath);
        break;
    }

    if (!sourceGdImage) {
      throw new Error('Failed to create GD image from source');
    }

    const sourceAspectRatio = sourceImageWidth / sourceImageHeight;
    const thumbnailAspectRatio = thumbnailWidth / thumbnailHeight;

    let thumbnailImageWidth;
    let thumbnailImageHeight;

    if (
      sourceImageWidth <= thumbnailWidth &&
      sourceImageHeight <= thumbnailHeight
    ) {
      thumbnailImageWidth = sourceImageWidth;
      thumbnailImageHeight = sourceImageHeight;
    } else if (thumbnailAspectRatio > sourceAspectRatio) {
      thumbnailImageWidth = Math.floor(thumbnailWidth * sourceAspectRatio);
      thumbnailImageHeight = thumbnailHeight;
    } else {
      thumbnailImageWidth = thumbnailWidth;
      thumbnailImageHeight = Math.floor(thumbnailHeight / sourceAspectRatio);
    }

    const thumbnailGdImage = imagecreatetruecolor(
      thumbnailImageWidth,
      thumbnailImageHeight
    );

    imagecopyresampled(
      thumbnailGdImage,
      sourceGdImage,
      0,
      0,
      0,
      0,
      thumbnailImageWidth,
      thumbnailImageHeight,
      sourceImageWidth,
      sourceImageHeight
    );

    imagejpeg(thumbnailGdImage, thumbnailImagePath, 95);

    imagedestroy(sourceGdImage);
    imagedestroy(thumbnailGdImage);

    return true;
  }

  convertPDFToImage(
    fileOriginLocation,
    fileDestinationLocation = null,
    sourceExtension = 'pdf',
    imageOutputFormat = 'jpeg',
    recursive = false,
    noPause = true,
    debug = false,
    xResolution = 300,
    yResolution = 300,
    flattenImages = true,
    useImageMagick = false,
    page = null
  ) {
    const ghostScriptCommand = `gs -o ${fileDestinationLocation}/%03d.${imageOutputFormat} -sDEVICE=${imageOutputFormat} -r${xResolution} ${fileOriginLocation}`;
    const imageMagickCommand = `convert -density ${xResolution}x${yResolution} ${fileOriginLocation}${page ? `[${page}]` : ''} ${fileDestinationLocation}/%03d.${imageOutputFormat}`;

    const command = useImageMagick ? imageMagickCommand : ghostScriptCommand;

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}

function getImageType(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const marker = buffer.toString('hex', 0, 4);

  if (marker === '47494638') {
    return 'IMAGETYPE_GIF';
  } else if (marker.startsWith('ffd8')) {
    return 'IMAGETYPE_JPEG';
  } else if (marker.startsWith('89504e47')) {
    return 'IMAGETYPE_PNG';
  } else {
    return null;
  }
}

function getImageSize(imagePath) {
  const buffer = fs.readFileSync(imagePath);

  let width = 0;
  let height = 0;

  if (buffer.length > 0x58 && buffer.toString('utf-8', 0x52, 0x56) === 'ftyp') {
    width = buffer.readUInt32BE(0x5C);
    height = buffer.readUInt32BE(0x60);
  } else if (
    buffer.length > 0x40 &&
    buffer.toString('utf-8', 0x38, 0x3C) === '8BPS'
  ) {
    width = buffer.readUInt32BE(0x68);
    height = buffer.readUInt32BE(0x6C);
  } else if (
    buffer.length > 0x7A &&
    buffer.toString('utf-8', 0x6E, 0x72) === 'IHDR'
  ) {
    width = buffer.readUInt32BE(0x7A);
    height = buffer.readUInt32BE(0x7E);
  }

  return { width, height };
}

module.exports = { Image };

import { FileBasic } from '@it.specialist/my-package/src/file/fileBasic';

declare module 'image' {
  export class Image extends FileBasic {
    constructor();

    generateImageThumbnail(
      sourceImagePath: string,
      thumbnailImagePath: string,
      thumbnailWidth?: number,
      thumbnailHeight?: number
    ): boolean;

    convertPDFToImage(
      fileOriginLocation: string,
      fileDestinationLocation?: string | null,
      sourceExtension?: string,
      imageOutputFormat?: string,
      recursive?: boolean,
      noPause?: boolean,
      debug?: boolean,
      xResolution?: number,
      yResolution?: number,
      flattenImages?: boolean,
      useImageMagick?: boolean,
      page?: number | null
    ): Promise<string>;
  }
}

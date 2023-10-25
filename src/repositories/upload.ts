import express = require('express');
import sharp = require('sharp');

class UploadRepository {

  configuration: any;

  constructor(configuration: any) {
    this.configuration = configuration;
  }

  async upload(request: express.Request) {
    const uploadType = request.query.type;

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const sampleFile = request.file;

    // Use the mv() method to place the file somewhere on your server
    const baseServerPath: string = `${this.configuration.storagePath}/${uploadType}`;
    const returnPath: string = `${uploadType}`;

    const method: string = 'webp';

    const imagePath: string = `${Date.now().toString()}${sampleFile.filename}_reduced.${method}`;
    const serverPath: string = `${baseServerPath}/${imagePath}`;
    const clientPath: string = `${returnPath}/${imagePath}`;

    const response = await sharp(sampleFile.path).resize({
      width: 600
    }).webp({
      quality: 100,
      force: true
    }).toFile(
        serverPath
    ).then(
        () => `${this.configuration.cdnServer}/${clientPath}`
    );

    return response
  }

}


export default UploadRepository;


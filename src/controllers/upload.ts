import UploadRepository from "../repositories/upload";
import express = require('express');

class UploadController {

  uploadRepository: UploadRepository;

  constructor(app: express.Router, upload: any, uploadRepository: UploadRepository) {
    this.uploadRepository = uploadRepository;

    app.post('/api/upload/image', upload.single('file'), this.upload.bind(this));
    app.get('/api/multimedia/:kind/:multimediaId', this.downloadMultimedia.bind(this));
  }

  async downloadMultimedia(request: any, response: express.Response) {
    const imagePath = await this.uploadRepository.download(response, request.params.kind, request.params.multimediaId);
    response.status(200).sendFile(imagePath);
  }

  async upload (request: any, response: express.Response) {
    if (request.query.type === undefined)
      return response.status(400).send('invalid params: missing type');

    if (!request.file) {
      return response.status(400).send('No files were uploaded.');
    }

    const uploadStatus: string = await this.uploadRepository.upload(request);
    response.status(200).send(uploadStatus);
  }
}

export default UploadController;

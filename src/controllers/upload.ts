import UploadRepository from "../repositories/upload";
import express from 'express';
import {NextFunction} from "express";

class UploadController {

  uploadRepository: UploadRepository;

  constructor(app: express.Router, upload: any, uploadRepository: UploadRepository) {
    this.uploadRepository = uploadRepository;

    app.post('/api/upload/image', upload.single('file'), this.upload.bind(this));
  }

  async upload (request: any, response: express.Response, next: NextFunction) {
    try {
      if (request.query.type === undefined)
        return response.status(400).send('invalid params: missing type');

      if (!request.file) {
        return response.status(400).send('No files were uploaded.');
      }

      const uploadStatus= await this.uploadRepository.upload(request);
      response.status(200).send(uploadStatus);
    }
    catch (error) {
      next(error);
    }
  }
}

export default UploadController;

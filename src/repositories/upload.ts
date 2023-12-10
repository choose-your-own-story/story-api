import express = require('express');

import {ObjectCannedACL, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';

import fs from "fs";

class UploadRepository {

  configuration: any;

  constructor(configuration: any) {
    this.configuration = configuration;
  }

  async upload(request: express.Request) {
    const uploadType = request.query.type;

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const sampleFile = request.file;

    const method: string = 'webp';

    const resizedImageName: string = `${Date.now().toString()}${sampleFile.filename}_reduced.${method}`;
    const resizedImagePath = sampleFile.path;
    // const resizedImagePath = `/tmp/${resizedImageName}`;

    const s3Client = new S3Client({
      endpoint: `https://${this.configuration.doSpacesEndpoint}`, // Find your endpoint in the control panel, under Settings. Prepend "https://".
      forcePathStyle: false, // Configures to use subdomain/virtual calling format.
      region: "us-east-1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (for example, nyc3).
      credentials: {
        accessKeyId: this.configuration.doSpacesKey, // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: this.configuration.doSpacesSecret // Secret access key defined through an environment variable.
      }
    });


    const file = fs.readFileSync(resizedImagePath);

    const params = {
      Bucket: this.configuration.doSpacesName, // The path to the directory you want to upload the object to, starting with your Space name.
      Key: `${uploadType}/${resizedImageName}`, // Object key, referenced whenever you want to access this file later.
      Body: file, // The object's contents. This variable is an object, not a string.
      ACL: ObjectCannedACL.public_read, // Defines ACL permissions, such as private or public.
      Metadata: { // Defines metadata tags.
        "x-amz-meta-my-key": "your-value"
      }
    };


    // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
    const uploadObject = async () => {
      try {
        return await s3Client.send(new PutObjectCommand(params));
      } catch (err) {
        console.log("Error", err);
      }
    };

    await uploadObject();

    return `https://${this.configuration.doSpacesName}.${this.configuration.doSpacesEndpoint}/${uploadType}/${resizedImageName}`;
  }

}


export default UploadRepository;


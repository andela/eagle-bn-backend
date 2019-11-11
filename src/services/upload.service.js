import path from 'path';
import fileUpload from 'express-fileupload';
import sendResult from '../utils/sendResult';
import db from '../database/models/index';
import cloudinary from '../config/clound-config';


const uploadService = {
  success: 0,
  failure: 0,

  checkIfAllUploaded(total, res, data, msg) {
    if (uploadService.success + uploadService.failure === total) return sendResult(res, 201, `${msg} ${uploadService.success}/${uploadService.success + uploadService.failure} Images Uploaded`, data);
  },
  uploadImages(req, res, data, msg) {
    uploadService.success = 0;
    uploadService.failure = 0;
    if (!req.imageArray) return sendResult(res, 200, msg, data);
    const numberofImages = req.imageArray.length;
    data.images = [];
    req.imageArray.forEach((element) => {
      cloudinary.uploader.upload(element.tempFilePath, async (result) => {
        if (result.error) {
          uploadService.failure += 1;
          return uploadService.checkIfAllUploaded(numberofImages, res, data, msg);
        }

        const imageRes = await db.AccommodationImages.create({
          imageurl: result.url,
          accommodationid: data.id,
        });
        data.images.push(imageRes.imageurl);
        uploadService.success += 1;
        return uploadService.checkIfAllUploaded(numberofImages, res, data, msg);
      });
    });
  },
  uploadToCloudinary(req, next) {
    cloudinary.uploader.upload(req.files.avatar.tempFilePath, async (result) => {
      req.imgLink = await result.url;
      next();
    });
  },
  fileUpload: fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '../temp'),
  }),
};

export default uploadService;

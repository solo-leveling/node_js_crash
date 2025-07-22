const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const User = require("../models/User");
const imaginary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
  try {
    // check if file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image",
      });
    }
    //upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store image url and public id along with uploaded user
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    //delete the file from the local storage
    // fs.unlinkSync(req.file.path);

    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      image: newlyUploadedImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong uploading image!Please try again.",
    });
  }
};

const fetchImageController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalImages: totalImages,
        totalPages: totalPages,
        data: images,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong with fetching images.",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    //selecting current image id
    const currentIdOfImage = req.params.id;
    const userId = req.userInfo.userId;
    const image = await Image.findById(currentIdOfImage);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image can't find",
      });
    }

    //check the current user is trying to delete image or not
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can't delete other ppl image.",
      });
    }

    //delete image from imaginary
    await imaginary.uploader.destroy(image.publicId);

    //delete image from folder
    await Image.findByIdAndDelete(currentIdOfImage);

    //delete the file from the local storage
    // fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Something went wrong with deleting images.",
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImageController,
  deleteImageController,
};

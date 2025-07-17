const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      url: result.url,
      publicId: result.publicId,
    };
  } catch (e) {
    console.error("Can't upload on Cloudinary", e);
    throw new Error("Can't upload on Cloudinary");
  }
};

module.exports = { uploadToCloudinary };

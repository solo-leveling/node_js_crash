const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id, // <-- keys name (never change)
    };
  } catch (e) {
    console.error("Can't upload on Cloudinary", e);
    throw new Error("Can't upload on Cloudinary");
  }
};

module.exports = { uploadToCloudinary };

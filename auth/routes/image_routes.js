const express = require("express");
const authMiddleware = require("../middlewares/auth_middleware");
const adminMiddleware = require("../middlewares/admin_middleware");
const uploadMiddleware = require("../middlewares/upload_middleware");
const {
  uploadImageController,
  fetchImageController,
  deleteImageController,
} = require("../controllers/image_controllers");

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

//to get all images
router.get("/get", authMiddleware, fetchImageController);

//to delete images
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  deleteImageController
);

module.exports = router;

const cloudinary = require("cloudinary").v2;

const uploadOnCloudinary = async (imagePath) => {
  const response = await cloudinary.uploader.upload(imagePath, {
    resource_type: "auto",
  });
  return response;
};

module.exports = uploadOnCloudinary;

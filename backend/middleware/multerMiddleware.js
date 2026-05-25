import multer from "multer";
import path from "path";

// 1. Configure Local Disk Buffer Cache
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Ensure an empty folder named 'uploads' exists in your backend root
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Validate Image Extensions
const fileFilter = (req, file, callback) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback(new Error("Error: Only images (jpeg, jpg, png, webp) are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit Max
});

export default upload;
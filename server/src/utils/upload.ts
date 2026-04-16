import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 10, // 10 files
  },
});

export default upload;

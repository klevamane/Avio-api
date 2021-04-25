import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function verifyFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const isValidExtensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const isValidMimetype = filetypes.test(file.mimetype);

  if (isValidExtensionName && isValidMimetype) {
    return cb(null, true);
  }
  return cb('Images Only!');
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    verifyFileType(file, cb);
  },
});

// we can also upload multiple as oppose to just `single`
router.post('/', upload.single('image'), (req, res) => {
  res.send(`${req.file.path}`);
});

export default router;

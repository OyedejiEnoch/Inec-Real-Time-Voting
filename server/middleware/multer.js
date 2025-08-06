import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ dest: "uploads/" })

const imageFileFilter = (req, file, cb) => {
  //   console.log(file);
  if (!file.mimetype.startsWith("image")) {
    cb("Support only image files", false);
  }
  cb(null, true);
};

export const uploadImage = multer({ storage, fileFilter: imageFileFilter });
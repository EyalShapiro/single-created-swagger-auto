import { Router } from 'express';
import multer from 'multer';
const router = Router();

// Storage configuration (example)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

// Create an uploader instance with the storage configuration
const uploader = multer({ storage });

// Upload single file using Multer
router.post('/upload', uploader.single('singleFile'), (req, res) => {
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['singleFile'] = {
            in: 'formData',
            type: 'file',
            required: 'true',
            description: 'Some description...',
    } */

  const file = req.file;
  console.info('Uploaded file info:', file);
  res.json({ message: 'File uploaded successfully', file });
});

// Upload multiple files using Multer
router.post('/uploads', uploader.array('multFiles', 2), (req, res) => {
  /*
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['multFiles'] = {
            in: 'formData',
            type: 'array',
            required: true,
            description: 'Some description...',
            collectionFormat: 'multi',
            items: { type: 'file' }
        } */

  const files = req.files;
  console.info('Uploaded file info:', files);
  res.json({ message: 'File uploaded successfully', files });
});
export default router;

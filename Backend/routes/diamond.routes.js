import express from 'express';
import multer from 'multer';
import { getDiamond, uploadStock, getDiamondById } from '../controllers/diamond.controller.js';
import fs from 'fs'

const router = express.Router();

// csv upload directory
const uploadDir = './public/upload';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Sanitize filename and add timestamp to prevent overwrites
        const fileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, `${Date.now()}-${fileName}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB limit
    }
});

router.post('/upload', upload.single('file'), uploadStock )
router.post('/get', getDiamond)
router.post('/get/:id',getDiamondById)

export default router;
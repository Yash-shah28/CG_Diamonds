import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const router = express.Router();
import {uploaddiamond, showDiamonds, filterDiamonds, getDiamondById} from '../controllers/Diamond.controllers.js';
import jwt from 'jsonwebtoken';
import { checkSellerSession } from '../controllers/seller.controllers.js';

// Authentication middleware
const authenticateSeller = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.sellerId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Ensure upload directory exists
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

// Add file filter for CSV files
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

router.post('/upload', authenticateSeller, upload.single('file'), (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        uploaddiamond(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/diamonds', authenticateSeller, showDiamonds);

router.get('/list', authenticateSeller, showDiamonds);

router.get('/diamonds/filter', authenticateSeller, filterDiamonds);

router.get('/diamonds/:id',authenticateSeller, getDiamondById)


export default router;
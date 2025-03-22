import Diamond from '../models/diamond.models.js'
import csv from 'csvtojson'
import fs from 'fs'
import jwt from 'jsonwebtoken'

export const uploaddiamond = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file uploaded' 
            });
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sellerId = decoded.userId;

        const jsonArray = await csv().fromFile(req.file.path);
        
        if (!jsonArray.length) {
            return res.status(400).json({ 
                success: false,
                message: 'CSV file is empty' 
            });
        }

        const userData = jsonArray.map(row => ({
            stock: row.stock,
            Availability: row.Availability,
            Shape: row.Shape,
            Weight: row.Weight,
            Color: row.Color,
            Clarity: row.Clarity,
            Cut_Grade: row.Cut_Grade,
            Polish: row.Polish,
            Symmetry: row.Symmetry,
            Fluorescence_Intensity: row.Fluorescence_Intensity,
            Fluorescence_Color: row.Fluorescence_Color,
            Measurements: row.Measurements,
            Eye_Clean: row.Eye_Clean,
            Lab: row.Lab,
            Report: row.Report,
            Treatment: row.Treatment,
            Discount: row.Discount,
            Depth: row.Depth,
            Table: row.Table,
            Girdle_Thin: row.Girdle_Thin,
            Girdle_Thick: row.Girdle_Thick,
            Girdle: row.Girdle,
            Girdle_Condition: row.Girdle_Condition,
            Culet_Size: row.Culet_Size,
            Culet_Condition: row.Culet_Condition,
            Crown_Height: row.Crown_Height,
            Crown_Angle: row.Crown_Angle,
            Pavilion_Depth: row.Pavilion_Depth,
            Pavilion_Angle: row.Pavilion_Angle,
            Laser_Inscription: row.Laser_Inscription,
            owner: sellerId
        }));


        // userData.owner = req.user._id;
        await Diamond.insertMany(userData);

        // Clean up - delete the uploaded file
        fs.unlinkSync(req.file.path);

        return res.status(200).json({
            success: true,
            message: 'Data inserted successfully',
            count: userData.length
        });

    } catch (error) {
        // Clean up on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(400).json({
            success: false,
            message: error.message || 'Error processing file'
        });
    }
}

export const showDiamonds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const total = await Diamond.countDocuments();
        const diamonds = await Diamond.find()
            .populate("owner")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            diamonds,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const filterDiamonds = async (req, res) => {
    try {
        const { shapes, clarity, color, minPrice, maxPrice, sortBy } = req.query;
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authentication required' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sellerId = decoded.userId;

        // Build filter query
        let query = { owner: sellerId };

        if (shapes && shapes.length) {
            query.Shape = { $in: shapes };
        }
        if (clarity && clarity.length) {
            query.Clarity = { $in: clarity };
        }
        if (color && color.length) {
            query.Color = { $in: color };
        }
        // if (minPrice || maxPrice) {
        //     query.Price = {
        //         ...(minPrice && { $gte: Number(minPrice) }),
        //         ...(maxPrice && { $lte: Number(maxPrice) })
        //     };
        // }

        // Build sort options
        // let sortOptions = {};
        // switch (sortBy) {
        //     case 'priceAsc':
        //         sortOptions = { Price: 1 };
        //         break;
        //     case 'priceDesc':
        //         sortOptions = { Price: -1 };
        //         break;
        //     default:
        //         sortOptions = { createdAt: -1 };
        // }


        const diamonds = await Diamond.find(query)
            .populate('owner', 'email fullname');


        res.status(200).json({
            success: true,
            diamonds,
            total: diamonds.length,
            totalPages: Math.ceil(diamonds.length / 20)
        });

    } catch (error) {
        console.error('Filter error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getDiamondById = async (req, res) => {
    try {
        const diamond = await Diamond.findById(req.params.id)
            .populate('owner', 'fullname email');

        if (!diamond) {
            return res.status(404).json({
                success: false,
                message: 'Diamond not found'
            });
        }

        res.status(200).json({
            success: true,
            diamond
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


import express from 'express';
import { registerUser, loginUser, getUserInfo }  from "../controllers/authControllers.js"
import requireAuth from '../middleware/authMiddleware.js';
import upload from '../config/cloudinaryConfig.js';

const router = express.Router()
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', requireAuth, getUserInfo);


router.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const imageUrl = req.file.path;
        res.status(200).json({
            message: 'File uploaded successfully!',
            imageUrl
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            message: 'Upload failed!',
            error: error.message
        });
    }
});



export default router;
import express from 'express'
import { body } from 'express-validator';
const router = express.Router();
import { loginUser, registerUser } from "../controllers/user.controllers.js";


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')],loginUser);

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 Character long'),
    body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage('Password must contain uppercase, lowercase and numbers')] ,registerUser);


// router.get('/logout');


export default router;
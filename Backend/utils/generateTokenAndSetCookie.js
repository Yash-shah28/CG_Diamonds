import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token will expire in 7 day
    });

    // Set the token in a cookie
    res.cookie('token', token, {
        httpOnly: true, //XSS protection, cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // CSRF protection  
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
}
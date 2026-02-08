const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// פונקציה להגנה על נתיבים - רק משתמש מחובר יכול לעבור
const protect = async (req, res, next) => {
    let token;

    // בודק אם נשלח טוקן ב-Header תחת Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // חילוץ הטוקן מהמחרוזת (הסרת המילה Bearer)
            token = req.headers.authorization.split(' ')[1];

            // אימות הטוקן מול הסוד שבקובץ ה-.env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // מציאת המשתמש במסד הנתונים והצמדתו לאובייקט req (בלי הסיסמה)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // ממשיכים לפונקציה הבאה בבקר
        } catch (error) {
            res.status(401);
            next(new Error('לא מורשה, הטוקן נכשל'));
        }
    }

    if (!token) {
        res.status(401);
        next(new Error('לא מורשה, אין טוקן'));
    }
};

// פונקציה לבדיקת אדמין - רק מי שמוגדר כ-admin יכול לעבור
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); // Forbidden
        next(new Error('גישה נדחתה: נדרשת הרשאת מנהל'));
    }
};

module.exports = { protect, adminOnly };
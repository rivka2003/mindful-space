const express = require('express');
const router = express.Router();
const { 
    register,
     login, 
     getMe,
     getUsers,      // <-- זה מה שהיה חסר
     updateProfile, 
     deleteMe 
    } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// נתיבים פתוחים (אין צורך בטוקן)
router.post('/register', register);
router.post('/login', login);

// נתיב מוגן (דורש טוקן ב-Header)
router.get('/me', protect, getMe);


// נתיבי ה-CRUD החדשים
router.get('/', protect, adminOnly, getUsers); // רק אדמין יכול לראות את כל הרשימה
router.put('/profile', protect, updateProfile); // משתמש מעדכן את עצמו
router.delete('/delete', protect, deleteMe);    // משתמש מוחק את עצמו


module.exports = router;
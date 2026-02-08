const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// פונקציית עזר ליצירת JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// הרשמת משתמש חדש
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('המשתמש כבר קיים במערכת');

    // הצפנת הסיסמה לפני השמירה
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
};

// התחברות משתמש קיים
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });

    // בדיקה אם המשתמש קיים ואם הסיסמה תואמת למה שמוצפן ב-DB
    if (user && (await bcrypt.compare(password, user.password))) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        };
    } else {
        throw new Error('אימייל או סיסמה שגויים');
    }
};

// שליפת כל המשתמשים (לאדמין)
const getAllUsers = async () => {
    return await User.find({}).select('-password'); // מחזיר הכל חוץ מהסיסמאות
};

// עדכון פרופיל משתמש
const updateUserProfile = async (userId, updateData) => {
    // אם המשתמש מנסה לעדכן סיסמה, צריך להצפין אותה מחדש
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $set: updateData }, 
        { new: true, runValidators: true } // new: true מחזיר את האובייקט המעודכן
    ).select('-password');

    return updatedUser;
};

// מחיקת משתמש
const deleteUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('משתמש לא נמצא');
    await user.deleteOne();
    return { message: 'המשתמש נמחק בהצלחה' };
};

module.exports = { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    updateUserProfile, 
    deleteUser 
};
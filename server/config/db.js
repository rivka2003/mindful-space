const mongoose = require('mongoose');

// פונקציה שתפקידה רק לחבר אותנו לבסיס הנתונים
const connectDB = async () => {
    try {
        // שימי לב: החלפנו את הכתובת הארוכה במשתנה process.env.MONGO_URI
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB via .env config!');
    } catch (err) {
        console.error('Connection error:', err);
        // אם החיבור נכשל, אנחנו רוצים לסגור את התהליך כי השרת לא יכול לעבוד בלי דאטה-בייס
        process.exit(1);
    }
};

module.exports = connectDB;
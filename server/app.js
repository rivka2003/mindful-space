require('dotenv').config(); // טוען את המשתנים מקובץ ה-.env לזיכרון של השרת
// 1. ייבוא הספרייה אקספרס
const express = require('express');
const connectDB = require('./config/db'); 
const mantraRoutes = require('./routes/mantraRoutes'); // ייבוא הנתיבים
const userRoutes = require('./routes/userRoutes'); // 1. ייבוא הנתיבים של המשתמשים
const { errorHandler } = require('./middleware/errorMiddleware');
// 2. יצירת מופע של השרת
const app = express();
// 3. הגדרת הפורט (ה"שער") שדרכו השרת יקשיב לנו
const PORT = 5000;

// מפעילים את החיבור לבסיס הנתונים
connectDB();

// הגדרת "נקודת קצה" (Endpoint) למנטרות
// כל מה שמתחיל ב-/api/mantras יעבור לקובץ ה-Routes שלנו
app.use('/api/mantras', mantraRoutes);

app.use(express.json()); // השורה הזו קריטית כדי לקרוא את ה-Body מהפוסטמן
app.use('/api/users', userRoutes);


app.use(errorHandler);


// 4. נתיב בדיקה בסיסי - כשנכנס לכתובת הראשית, נראה הודעה
app.get('/', (req, res) => {
    res.send('Mindful Space Server is Running!');
});

// 5. הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is moving on http://localhost:${PORT}`);
});


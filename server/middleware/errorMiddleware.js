const errorHandler = (err, req, res, next) => {
    // אם לא הוגדר סטטוס שגיאה, נשתמש ב-500 (שגיאת שרת כללית)
    const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    
    res.status(statusCode).json({
        message: err.message,
        // נראה את פירוט השגיאה רק אם אנחנו במצב פיתוח
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };

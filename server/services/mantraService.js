const Mantra = require('../models/mantraModel');

// פונקציה ליצירת מנטרה חדשה
const createMantra = async (mantraData) => {
    // יצירת מופע חדש של מנטרה לפי המודל
    const newMantra = new Mantra(mantraData);
    // שמירה בבסיס הנתונים (מחזיר Promise, לכן נשתמש ב-await)
    return await newMantra.save();
};


const getAllMantras = async () => {
    // find() בלי פרמטרים פשוט מחזיר את כל הרשימה מהדאטה-בייס
    return await Mantra.find();
};

module.exports = {
    createMantra,
    getAllMantras
};
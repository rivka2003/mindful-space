const mantraService = require('../services/mantraService');

const createMantra = async (req, res) => {
    try {
        // req.body מכיל את המידע שהמשתמש שלח (טקסט וקטגוריה)
        const mantra = await mantraService.createMantra(req.body);
        // מחזירים תשובת הצלחה (201 - Created) יחד עם האובייקט שנוצר
        res.status(201).json(mantra);
    } catch (error) {
        // אם קרתה שגיאה (לשל חסר שדה חובה), נחזיר שגיאה
        next(error); // זה שולח את השגיאה ישר ל-Middleware שיצרנו!
    }
};

const getAllMantras = async (req, res) => {
    try {
        const mantras = await mantraService.getAllMantras();
        res.status(200).json(mantras); // 200 זה קוד של "הכל עבר בהצלחה"
    } catch (error) {
        next(error);} // זה שולח את השגיאה ישר ל-Middleware שיצרנו!
}; 

module.exports = {
    createMantra,
    getAllMantras
};
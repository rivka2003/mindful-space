const express = require('express');
const router = express.Router();
const mantraController = require('../controllers/mantraController');

// כאשר מגיעה בקשת POST לכתובת הזו, הפעל את הבקר ליצירת מנטרה
router.post('/', mantraController.createMantra);

router.get('/', mantraController.getAllMantras);

module.exports = router;
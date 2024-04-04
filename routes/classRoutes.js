const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.getClasses);
router.post('/', classController.createNewClass);
router.get('/:id', classController.getClass);

module.exports = router;
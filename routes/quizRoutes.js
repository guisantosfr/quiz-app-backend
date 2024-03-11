const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getQuizzes);
router.post('/', quizController.createNewQuiz);

module.exports = router;
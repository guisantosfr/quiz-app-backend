const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getQuizzes);
router.post('/', quizController.createNewQuiz);
router.get('/:id', quizController.getQuiz);

module.exports = router;
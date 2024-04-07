const Question = require("../models/question");
const Quiz = require("../models/quiz");

const generateUniqueID = require('../helpers/generateUniqueID');

const createNewQuiz = async (req, res) => {
    const { name, questions } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'Questionário sem nome' });
    }
  
    if (!questions || questions.length === 0) {
      return res.status(400).json({ error: 'Os dados das questões não foram encontrados' });
    }
  
    const savedQuestionReferences = []
  
    for (const questionData of questions) {
      const newQuestion = new Question({
        subject: questionData.subject,
        topic: questionData.topic,
        question: questionData.question,
        answer: questionData.answer
      });
  
      const savedQuestion = await newQuestion.save();
      savedQuestionReferences.push(savedQuestion._id);
    }
  
    const newQuiz = new Quiz({
      name,
      code: generateUniqueID(),
      questions: savedQuestionReferences
    });
  
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
};

const getQuizzes = async (req, res) => {
    const quizzes = await Quiz.find({});
    res.status(200).json(quizzes);
};

const getQuiz = async (req, res) => {
  const quizFound = await Quiz.findById(req.params.id);

  if (!quizFound) {
    return res.status(400).json({ error: 'Questionário não encontrado' });
  }

  await quizFound.populate('questions');

  res.status(200).json(quizFound);
}

module.exports = {
    createNewQuiz,
    getQuizzes,
    getQuiz
}
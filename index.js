const express = require('express')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')

const Student = require('./models/student')
const Class = require('./models/class')
const Question = require('./models/question')
const Quiz = require('./models/quiz')

const generateUniqueID = require('./helpers/generateUniqueID');

const app = express()
const PORT = process.env.PORT || 3000

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to ${error.message}`))

app.use(cors())
app.use(express.json())

app.post('/classes', async (req, res) => {
  const { name, students } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Turma sem nome' });
  }

  if (!students || students.length === 0) {
    return res.status(400).json({ error: 'Os dados dos alunos não foram encontrados' });
  }

  const savedStudentReferences = []

  for (const studentData of students) {
    const newStudent = new Student({
      id: studentData.id,
      name: studentData.name,
      email: studentData.email,
    });

    const savedStudent = await newStudent.save();
    savedStudentReferences.push(savedStudent._id);
  }

  const newClass = new Class({
    name,
    students: savedStudentReferences
  });

  const savedClass = await newClass.save();
  res.status(201).json(savedClass);
})

app.post('/quizzes', async (req, res) => {
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
})

app.get('/classes', async (req, res) => {
  const classes = await Class.find({});
  res.status(200).json(classes);
})

app.get('/quizzes', async (req, res) => {
  const quizzes = await Quiz.find({});
  res.status(200).json(quizzes);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
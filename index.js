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
  const { className, students } = req.body;

  try {
    const savedStudentReferences = []

    for (const studentData of students) {
      const newStudent = new Student({
        matricula: studentData.matricula,
        name: studentData.name,
        email: studentData.email,
      });

      const savedStudent = await newStudent.save();
      savedStudentReferences.push(savedStudent._id);
    }

    const newClass = new Class({
      className,
      students: savedStudentReferences
    });

    const savedClass = await newClass.save();
    console.log('Class and students data saved successfully:', savedClass);
  } catch (error) {
    console.error('Error:', error);
  }

  res.status(201).send(req.body)
})

app.post('/quizzes', async (req, res) => {
  const { quizName, questions } = req.body;

  try {
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
      quizName,
      quizCode: generateUniqueID(),
      questions: savedQuestionReferences
    });

    const savedQuiz = await newQuiz.save();
    console.log('Quiz and Questions data saved successfully:', savedQuiz);
  } catch (error) {
    console.error('Error:', error);
  }

  res.status(201).send(req.body)
})

app.get('/classes', async (req, res) => {
  const classes = await Class.find({})
  res.json(classes)
})

app.get('/quizzes', async (req, res) => {
  const quizzes = await Quiz.find({})
  res.json(quizzes)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
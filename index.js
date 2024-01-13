const express = require('express')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')

const Student = require('./models/student')
const Class = require('./models/class')

const app = express()
const PORT = 3000

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

app.post('/quizzes', (req, res) => {
  const { name, questions } = req.body

  res.status(201).send(req.body)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
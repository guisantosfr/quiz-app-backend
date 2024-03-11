const express = require('express')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000

const classRoutes = require('./routes/classRoutes');
const quizRoutes = require('./routes/quizRoutes');

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(`Error connecting to ${error.message}`))

app.use(cors())
app.use(express.json())

app.use('/classes', classRoutes);
app.use('/quizzes', quizRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
const Class = require('../models/class');
const Student = require('../models/student');

const createNewClass = async (req, res) => {
    const { name, students } = req.body;

    if (!name) {
      return res.status(404).json({ error: 'Turma sem nome' });
    }
  
    if (!students || students.length === 0) {
      return res.status(404).json({ error: 'Os dados dos alunos não foram encontrados' });
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
}

const getClasses = async (req, res) => {
    const classes = await Class.find({});
    res.status(200).json(classes);
}

const getClass = async (req, res) => {
  const classFound = await Class.findById(req.params.id).exec();
 
  if (!classFound) {
    return res.status(404).json({ error: 'Turma não encontrada' });
  }

  res.status(200).json(classFound);
}

module.exports = {
  createNewClass,
  getClasses,
  getClass
}
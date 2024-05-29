const { createHash } = require('node:crypto');
const User = require('../models/user');

const hashPassword = password => {
    return createHash('sha512').update(password).digest('hex');
}

const newUser = async (req, res) => {
    const { email, name, isTeacher, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: "Username with this email already exists" });
    }

    if (password.length < 5) {
        return res.status(400).json({ error: 'Password must be at least 5 characters long' })
    }

    const passwordHash = hashPassword(password);

    const user = new User({
        email,
        name,
        isTeacher,
        passwordHash
      })
    
      const savedUser = await user.save();
    
      res.status(201).json(savedUser);
} 

module.exports = {
    newUser
};
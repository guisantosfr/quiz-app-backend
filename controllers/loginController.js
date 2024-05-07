const { createHash } = require('node:crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const hashPassword = password => {
    return createHash('sha512').update(password).digest('hex');
}

const compareHashPassword = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword;
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const passwordCorrect = user === null
    ? false
    : compareHashPassword(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid email or password'
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id
      }
    
      const token = jwt.sign(userForToken, process.env.SECRET);
    
      res.status(200).send({
        token, email: user.email, name: user.name
      })
}

module.exports = { login };
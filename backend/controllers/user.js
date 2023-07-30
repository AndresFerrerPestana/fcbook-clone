const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    } = req.body;

    // FIRST NAME VALIDATION
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'First name must be between 3 and 30 characters.',
      });
    }

    // LAST NAME VALIDATION
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'Last name must be between 3 and 30 characters.',
      });
    }

    // EMAIL VALIDATION
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address',
      });
    }

    // console.log(validateEmail(email));

    const check = await User.findOne({ email: email });

    if (check) {
      return res.status(400).json({
        message: 'Email address already taken. Please try with another one.',
      });
    }

    // PASSWORD VALIDATION
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.',
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 12);
    // console.log(bcryptPassword);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    return;

    const user = await new User({
      first_name,
      last_name,
      email,
      password: bcryptPassword,
      username: newUsername,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'invalid email address',
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          'This email address already exists,try with a different email address',
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'first name must between 3 and 30 characters.',
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'last name must between 3 and 30 characters.',
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'password must be atleast 6 characters.',
      });
    }

    const bcryptPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    return;
    const user = await new User({
      first_name,
      last_name,
      email,
      password: bcryptPassword,
      username: newUsername,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    }).save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 */

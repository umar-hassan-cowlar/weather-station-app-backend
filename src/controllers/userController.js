const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

// find all
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

// find one
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await User.findByPk(userId);

    if (!users) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

// add a new user
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exist
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    // encrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

// update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updatedUser = await user.update(req.body);

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

// delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const deletedUser = await user.destroy();

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const secretKey = "hugwhfowfwfklewjf458787854458844545";

// Register a new user
module.exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, password: hashedPassword });
    res.status(201).json("User Created");
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

// Login user
module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};

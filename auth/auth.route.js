const { Router } = require("express");
const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return res.status(400).json({ message: "wrong params" });

  const existUser = await usersModel.findOne({ email });
  if (existUser)
    return res.status(400).json({ message: "user alreadt exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await usersModel.create({ fullName, email, password: hashedPassword });
  res.status(201).json({ message: "user created successfully" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "email or password is incorrect" });

  const existUser = await usersModel.findOne({ email });
  if (!existUser)
    return res.status(400).json({ message: "email or password is incorect" });

  const isPasswordequal = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordequal)
    return res.status(400).json({ message: "email or password is incoorect" });

  const payLoad = {
    userId: existUser._id,
  };

  const token = jwt.sign(payLoad.process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = authRouter;

const { Router } = require("express");
const expensesModel = require("../models/expenses.model");
const usersModel = require("../models/users.model");


const expenseRouter = Router();

expenseRouter.get("/", async (req, res) => {
  const expense = await expensesModel.find();
  res.json(expense);
});

expenseRouter.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "title or content is required" });
  const newExpense = await expensesModel.create({
    title,
    content,
    user: req.userId,
  });
  await usersModel.findByIdAndUpdate(req.userId, {
    $push: { expenses: newExpense._id },
  });
  res.status(201).json({ newExpense });
});

module.exports = expenseRouter;

const { Router } = require("express");
const expensesModel = require("../models/expenses.model");

const expenseRouter = Router();

expenseRouter.get("/", async (req, res) => {
  const expense = await expensesModel.find();
  res.json(expense);
});

module.exports = expenseRouter;

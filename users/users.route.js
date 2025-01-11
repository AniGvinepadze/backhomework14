const { Router } = require("express");
const usersModel = require("../models/users.model");
const { isValidObjectId } = require("mongoose");
const isAuth = require("../middlewares/isAuth.middleware");
const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await usersModel.find().select("-password");
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "your id isnt valid" });

  const user = await usersModel.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "user not found" });
  res.json(user);
});

userRouter.delete("/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "your id is not valid" });
  const user = await usersModel.findByIdAndDelete(id);
  if (!user) res.status(400).json({ message: "user didnt delete" });
  res.json({ message: "user deleted succsessfully", data: user });
});

userRouter.put("/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    return res.status(400).json({ message: "your id is not valid" });

  const { fullName, email } = req.bodyconst;
  const updateReq = {};
  if (fullName) updateReq.fullName = fullName;
  if (email) updateReq.email = email;

  const user = await usersModel.findByIdAndUpdate(id, updateReq, { new: true });
  if (!user) res.status(400).json({ message: "user didnt update" });
  res.json({ message: "user updated succsessfully", data: user });
});

module.exports = userRouter;

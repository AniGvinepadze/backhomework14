const { default: mongoose } = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title:String,
    content:String,

    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',default:[]}
})

module.exports = mongoose.model("expense",expenseSchema)
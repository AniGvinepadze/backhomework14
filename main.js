// მოგესალმებით თქვენი დავალება შემდეგია

// 1) დააიმპლემენტირეთ ავტორიზაცია რეგისტრაცია ისევე როგორც ვქენით ლექციაზე.
// 2) იუზერებს პოსტების ნაცვლად ექნება იქსფენსები ანუ ხარჯები
// 3) ხარჯების ქრადი უნდა იყოს დაცული როუტი რაც იმას ნიშნავს რო თუ ჰედერში ვალიდურ ტოკენს არ გაატან არ უნდა მოგცეს წვდომა
// 4) გააკეთეთ მიდლვიარი რომელიც შეამოწმებს ვალიდურია თუ არა თქვენს მიერ გადაცემული ტოკენი.



const express = require("express")
const userRouter = require("./users/users.route")
const authRouter = require("./auth/auth.route")
const connectToDb = require("./db/connectToDb")
const isAuth = require("./middlewares/isAuth.middleware")
const expenseRouter = require("./expenses/expnses.route")

const app = express()
app.use(express.json())

connectToDb()

app.use("/users",userRouter)
app.use('/auth',authRouter)
app.use("/expenses",isAuth,expenseRouter)

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(3000,()=>{
    console.log("running on http://localhost:3000")
})
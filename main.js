// მოგესალმებით თქვენი დავალება შემდეგია

// 1) დააიმპლემენტირეთ ავტორიზაცია რეგისტრაცია ისევე როგორც ვქენით ლექციაზე.
// 2) იუზერებს პოსტების ნაცვლად ექნება იქსფენსები ანუ ხარჯები
// 3) ხარჯების ქრადი უნდა იყოს დაცული როუტი რაც იმას ნიშნავს რო თუ ჰედერში ვალიდურ ტოკენს არ გაატან არ უნდა მოგცეს წვდომა
// 4) გააკეთეთ მიდლვიარი რომელიც შეამოწმებს ვალიდურია თუ არა თქვენს მიერ გადაცემული ტოკენი.




// 1) იუზერების სქემას დაუმატებთ expenses: [] მასივს სადაც ჩასეტავთ ყოველ ახალ დამატებულ იქსფენს.
// 2) იქსფენსების სქემას დაუმატებთ user: user._id სადაც ჩაისეტება რომელმა იუზერმაც შექმნა ეს იქნფენსი იმის აიდი. აიდის აიღებთ ტოკენიდან.
// 3) იქსფენსის წაშლა/აფდეითის დროს უნდა შეამოწმოთ გადმოცემული იქსფენსის აიდი მართლა თუ არის user-ს რომ expenses გააჩნია ამ მასივში, თუ არ არის ვერც წაშლის და ვერც დააფდეითებს. ანუ იუზერს უნდა ჰქონდეს მხოლოდ თავისი შექმნილი იქსფენსის წაშლის და დააფდეითების უფლება


const express = require("express")
const userRouter = require("./users/users.route")
const authRouter = require("./auth/auth.route")
const connectToDb = require("./db/connectToDb")

const expenseRouter = require("./expenses/expnses.route")
const isAuth = require("./middlewares/isAuth.middleware")

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
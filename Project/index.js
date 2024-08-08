const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const employeeRouter = require("./router/employeeRouter")
const authRouter = require("./router/authRouter")

const app = express()
app.use(cors())
const SECRET_KEY="super-secret-key"

const dbURL="mongodb+srv://emrecan:emre123@cluster0.edgingg.mongodb.net/NodePro1?retryWrites=true&w=majority&appName=Cluster0"
mongoose
    .connect(dbURL)
    .then(()=>{
        app.listen(3000,()=>{
            console.log("Server connected")
        })
    })
    .catch((error)=>{
        console.log("Server error")
    })


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/",authRouter)
app.use("/employee",employeeRouter)


app.get("/data",(req,res)=>{
    res.send("hello data sir")
})
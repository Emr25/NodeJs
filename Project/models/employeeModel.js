const mongoose  = require("mongoose")

const employeeSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})
const Employee = mongoose.model("employee",employeeSchema)
module.exports=Employee
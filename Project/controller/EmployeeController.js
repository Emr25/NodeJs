const Employee = require("../models/employeeModel")
const express = require("express")
const mongoose = require("mongoose")

module.exports.get_all=async (req,res)=>{
    try {
        const employees=await Employee.find()
        res.status(200).json(employees)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
module.exports.get_single=async(req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:"Employee id is not found"})

        const employee= await Employee.findById(id)
        if(!employee) return

        res.status(200).json(employee)
    } catch (error) {
        res.status(404).json({message:"Employee not found"})
    }

}

module.exports.post_employee= async(req,res)=>{
    try {
        const newEmployee = new  Employee({
            title:req.body.title,
            content:req.body.content,
            price:req.body.price,
            image:req.body.image
            })
        await newEmployee.save()
        res.json("Kayıt işlemi yapıldı")

    } catch (error) {
        res.status(404).json({message:"Kayıt yapılmadı"})
    }
}
module.exports.update_employee=async(req,res)=>{
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:"Employee not found"})
        
        const {title,content,price,image} = req.body
        const updatedEmployee= await Employee.findByIdAndUpdate(
            id,{ title,content,price,image,_id:id},
               {new:true}
         )
         res.status(200).json(updatedEmployee)
        
    } catch (error) {
       console.log(error.message)
       res.json({message:"updated failed"})
        
    }
}

module.exports.delete_employee=async(req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({message:"employee id not found"})
        await Employee.findByIdAndDelete(id)
        res.status(200).json({message:"Employee deleted"})
    } catch (error) {
        console.log(error.message)
        res.json({message:"Employee delete failed"})
    }
}


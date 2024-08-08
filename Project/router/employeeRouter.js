const router = require("express").Router()
const {get_all,get_single,post_employee,update_employee,delete_employee}=require("../controller/EmployeeController")
const {verifyToken} = require("../middlewares/auth")
router.post("/",post_employee)
router.get("/",get_all)
router.get("/:id",get_single)
router.put("/:id",update_employee)
router.delete("/:id",delete_employee)

module.exports=router
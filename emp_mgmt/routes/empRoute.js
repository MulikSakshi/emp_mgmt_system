const express =  require('express')
const empController = require('../controllers/empController')

const router = express.Router()

router.get('/getAllEmp', empController.getAllEmp)

router.post('/createEmp',empController.createEmp)

router.delete('/delEmp/:ID',empController.deleteEmp)

router.patch('/updateEmp/:ID',empController.updateEmp)

router.get('/getempId/:ID',empController.getempId)

router.get('/department',empController.getDepartmentWiseEmployee)

router.get('/joining-month',empController.getJoiningMonthWiseEmployee)

router.get('/monthBirthdayEmployee/:month', empController.getThisMonthBirthdayEmployee)

router.get('/searchbyname',empController.searchEmpByName)

router.get('/search-city',empController.searchEmpByCity)

router.get('/sortEmployeeByJoiningDate',empController.sortEmployeeByJoiningDate)

router.get('/sortEmployeeByName',empController.sortEmployeeByName )

router.get('/getTotalEmployeeCount',empController.getTotalEmployeeCount)

router.get('/getDepartmentWiseCount',empController.getDepartmentWiseCount)

router.get('/getOldestEmployee', empController.getOldestEmployee)

router.get('/getNewestJoinedEmployee', empController.getNewestJoinedEmployee)

router.get('/filterEmployeesByJoiningDate', empController.filterEmployeesByJoiningDate)

router.put('/updateCompleteEmployeeDetails/:ID', empController.updateCompleteEmployeeDetails)

//http://localhost:5004/emp/getAllEmp
//http://localhost:5004/emp/createEmp
//http://localhost:5004/emp/delEmp
//http://localhost:5004/emp/updateEmp
//http://localhost:5004/emp/getEmployeeById
//http://localhost:5004/emp/department?department=hr
//http://localhost:5004/emp/joining-month?month=11
//localhost:5004/emp/monthBirthdayEmployee/12
//localhost:5004/emp/searchbyname?name=amit
//http://localhost:5004/emp/serach-city?city=sangli
//http://localhost:5004/emp/sortEmployeeByJoiningDate
//http://localhost:5004/emp/sortEmployeeByName
//http://localhost:5004/emp/filterEmployeesByJoiningDate?start=2022-01-01&end=2024-12-31
module.exports = router
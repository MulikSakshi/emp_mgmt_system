const emp = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    address: "Pune, Maharashtra",
    contactNumber: "9876543210",
    dateOfBirth: "1999-05-14",
    joiningDate: "2024-01-10",
    department: "IT",
  },
  {
    id: 2,
    name: "Priya Patil",
    email: "priya@example.com",
    address: "Mumbai, Maharashtra",
    contactNumber: "9876501234",
    dateOfBirth: "2000-08-22",
    joiningDate: "2023-11-15",
    department: "HR",
  },
  {
    id: 3,
    name: "Amit Joshi",
    email: "amit@example.com",
    address: "Nashik, Maharashtra",
    contactNumber: "9988776655",
    dateOfBirth: "1998-12-05",
    joiningDate: "2022-06-20",
    department: "Finance",
  },
];
//get all employees
const getAllEmp = (req, res) => {
  try {
    res.status(200).send({ employees: emp });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
};

//create Employee
function createEmp(req, res) {
  try {
    const {
      name,
      email,
      address,
      contactNumber,
      dateOfBirth,
      joiningDate,
      department,
    } = req.body;

    const newEmp = {
      id: Date.now(),
      name: name,
      email: email,
      address: address,
      contactNumber: contactNumber,
      dateOfBirth: dateOfBirth,
      joiningDate: joiningDate,
      department: department,
    };
    emp.push(newEmp);
    res.status(200).send({ msg: "Emp Added Successfully" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
}

function deleteEmp(req, res) {
  const { ID } = req.params;
  try {
    const index = emp.findIndex((e) => e.id == ID);
    if (index == -1) {
      res.status(400).send({ msg: "Employee not found" });
    }
    emp.splice(index, 1);
    res.status(200).send({ msg: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
}

const updateEmp = (req, res) => {
  const { ID } = req.params;
  const { address } = req.body;
  try {
    const index = emp.findIndex((e) => e.id == ID);
    console.log(index);
    if (index == -1) {
      res.status(404).send({ message: "Employee not found" });
    }
    emp[index].address = address;
    res.status(200).send({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const getempId = (req, res) => {
  try {
    const id = Number(req.params.ID);

    const employee = emp.find((e) => e.id === id);

    if (!employee) {
      res.status(400).send({ message: "Employee not found" });
    }

    res.status(200).send({ message: "Getting employee by ID", data: employee });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

const getDepartmentWiseEmployee = (req, res) => {
  try {
    const { department } = req.query.department;

    if (!department) {
      res.status(400).send({ msg: "No employee founding this department" });
    }
    const result = emp.filter(
      (e) => e.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).send({ msg: "Department wise Employee", result });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

const getJoiningMonthWiseEmployee = (req, res) => {
  try {
    const { month } = req.query.month;

    if (!month) {
      res.status(400).send({ msg: "Month required" });
    }
    const result = emp.filter((e) => {
      const joiningMonth = new Date(e.joiningDate).getMonth() + 1;
      return joiningMonth == Number(month);
    });
    res.status(200).send({ msg: "Joining Month Wise Employee", result });
  } catch (error) {
    res.status(500).send({ msg: "server error" });
  }
};

const getThisMonthBirthdayEmployee = (req, res) => {
  try {
    const { month } = req.params;

    const result = emp.filter((e) => {
      const birthMonth = new Date(e.dateOfBirth).getMonth() + 1;

      return birthMonth == month;
    });

    if (result.length === 0) {
      return res.status(404).send({
        message: "No birthday employees found",
      });
    }

    res.status(200).send({
      employees: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

const searchEmpByName = (req, res) => {
  try {
    const { name } = req.query.name;

    if (!name) {
      res.status(400).send({ msg: "Name is Required" });
    }

    const result = emp.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    res.status(200).send({ msg: "Employee search result", result });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

const searchEmpByCity = (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).send({
        msg: "City is Required",
      });
    }

    const result = emp.filter((e) =>
      e.address.toLowerCase().includes(city.toLowerCase())
    );

    return res.status(200).send({
      msg: "Get Employee City Wise",
      result,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
    });
  }
};

//API to sort employees by joining date
const sortEmployeeByJoiningDate = (req, res) => {
  try {
    const sortedEmployees = [...emp].sort(
      (a, b) => new Date(a.joiningDate) - new Date(b.joiningDate)
    );

    res
      .status(200)
      .send({
        msg: "Sort Employee By Joining Date",
        employees: sortedEmployees,
      });
  } catch (error) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

//sort employee by name A-Z
const sortEmployeeByName = (req, res) => {
  try {
    const sortedEmployees = [...emp].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.status(200).send({
      msg: "Employees sorted by name (A-Z)",
      employees: sortedEmployees,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const getTotalEmployeeCount = (req, res) => {
  try {
    const count = emp.length;

    res
      .status(200)
      .send({ msg: "Total Employee count", totalEmployees: count });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

const getDepartmentWiseCount = (req, res) => {
  try {
    const counts = {};

    emp.forEach((e) => {
      const dept = e.department.trim().toLowerCase();

      if (counts[dept]) {
        counts[dept]++;
      } else {
        counts[dept] = 1;
      }
    });

    res.status(200).send({ msg: "Department wise employee count", data: counts});

  } catch (error) {
    res.status(500).send({message: "Server error"});
  }
};

//Get Oldest Employee
const getOldestEmployee = (req, res) => {

  try {

      const oldestEmployee = [...emp].sort(
          (a, b) =>
              new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
      )[0];

      res.status(200).send({msg: "Get Oldest Employee", employee: oldestEmployee});

  } catch (error) {

      res.status(500).send({message: "Server error" });
  }
};

// GET NEWEST JOINED EMPLOYEE
const getNewestJoinedEmployee = (req, res) => {

  try {

      const newestEmployee = [...emp].sort((a, b) =>
              new Date(b.joiningDate) - new Date(a.joiningDate)
      )[0];

      res.status(200).send({msg: "Get Newest Joined Employee", employee: newestEmployee});

  } catch (error) {

      res.status(500).send({ message: "Server error"});
  }
};


// FILTER EMPLOYEES BETWEEN TWO JOINING DATES
const filterEmployeesByJoiningDate = (req, res) => {

  try {

      const { start, end } = req.query;

      if (!start || !end) {
          return res.status(400).send({
              message: "Start and End dates are required"
          });
      }

      const result = emp.filter((e) => {

          const joiningDate =
              new Date(e.joiningDate);

          return (
              joiningDate >= new Date(start) &&
              joiningDate <= new Date(end)
          );
      });

      res.status(200).send({msg: "Filtered Employees Between Two Joining Dates", employees: result});
      

  } catch (error) {

      res.status(500).send({ message: "Server error" });
  }
};

// UPDATE COMPLETE EMPLOYEE DETAILS
const updateCompleteEmployeeDetails = (req, res) => {

  try {

      const { ID } = req.params;

      const index = emp.findIndex(
          (e) => e.id == ID
      );
      if (index === -1) {
        return res.status(404).send({
            message: "Employee not found"
        });
    }

    const {
        name,
        email,
        address,
        contactNumber,
        dateOfBirth,
        joiningDate,
        department
    } = req.body;

    emp[index] = {
        ...emp[index],
        name,
        email,
        address,
        contactNumber,
        dateOfBirth,
        joiningDate,
        department
    };

    res.status(200).send({
        message: "Employee updated successfully",
        employee: emp[index]
    });

} catch (error) {

    res.status(500).send({
        message: "Server error"
    });
}
};


module.exports = {
  getAllEmp,
  createEmp,
  deleteEmp,
  updateEmp,
  getempId,
  getDepartmentWiseEmployee,
  getJoiningMonthWiseEmployee,
  getThisMonthBirthdayEmployee,
  searchEmpByName,
  searchEmpByCity,
  sortEmployeeByJoiningDate,
  sortEmployeeByName,
  getTotalEmployeeCount,
  getDepartmentWiseCount,
  getOldestEmployee,
    getNewestJoinedEmployee,
    filterEmployeesByJoiningDate,
    updateCompleteEmployeeDetails
  
};

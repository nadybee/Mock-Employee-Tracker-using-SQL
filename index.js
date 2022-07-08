import inquirer from "inquirer"
import mysql from "mysql2"
import cTable from "console.table"
// const Department = require( "./lib/Departments")
// import Department from "./lib/Departments"
// import express from "express"
// import questions from './assets/questions/questions'

// const PORT = process.env.PORT || 3001
// const app = express()

// Express middleware
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

// const department = new Department()
//create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "myCompany",
})
//
//inquirer questions
const startQuestion = {
  type: "list",
  name: "todo",
  message: "What would you like to do?",
  choices: [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
    "quit",
  ],
}
const departmentQuestion = {
  type: "input",
  name: "department_name",
  message: "what is the name of the department?",
  validate: function (department_name) {
    if (department_name.length) {
      if (/^[a-zA-Z ]{1,30}$/.test(department_name)) {
        return true
      } else {
        ;("please enter a department name no more that 30 characters")
      }
    }
  },
}

const RoleQuestion = [
  {
    type: "input",
    name: "job_title",
    message: "what is the job title?",
    validate: function (job_title) {
      if (job_title.length) {
        if (/^[a-zA-Z ]{1,100}$/.test(job_title)) {
          return true
        } else {
          ;("please enter a job title no more that 30 characters")
        }
      }
    },
  },
  {
    type: "input",
    name: "department_name",
    message: "what is their department?",
    validate: function (department_name) {
      if (department_name.length) {
        if (/^[A-Za-z ]{1,30}$/.test(department_name)) {
          return true
        } else {
          ;("please enter a department name no more that 30 characters")
        }
      }
    },
  },
  {
    type: "input",
    name: "salary",
    message: "what is their salary?",
    validate: function (salary) {
      if (!isNaN(salary)) {
        return true
      } else {
        ;("please enter a salary with numbers only")
      }
    },
  },
]

//first_name, last_name, job_title, department_name, salary, manager
const employeeQuestion = [
  {
    type: "input",
    name: "first_name",
    message: "What is their first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is their last name?",
  },
  {
    type: "input",
    name: "job_title",
    message: "What is their job title?",
  },
  {
    type: "input",
    name: "department_name",
    message: "What is their department?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is their salary?",
  },
  {
    type: "input",
    name: "manager",
    message: "Who is their manager?",
  },
]

// starts the interaction with user

async function startProgram() {
  
  return inquirer
    .prompt(startQuestion)
    .then((answers) => {
      askAnswer(answers)
    })

    .catch((err) => console.log(err))
}

const askAnswer = (answers) => {
  switch (answers.todo) {
    case "view all departments":
      showDepartment()
      break

    case "view all employees":
      showEmployees()
      break

    case "view all roles":
      showRoles()
      break

    case "add a department":
   addDepartment()
      break

    case "add a role":
      addRole()
      break

    case "add an employee":
      addEmployee()
      break

    case "update an employee role":
      updateEmployee()
      break

    case "quit":
      quitProgram()
      break
  }
}

function showDepartment() {
  let seeDepartment = `
SELECT * FROM department
   `
  connection.query(seeDepartment, (err, results, fields) => {
    if (err) throw err

    console.log(`\n`)
    console.table(results)
    startProgram()
  })
}

function addDepartment() {
  return inquirer
    .prompt(departmentQuestion)
    .then((answers) => {
      connection.query(
        `INSERT INTO department (department_name)
        VALUES ('${answers.department_name}');`,
        (err, results, fields) => {
          if (err) throw err
          console.log(`\n`)
          console.log(`${answers.department_name} added to database`)
          startProgram()
        }
      )
    })

    .catch((err) => console.log(err))
}

const showEmployees = () => {
  let seeEmployees = `
  SELECT * FROM employees
     `
  connection.query(seeEmployees, (err, results, fields) => {
    if (err) throw err
    console.log(`\n`)
    console.table(results)
    startProgram()
  })
}

const showRoles = () => {
  let seeRoles = `
  SELECT * FROM roles
     `
  connection.query(seeRoles, (err, results, fields) => {
    if (err) throw err
    console.log(`\n`)
    console.table(results)
    startProgram()
  })
}

const sqlAddRole = (answers) => {
  connection.query(
    `INSERT INTO roles (job_title, department_name, salary)
        VALUES ('${answers.job_title}','${answers.department_name}', '${answers.salary}');`,
    (err, results, fields) => {
      if (err) throw err
      console.log(`\n`)
    }
  )
}

async function addRole() {
  return inquirer
    .prompt(RoleQuestion)
    .then((answers) => {
      console.log(answers)
      sqlAddRole(answers)
      startProgram()
    })

    .catch((err) => console.log(err))
}

const sqlAddEmployee = (answers) => {
  connection.query(
    `INSERT INTO employees (first_name, last_name, job_title, department_name, salary, manager)
          VALUES ('${answers.first_name}','${answers.last_name}','${answers.job_title}', '${answers.department_name}', '${answers.salary}', '${answers.manager}');`,
    (err, results, fields) => {
      if (err) throw err
      console.log(`\n`)
    }
  )
}

async function addEmployee() {
  return inquirer
    .prompt(employeeQuestion)
    .then((answers) => {
      console.log(answers)
      sqlAddEmployee(answers)
      startProgram()
    })

    .catch((err) => console.log(err))
}



const getEmployeeList = () => {
  let employees = []

  connection.query(
    "SELECT first_name, last_name FROM employees",
    (err, results) => {
      if (err) throw err
      
      for (let i = 0; i < results.length; i++) {
        let employee =`${results[i].first_name} ${results[i].last_name}`
        employees.push(employee)
      }
      console.log(employees)
 
     
    }
   
  )
  return employees
}
const employeeList = getEmployeeList()

const UpdateEmployeeQuestion = [
  {
    type: "list",
    name: "update",
    message: "who would you like to update?",
    choices: employeeList,
  },
]

function updateEmployee() {
  return inquirer
    .prompt(UpdateEmployeeQuestion)
      
    .then((answers) => {
      console.log(answers)
      // sqlAddRole(answers)
      // startProgram()
    })

    .catch((err) => console.log(err))
}
const quitProgram = () => {
  console.log("thank you! Goodbye!")
  connection.end()
}

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end()
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

startProgram()

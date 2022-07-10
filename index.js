import figlet from "figlet"
import inquirer from "inquirer"
import mysql from "mysql2"
import Ctable from "console.table"


/*------------------CREATE CONNECTION---------------------*/

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'driedapricot',
  database: "myCompany"
})

/** -----------------------START MAIN MENU------------------------------------ */
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
    "update employee manager",
    "view employees by department",
    "delete employee",
    "quit",
  ],
}

async function startProgram() {
  return await inquirer
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

    case "update employee manager":
      updateManager()
      break

    case "view employees by department":
      viewByDepartment()
      break

    case "delete employee":
      deleteEmployee()
      break

    case "quit":
      quitProgram()
      break
  }
}

// ------------------- DEPARTMENT -----------------------------------------//
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
        
        }
      )
      departmentList = getDepartmentList()
      startProgram()
    })

  
 
}
let departmentList;
const getDepartmentList = () => {
  let departments = []

 connection.query("SELECT * FROM department", (err,results)=>{ 
   
    if (err) throw err
    // console.log('frist try')
    // console.log(results)
 
    for (let i = 0; i < results.length; i++) {

      let department = `${results[i].department_name}`
      departments.push(department)
    }
    
    // console.log('outside forloipp')
    // console.log(departments)

  })
  // console.log('outside query')
  // console.log(departments)
return departments
}

departmentList = getDepartmentList()

let filteredResult;
const getDepartmentID = (answers, res) => {
  // console.log( 'as ' + answers.department_name)
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err

    for (let i = 0; i < results.length; i++) {
      if (results[i].department_name === answers.department_name) {
        console.log("test 1 department " + parseInt(results[i].id))
        filteredResult = parseInt(results[i].id)
        // console.log('showing filtered result ' + filteredResult)
        res()
      }
    }
  })
}

const viewByDeparmentQuestions = [
  {
    type: "list",
    name: "departments",
    message: "what department of employees do you want view?",
    choices: departmentList,
  },
]
function viewByDepartment() {
  return inquirer
    .prompt(viewByDeparmentQuestions)
    .then((answers) => {
      connection.query(
        `SELECT * from employees WHERE department_name in ('${answers.departments}');`,

        (err, results, fields) => {
          if (err) throw err
          console.log(`\n`)
          console.table(results)
          startProgram()
        }
      )
    })
    .catch((err) => console.log(err))
}
/** ------------------------ROLES--------------------------------------- */

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
let roleQuestion;
const getRoleQuestions = () =>{
  departmentList = getDepartmentList()
 roleQuestion = [
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
  {
    type: "list",
    name: "department_name",
    message: "what is their department?",
    choices: departmentList
  },
]
return roleQuestion
}
const sqlAddRole = (answers) => {
  connection.query(
    `INSERT INTO roles (job_title, salary, department_name, department_id )
        VALUES ('${answers.job_title}', '${answers.salary}', '${answers.department_name}',${filteredResult});`,
    (err, results, fields) => {
      if (err) throw err
      console.log(`\n`)
    }
  )
}

async function addRole() {

// console.log(getDepartmentList())
// console.log(departmentList)
  try {

    const answers = await inquirer.prompt(getRoleQuestions())
    await new Promise((res, rej) => getDepartmentID(answers, res))
    console.log("test 2" + filteredResult)
    sqlAddRole(answers)
    startProgram()
  } catch (err) {
    return console.log(err)
  }
}
let roleList;
const getRoleList = () => {
  let roles = []

  connection.query("SELECT job_title FROM roles", (err, results) => {
    if (err) throw err
    // console.log(results)
    for (let i = 0; i < results.length; i++) {
      roles.push(results[i].job_title)
    }
  })
  return roles
}


let filteredRole
const getRoleID = (answers, res) => {
  // console.log( 'as ' + answers.department_name)
  connection.query("SELECT * FROM roles", (err, results) => {
    if (err) throw err

    for (let i = 0; i < results.length; i++) {
      if (results[i].job_title === answers.job_title) {
        console.log("test 1filRole " + parseInt(results[i].id))
        filteredRole = parseInt(results[i].id)
        res()
        
      }
    }
  })
}

/**---------------------------EMPLOYEE--------------------------------- */
let employeeQuestion;
const getEmployeeQuestions =()=>{
  departmentList = getDepartmentList()
  roleList =getRoleList()
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
    type: "list",
    name: "job_title",
    message: "What is their job title?",
    choices: roleList,
  },
  {
    type: "list",
    name: "department_name",
    message: "What is their department?",
    choices: departmentList,
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
return employeeQuestion
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

const getEmployeeList = () => {
  let employees = []

  connection.query(
    "SELECT first_name, last_name FROM employees",
    (err, results) => {
      if (err) throw err

      for (let i = 0; i < results.length; i++) {
        let employee = `${results[i].first_name} ${results[i].last_name}`
        employees.push(employee)
      }
    }
  )
  return employees
}
const employeeList = getEmployeeList()

async function addEmployee() {
  try {
    const answers = await inquirer.prompt(getEmployeeQuestions())
    await new Promise((res, rej) => getRoleID(answers, res))
    // console.log('test 2' + filteredResult);
    sqlAddEmployee(answers)
    startProgram()
  } catch (err) {
    return console.log(err)
  }
}

const UpdateEmployeeQuestion = [
  {
    type: "list",
    name: "update",
    message: "who would you like to update?",
    choices: employeeList,
  },
  {
    type: "list",
    name: "updateRole",
    message: "what position would you like to update to?",
    choices: roleList,
  },
]
const sqlAddEmployee = (answers) => {
  connection.query(
    `INSERT INTO employees (first_name, last_name, job_title, role_id, department_name, salary, manager)
          VALUES ('${answers.first_name}','${answers.last_name}','${answers.job_title}', ${filteredRole}, '${answers.department_name}', '${answers.salary}', '${answers.manager}');`,
    (err, results, fields) => {
      if (err) throw err
      console.log(`\n`)
    }
  )
}

let filteredEmployee
const getEmployeeID = (answers, res) => {
  // console.log( 'as ' + answers.department_name)
  connection.query("SELECT * FROM employees", (err, results) => {
    if (err) throw err

    for (let i = 0; i < results.length; i++) {
      if (
        `${results[i].first_name} ${results[i].last_name}` === answers.update
      ) {
        console.log("test 1forEmID" + parseInt(results[i].id))
        filteredEmployee = parseInt(results[i].id)
        res()
        // console.log('showing filtered result ' + filteredEmployee)
      }
    }
  })
}

const sqlUpdateEmployee = (answers) => {
  if (`${answers.updateRole}` === "return to main menu") {
    startProgram()
  } else {
    connection.query(
      `UPDATE EMPLOYEES
      SET job_title = '${answers.updateRole}'
      WHERE id = ${filteredEmployee} `,
      (err, results, fields) => {
        if (err) throw err
        console.log(`\n`)
      }
    )
  }
}

async function updateEmployee() {
  try {
    const answers = await inquirer.prompt(UpdateEmployeeQuestion)
    await new Promise((res, rej) => getEmployeeID(answers, res))
    console.log("test 2" + filteredEmployee)
    sqlUpdateEmployee(answers)
    startProgram()
  } catch (err) {
    return console.log(err)
  }
}

/** ---------------MANAGER-------------------- */

const updateManagerQuestions = [
  {
    type: "list",
    name: "employee",
    message: "who would like to update",
    choices: employeeList,
  },
  {
    type: "input",
    name: "manager",
    message: "who is their manager?",
  },
]

const sqlUpdateManager = (answers) => {
  if (`${answers.employee}` === "return to main menu") {
    startProgram()
  } else {
    connection.query(
      `UPDATE EMPLOYEES
      SET manager = '${answers.manager}'
      WHERE id = ${filteredEmployee} `,
      (err, results, fields) => {
        if (err) throw err
        console.log(`\n`)
      }
    )
  }
}
async function updateManager() {
  const answers = await inquirer.prompt(updateManagerQuestions)
  await new Promise((res, rej) => getEmployeeID(answers, res))
  sqlUpdateManager(answers)
  startProgram()
  res()
}

/**--------------------------delete employee-------------------- */
const deleteEmployeeQuestion = [
  {
    type: "input",
    name: "id",
    message: "Enter employee id to delete them from the database",
    validate: function (salary) {
      if (!isNaN(salary)) {
        return true
      } else {
        ;("please enter valid id")
      }
    },
  },

  {
    type: "list",
    name: "ask",
    message: "are you sure?",
    choices: ["yes", "no"],
  },
]
function deleteEmployee() {
  return inquirer
    .prompt(deleteEmployeeQuestion)
    .then((answers) => {
      if (answers.ask === "yes") {
        connection.query(
          `DELETE FROM employees
        WHERE id = ${answers.id}
       `,
          (err, results, fields) => {
            if (err) throw err
            console.log(`\n`)
            console.log(`employee with ${answers.id} id deleted from database`)
            startProgram()
          }
        )
      } else {
        startProgram()
      }
    })
    .catch((err) => console.log(err))
}

/**------------------------------QUIT------------------------- */
const quitProgram = () => {
  console.log("thank you! Goodbye!")
  connection.end()
}


/**-----------TERMINAL ART-------------------- */
async function begin() {
  await figlet("Employee \n \n Manager", function (err, data) {
    if (err) {
      console.log("Something went wrong...")
      console.dir(err)
      return
    }
    console.log(data)
    console.log(
      "Welcome to the employee directory! Please start by choosing what you want to do."
    )
    startProgram()
  })
}

begin()



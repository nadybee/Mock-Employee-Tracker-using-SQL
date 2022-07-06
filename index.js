
import inquirer from "inquirer"
import mysql from "mysql2"
import cTable from "console.table"
// import questions from './assets/questions/questions'

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
      "quit"
    ],
  }
  const departmentQuestion = {
      type: 'input',
      name: 'department_name',
      message: 'what is the name of the department?',
      validate: function (department_name){
          if (/^[a-zA-Z]{1,30}$/.test(department_name)){
              return true
          }
          else {
              'please enter a department name no more that 30 characters'
          }
      }
      
  }

  const RoleQuestion = [ 
      {
    type: 'input',
    name: 'job_title',
    message: 'what is the job title?',
    validate: function (job_title){
        if (/^[a-zA-Z]{1,100}$/.test(job_title)){
            return true
        }
        else {
            'please enter a job title no more that 30 characters'
        }
    }
},
{
    type: 'input',
    name: 'department_name',
    message: 'what is their department?',
    validate: function (department_name){
        if (/^[a-zA-Z]{1,30}$/.test(department_name)){
            return true
        }
        else {
            'please enter a department name no more that 30 characters'
        }
    }
},
{
    type: 'input',
    name: 'salary',
    message: 'what is their salary?',
    validate: function (salary){
        if (/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/.test(salary)){
            return true
        }
        else {
            'please enter a salary with numbers only'
        }
    }
},

  ]

//create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "driedapricot",
  database: "myCompany",
})

//inquirer questions
// starts the interaction with user

 async function startProgram (){
  return inquirer
    .prompt(startQuestion)
    .then((answers) => {
        askAnswer(answers)
    })

    .catch((err) => console.log(err))
}

const askAnswer =(answers)=>{
    switch (answers.todo) {
        case "view all departments":
            showDepartment()
            break;
        
        case 'view all employees':
            showEmployees()
            break;

       case 'view all roles' :
            showRoles()
            break;

       case 'add a department' :
           addDepartment()
           break;  
        
        case   "add a role" :
            addRole()
            break;

       case 'quit':
           quitProgram()   
     }

    
   
}
const showDepartment = () => {
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

  const addDepartment =() =>{
       
    return inquirer
    .prompt(departmentQuestion)
    .then((answers) => {

        connection.query( `INSERT INTO department (department_name)
        VALUES ('${answers.department_name}');`, (err, results, fields) => {
            if (err) throw err
            console.log(`\n`)
            console.table(results)
            startProgram()
          })
    })

    .catch((err) => console.log(err))
}

async function addRole(){
       
    return inquirer
    .prompt(RoleQuestion)
    .then((answers) => {

        connection.query( `INSERT INTO roles (job_title, department_name, salary)
        VALUES ('${answers.job_title}','${answers.department_name}', '${answers.salary}');`, (err, results, fields) => {
            if (err) throw err
            console.log(`\n`)
            console.table(results)
            startProgram()
          })
    })

    .catch((err) => console.log(err))
}
  

  const quitProgram=() =>{
      console.log('thank you! Goodbye!')
    //   connection.query ('quit', (err, results, fields) => {
    //     if (err) throw err
    //     console.table(results) })
  }
;


startProgram()



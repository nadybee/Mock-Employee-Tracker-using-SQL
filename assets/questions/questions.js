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

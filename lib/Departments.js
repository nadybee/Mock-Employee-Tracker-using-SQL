
class Department {

showDepartment(){
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
addDepartment(){
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
    
    }
      module.exports =  Department


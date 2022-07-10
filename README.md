

  # Mock Employee Generator using mySQL
  
   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

  ## Table of Contents
  - [Project description](#Description)
  - [Useage](#Usage)
  - [Installation](#Installation)
  - [Contributors](#Contributors)
  - [Questions](#Questions)
  - [License](#License)

  ## Description
  This app seeds a mock database called 'myCompany' and allows the user to view, add and delete from the database on the command line. It uses inquirer, and mysql.

  ## Usage
  Make sure you have mysql installed. After cloning the the respository, open the terminal in 'db' to create and seed the database.  You will need to add your own password to the index.js file. Then you can use the prompts to use the application. Please view my walk through video to see how to use the application.


  ## Installation
  * open the terminal in the 'db' folder.
  * login into mysql `mysql -u root -p` and enter password.
  * then create the data base by running `source schema.sql` 
  * then seed the database with `source seeds.sql` 
  * Then open a new terminal and install the dependancies with `npm  install`  
  * in the index.js file on line 18, add your mysql password.
  * run `npm start` in the command line to start the application.

  ## Contributors
  natalie fairbourne

  ## Tests
  none

  ## Questions
  If you have questions about this project, please contact developer at:
  - nfairbourne@aol.com 
  - [GitHub](https://github.com/nadybee)

  ## License
   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 



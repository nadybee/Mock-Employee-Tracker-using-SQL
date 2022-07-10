import mysql from "mysql2"


/*------------------CREATE CONNECTION---------------------*/

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "driedapricot",
    database: "myCompany"
  })
  
export default connection;  
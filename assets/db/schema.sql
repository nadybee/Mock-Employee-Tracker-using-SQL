DROP DATABASE IF EXISTS myCompany;
CREATE DATABASE myCompany;

USE myCompany;

CREATE TABLE department(
  id INT AUTO_INCREMENT primary key NOT NULL,
  department_name VARCHAR(30) NOT NULL
  
);



CREATE TABLE roles(
    id INT AUTO_INCREMENT primary key NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    salary DECIMAL,
    department_name VARCHAR(30) NOT NULL,
    department_id INT,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
  
);



CREATE TABLE employees(
    id INT AUTO_INCREMENT primary key NOT NULL,
   first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100),
    role_id INT,
    department_name VARCHAR(30),
    salary DECIMAL,
    manager VARCHAR(100),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
  
);



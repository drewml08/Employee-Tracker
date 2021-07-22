CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS role (
    
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL, 
  department_id INT
);

CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT,
    manager_id INT
);

INSERT INTO department (name) values ('Sales');
INSERT INTO department (name) values ('Finance');
INSERT INTO department (name) values ('Legal');
INSERT INTO department (name) values ('Engineering');

INSERT INTO role (title, salary, department_id) values ('Sales Lead', '100000', '1');
INSERT INTO role (title, salary, department_id) values ('Salesperson', '80000', '1');
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', '150000', '4');
INSERT INTO role (title, salary, department_id) values ('Software Engineer', '120000', '4');
INSERT INTO role (title, salary, department_id) values ('Accountant', '125000', '2');
INSERT INTO role (title, salary, department_id) values ('Lawyer', '190000', '3');
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', '250000', '3');
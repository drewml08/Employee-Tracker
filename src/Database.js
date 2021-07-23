const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            
            port: 3306,
          
            user: 'root',
          
            password: '',
            database: 'employee_db',
        });    
    }

    getRoleChoices() {
        return new Promise ( (resolve, reject) => {
            this.connection.query('SELECT id, title FROM role', (err, res) => {
                if (err) throw err;

                var choices = [];   

                for (var i = 0; i < res.length; i++) {
                    choices.push({
                        name: res[i].title, 
                        value: res[i].id,
                    });
                } 
                resolve(choices);
            })
        });
    }

    getEmployeeChoices() {
        return new Promise ( (resolve, reject) => {
            this.connection.query('SELECT id, first_name, last_name FROM employee', (err, res) => {
                if (err) throw err;

                var choices = [];   

                for (var i = 0; i < res.length; i++) {
                    choices.push({
                        name: res[i].first_name + " " + res[i].last_name, 
                        value: res[i].id,
                    });
                } 
                resolve(choices);
            })
        });
    }
    createEmployee(employee) {
        return new Promise ( (resolve, reject) => {
            this.connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    role_id: employee.role,
                    manager_id: employee.manager,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee created!\n`);
                    resolve();
            });
        });
    }

    updateEmployeeRole(update) {
        return new Promise ( (resolve, reject) => {
            this.connection.query(
                'UPDATE employee SET ? WHERE ?',
                [
                    {role_id: update.role,},
                    {id: update.employee_id},
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} employee modified!\n`);
                    resolve();
            });
        });
    }

    getAllEmployees() {
        return new Promise ( (resolve, reject) => {
            this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, title, salary, department.name AS department, CONCAT (mgr.first_name, " " , mgr.last_name) AS manager FROM employee JOIN role ON (employee.role_id = role.id) JOIN department ON (role.department_id = department.id) LEFT JOIN employee mgr ON (employee.manager_id = mgr.id)', (err, res) => {
                if (err) throw err;
                resolve(res);
            })
        });
    }
}

module.exports = Database;
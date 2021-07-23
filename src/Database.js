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
}

module.exports = Database;
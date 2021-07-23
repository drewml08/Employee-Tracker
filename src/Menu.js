const inquirer = require('inquirer');
const Database = require('./Database');
const table = require('console.table');


class Menu {
    constructor(){
        this.done = false;
        this.db = new Database();
    }

    mainPrompt() {
        const question = [
            {
                type: 'list', 
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'Exit'],
                name: 'option',
            }
        ]
        return new Promise ( (resolve, reject) => {
            inquirer.prompt(question).then((response) => {
                resolve(response.option);
            });
        });
    }

    async mainMenu() {
        while (!this.done) {
            var answer = await this.mainPrompt();
            switch (answer) {
                case "View All Employees":
                    await this.viewAllEmployees();
                    break;

                case "Add Employee":
                    await this.addEmployee();
                    break;

                case "Update Employee Role":
                    await this.updateRole();    
                    break;
                   
                case "Exit":
                    this.done = true;
                    break;    
            }
        }
    }
    async viewAllEmployees() {
        const employees = await this.db.getAllEmployees();
        console.table(employees);
    }

    async addEmployeePrompt() {
        const roles = await this.db.getRoleChoices();
        var people = await this.db.getEmployeeChoices();
        people.unshift({
            name: 'none',
            value: '0',
        })
        const question = [
            {
                type: 'input',
                message: 'What is the employee\'s first name?',
                name: 'first_name', 
            },

            {
                type: 'input',
                message: 'What is the employee\'s last name?',
                name: 'last_name', 
            },

            {
                type: 'list', 
                message: 'What is the employee\'s role?',
                choices: roles,
                name: 'role',
            },

            {
                type: 'list', 
                message: 'Who is the employee\'s manager?',
                choices: people,
                name: 'manager',
            }
        ]
        return new Promise ( (resolve, reject) => {
            inquirer.prompt(question).then((response) => {
                resolve(response);
            });
        });
    }

    addEmployee() {
        return new Promise (async (resolve, reject) => {
            const employee = await this.addEmployeePrompt();
            await this.db.createEmployee(employee);
            resolve();
        });
    }
    async editRolePrompt() {
        const roles = await this.db.getRoleChoices();
        const people = await this.db.getEmployeeChoices();
       
        const question = [

            {
                type: 'list', 
                message: 'Which employee\'s role would you like to update?',
                choices: people,
                name: 'employee_id',
            },

            {
                type: 'list', 
                message: 'What role should be assigned to this employee?',
                choices: roles,
                name: 'role',
            },

           
        ]
        return new Promise ( (resolve, reject) => {
            inquirer.prompt(question).then((response) => {
                resolve(response);
            });
        });
    }

    updateRole() {
        return new Promise (async (resolve, reject) => {
            const update = await this.editRolePrompt();
            await this.db.updateEmployeeRole(update);
            resolve();
        });

    }
}

module.exports = Menu;
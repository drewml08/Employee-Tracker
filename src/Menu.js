const inquirer = require('inquirer');
const Database = require('./Database');


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
                    this.viewAllEmployees();
                    break;

                case "Add Employee":
                   await this.addEmployee();
                    break;

                case "Update Employee Role":
                    this.updateRole();    
                    break;
                   
                case "Exit":
                    this.done = true;
                    break;    
            }
        }
    }
    viewAllEmployees() {

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
    
    updateRole() {

    }
}

module.exports = Menu;
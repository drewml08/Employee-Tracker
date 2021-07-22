const inquirer = require('inquirer');



class Menu {
    constructor(){
        this.done = false;
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
                    this.addEmployee();
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

    addEmployee() {

    }
    
    updateRole() {

    }
}

module.exports = Menu;
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
            console.log('WTF');
            var answer = await this.mainPrompt();
            switch (answer) {
                case "View All Employees":
                    break;

                case "Add Employee":
                    break;

                case "Update Employee Role":    
                    break;
                   
                case "Exit":
                    this.done = true;
                    break;    
            }
        }
    }
}

module.exports = Menu;
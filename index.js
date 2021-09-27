const inquirer = require('inquirer');

const { 
    addDept,
    addRole,
    addEmployee} = require('./lib/functions');
const {
    viewDept, 
    viewRoles,
    viewEmployees,
} = require('./lib/viewFunctions');
const {updateEmployee} = require('./lib/updateFunc');


function questions () {
    inquirer.prompt ([
        {
        type: 'list',
        name: 'optionQuestions',
        message: 'What would you like to do',
        choices: ['View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role',
    'exit']

    }
]).then (answers => {
   return init(answers);
});
}


function init (answers) {
    switch (answers.optionQuestions) {
        case 'View all departments':
           viewDept(questions);
           break;
        case 'View all roles':
            viewRoles(questions);
            break;
        case 'View all employees':
            viewEmployees(questions);
            break;
        case 'Add a department':
            addDept(questions);
            break;
        case 'Add a role': 
            addRole(questions);
            break;
        case 'Add an employee':
            addEmployee(questions);
            break;
        case 'Update an employee role':
            updateEmployee(questions);
            break;
        default: 
        console.log('Goodbye!');
        
}
}

questions();
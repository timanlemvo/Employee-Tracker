const inquirer = require('inquirer');
// const db = require('./db/connection');
const Query = require('./lib/functions');
const cTable = require('console.table');

const questions = () => {
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
        'Update an employee role']

    }
]).then (answers => {
    if (answers.optionQuestions === 'View all departments') {
      const viewDept = new Query(answers.optionQuestions);
       return viewDept.viewDept();
    } else if (answers.optionQuestions === 'View all roles') {
        const viewRoles = new Query(answers.optionQuestions);
        return viewRoles.viewRoles();
    } else if (answers.optionQuestions === 'View all employees') {
        const viewEmployees = new Query(answers.optionQuestions);
        return viewEmployees.viewEmployees();
    } else if (answers.optionQuestions === 'Add a department') {
        const addDept = new Query(answers.optionQuestions);
        return addDept.addDept();
    } else if (answers.optionQuestions === 'Add a role') {
        const addRole = new Query(answers.optionQuestions);
        return addRole.addRole();
    }
    questions();
})
   
   
}


function init () {
    questions();
}

init();
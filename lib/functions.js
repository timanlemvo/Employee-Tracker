const inquirer = require('inquirer');
const db = require('../db/connection');
const {
    getRoles,
    getDepartments,
    getEmployees
} = require('./getFunction');

function addDept (questions) {
     inquirer.prompt([
         {
           type: 'input',
           name: 'deptAdd',
           message: 'Please add a department', 
           validate: deptInput => {
               if(deptInput) {
                   return true;
               } else {
                   console.log('Please enter a Department!');
                   return false;
               }
           }
     }
    ]).then (answers => {
         const sql = `INSERT INTO department (name) VALUES ('${answers.deptAdd}')`;

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            console.table(results);
            console.log('Added!');
            questions();
        });
    });
};

function addRole (questions) {
    

    inquirer.prompt([
         {
            type: 'input',
            name:'roleName',
            message: 'Please provide Role Name',
            validate: inputRName => {
                if (inputRName) {
                    return true;
                } else {
                    console.log('Please provide a role name!');
                    return false;
                }
            }
         },
         {
             type: 'input',
             name:'roleSalary',
             message: 'Please enter Role Salary',
             validate: Salary => {
                if (Salary) {
                    return true;
                } else {
                    console.log('Please provide a salary number!');
                    return false;
                }
            }
         },
         {
             type:'list',
             name:'deptSelection',
             message:'Please select a department',
             choices: getDepartments()
        }
         
    ]).then(answers => {
        let {deptSelection} = answers;
        const deptId = deptSelection.split(' ');
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES ('${answers.roleName}',${parseInt(answers.roleSalary)}, ${parseInt(deptId[0])})`;

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.table(results);
            console.log('Added!');
            questions();
        });
    });

};

function addEmployee (questions) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFName',
            message: 'Please enter employees first name',
            validate: firstName => {
                if(firstName) {
                    return true;
                } else {
                    console.log('Please enter a name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'empLName',
            message: 'Please enter employees last name',
            validate: lastName => {
                if(lastName) {
                    return true;
                } else {
                    console.log('Please enter a last name.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleSelect',
            message: 'please select role',
            choices: getRoles()
        },
        {
            type: 'list',
            name: 'empManager',
            message: 'select manager',
            choices: getEmployees()
        }
    ]).then(answers => {
        let {empManager} = answers;
        const empSelection = empManager.split(' ');
        console.log(empSelection);
        console.log(answers);
        let {roleSelect} = answers;
        const rSelection = roleSelect.split(' ');
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${answers.empFName}', '${answers.empLName}', ${rSelection[0]}, ${empSelection[0]} )`;

        db.query(sql, (err, results) => {
            if(err) {
                console.log(err);
            }
            console.table(results);
            console.log('Added!');
            questions();
            
        })
    })
};

module.exports = {
    addDept,
    addRole,
    addEmployee,
     }

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
           message: 'Please add a department' 
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
            message: 'Please provide Role Name'
         },
         {
             type: 'input',
             name:'roleSalary',
             message: 'Please enter Role Salary'
            
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
        },
        {
            type: 'input',
            name: 'empLName',
            message: 'Please enter employees last name'
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
        console.log(answers);
        let {roleSelect} = answers;
        const rSelection = roleSelect.split(' ');
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES ('${answers.empFName}', '${answers.empLName}', ${rSelection[0]})`;

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

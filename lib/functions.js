const inquirer = require('inquirer');
const db = require('../db/connection');
const cTable = require('console.table');


class Query {
    constructor(answers) {
        this.answers = answers;
    }
viewDept () {
const sql = `SELECT * FROM department`;
db.query(sql, (err, results) => {
    if(err) {
        console.log(err);
        return;
    }
    return console.table(results);
    
   
});
};

 viewRoles () {
     const sql = `SELECT role.*, department.name 
     AS department_name 
     FROM role 
     LEFT JOIN department ON role.department_id = department.id`;

     db.query(sql, (err, results) => {
         if(err) {
             console.log(err);
             return;
         }
         return console.table(results);
     });

};

 viewEmployees () {
     const sql = `SELECT employee.id, employee.first_name, 
     employee.last_name, role.title, 
     role.department_id, role.salary, 
     employee.manager_id 
     FROM employee 
     LEFT JOIN role 
     ON employee.role_id = role.id`;
     db.query(sql, (err, results) => {
         if(err) {
             console.log(err);
             return;
         }
         return console.table(results);
     })

};

 addDept () {
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
            return console.table(results);
        });
    });
};

 addRole () {
    const sql = `SELECT * FROM department`;
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
             choices: [db.query(sql, (err, results) => {
                if(err) {
                    console.log(err);
                    return;
                }
               return [results];
            }
            )]
        }
         
    ])

};

 addEmployee () {

};

 updateEmployee () {

};

}

module.exports = Query;
const db = require('../db/connection');

function viewDept (questions) {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            return;
        } else {
        console.table(results);
        questions();
        }   
    });
    };
    
     function viewRoles (questions) {
         const sql = `SELECT role.*, department.name 
         AS department_name 
         FROM role 
         LEFT JOIN department ON role.department_id = department.id`;
    
         db.query(sql, (err, results) => {
             if(err) {
                 console.log(err);
                 return;
             }
             console.table(results);
             questions();
         });
    
    };
    
    function viewEmployees (questions) {
         const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, 
         CONCAT(e.first_name, ' ', e.last_name) AS Manager 
         FROM employee 
         INNER JOIN role on role.id = employee.role_id 
         INNER JOIN department on department.id = role.department_id
         LEFT JOIN employee e on employee.manager_id = e.id;`;
         db.query(sql, (err, results) => {
             if(err) {
                 console.log(err);
                 return;
             }
           console.table(results);
           questions();
         })
    
    };
    
    module.exports = {
        viewDept,
        viewRoles,
        viewEmployees
    }
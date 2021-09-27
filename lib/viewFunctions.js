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
           console.table(results);
           questions();
         })
    
    };
    
    module.exports = {
        viewDept,
        viewRoles,
        viewEmployees
    }
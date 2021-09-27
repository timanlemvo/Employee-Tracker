const db = require('../db/connection');


function getRoles() {
    const sql = `SELECT * FROM role  `;
    let role = [];
    db.promise().query(sql)
    .then(([rows, fields]) => {
        for(let i = 0; i < rows.length; i++) {
            
            role.push(`${rows[i].id} ${rows[i].title}`);
        }
        
    })
    return role;
};

function getDepartments() {
    let deptChoices = [];
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
      for (let i = 0; i < results.length; i++) {
          deptChoices.push(`${results[i].id} ${results[i].name}`);
      }
    });
    return deptChoices;
};

function getEmployees() {
    let empChoices = ['None'];
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, results) => {
        for (let i = 0; i < results.length; i++) {
            empChoices.push(`${results[i].id} ${results[i].first_name} ${results[i].last_name}`);
        }
    });
    return empChoices;
}

module.exports = {
    getRoles,
    getDepartments,
    getEmployees
}
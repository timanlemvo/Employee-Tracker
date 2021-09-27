const db = require('../db/connection');

function updateEmployee (questions) {
    const sql = `SELECT first_name, last_name FROM employee `;
    
    db.promise().query(sql)
     .then(([rows, fields]) => {
        
        let names = [];
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'test',
                message: 'Select your choice',
                choices: function() {
                    for (let i = 0; i < rows.length; i++) {
                        names.push(`${rows[i].first_name} ${rows[i].last_name}`);
                    }
                     return names;
                }
            },
            {
                type: 'list',
                name: 'roleSelect',
                message: 'Select role',
                choices: getRoles()
                   
            }
        ]).then(answers => {
            console.log(answers);
            let {test,roleSelect} = answers;
            const personArr = test.split(' ');
            const roleArr = roleSelect.split(' ');
           
            const person = {
                first: personArr[0],
                last: personArr[1],
                role: roleArr[0]
            };
            console.log(person);
            const sql = `UPDATE employee SET role_id = ${parseInt(person.role)} 
            WHERE first_name = '${person.first}' AND last_name = '${person.last}'`;

            db.query(sql, (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.table(results);
                questions();
            });
            
        });
    });
}

module.exports = {updateEmployee};
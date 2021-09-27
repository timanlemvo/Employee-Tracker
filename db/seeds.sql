INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 50000, 1),
('Salesperson', 30000, 1),
('Software Engineer', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Ross', 3,  null),
('Jimmy', 'Franquez', 1, 1),
('Steve', 'Gomez', 2, 2);
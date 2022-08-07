const { prompt } = require('inquirer');
const db = require('./db/db');
const Department = require('./db/Models/department');
const Role = require('./db/Models/role');
const Employee = require('./db/Models/employee');



const nextMenu = [{
    name: 'nextTask',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add New Employee', 'Add New Department', 'Add New Role', 'Update Employee Information']
}];
const newDepartment = [{
    type: '',
    message: '',
}];
const newRole = [{
    type: '',
    message: '',
}];
const newEmployee = [{
    type: '',
    message: '',
}];


let employees = db.getEmployees().then((result) => {
    console.table(result);
});
let departments = db.getDepartments().then((result) => {
    console.table(result);
});
let roles = db.getRoles().then((result) => {
    console.table(result);
});

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const mysql = require('mysql2');
const Employee = require('./Models/employee');
const Role = require('./Models/role');
const Department = require('./Models/department');

const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'employee'
}).promise();


const db = {
    getEmployees: async () => {
        const sql = `SELECT * FROM employee`;
        let [employees] = await connection.query(sql);
        let employeeModels = [];
        for (let i = 0; i < employees.length; i++) {
            let employee = new Employee(employees[i].first_name, employees[i].last_name, employees[i].role_id, employees[i].manager_id, employees[i].id);
            employeeModels.push(employee);
        }
        return employeeModels;
    },
    getDepartments: async () => {
        const sql = `SELECT * FROM department`;
        let [departments] = await connection.query(sql);
        let departmentModels = [];
        for (let i = 0; i < departments.length; i++) {
            let department = new Department(departments[i].name, departments[i].id);
            departmentModels.push(department);
        }
        return departmentModels;
    },
    getRoles: async () => {
        const sql = `SELECT * FROM role`;
        let [roles] = await connection.query(sql);
        let roleModels = [];
        for (let i = 0; i < roles.length; i++) {
            let role = new Role(roles[i].title, roles[i].salary, roles[i].department_id, roles[i].id);
            roleModels.push(role);
        }
        return roleModels;
    },
    addEmployee: async () => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES(?,?,?,?)`;
        const params = [];
    },
    addDepartment: async () => {
        const sql = `INSERT INTO department (name)
                     VALUES(?)`;
    },
    addRole: async () => {
        const sql = `INSERT INTO role (title, salary, department_id)
                     VALUES(?,?,?)`;
    },
    updateEmployee: async (id) => {
        const sql = ``;
    }

};

module.exports = db;



//add a department, add a role, add an employee, and update an employee role

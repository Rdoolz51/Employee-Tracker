const mysql = require('mysql2');
const Employee = require('./Models/employee');
const Role = require('./Models/role');
const Department = require('./Models/department');

const connect = () => mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'root',
    database: 'employee'
}).promise();


const db = {
    getEmployees: async () => {
        const connection = connect();
        const sql = `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, s.first_name AS manager_first_name, s.last_name AS manager_last_name
                     FROM employee e
                     LEFT JOIN role r
                     ON e.role_id=r.id 
                     LEFT JOIN department d
                     ON r.department_id=d.id
                     LEFT JOIN employee s
                     ON e.manager_id=s.id `;
        let [employees] = await connection.query(sql);
        let employeeModels = [];
        for (let i = 0; i < employees.length; i++) {
            let employee = new Employee(employees[i].first_name, employees[i].last_name, employees[i].role_id, employees[i].manager_id, employees[i].id, employees[i].manager_first_name, employees[i].manager_last_name, employees[i].title, employees[i].department_name, employees[i].salary);
            employeeModels.push(employee);
        }
        connection.end();
        return employeeModels;
    },
    getDepartments: async () => {
        const connection = connect();
        const sql = `SELECT * FROM department`;
        let [departments] = await connection.query(sql);
        let departmentModels = [];
        for (let i = 0; i < departments.length; i++) {
            let department = new Department(departments[i].name, departments[i].id);
            departmentModels.push(department);
        }
        connection.end();
        return departmentModels;
    },
    getRoles: async () => {
        const connection = connect();
        const sql = `SELECT role.*, department.name FROM role LEFT JOIN department ON role.department_id = department.id`;
        let [roles] = await connection.query(sql);
        let roleModels = [];
        for (let i = 0; i < roles.length; i++) {
            let role = new Role(roles[i].title, roles[i].salary, roles[i].department_id, roles[i].id, roles[i].name);
            roleModels.push(role);
        }
        connection.end();
        return roleModels;
    },
    addEmployee: async (employeeModel) => {
        const connection = connect();
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                     VALUES(?,?,?,?)`;
        const params = [employeeModel.first_name, employeeModel.last_name, employeeModel.role_id, employeeModel.manager_id];

        await connection.query(sql, params);
        connection.end();
    },
    addDepartment: async (departmentModel) => {
        const connection = connect();
        const sql = `INSERT INTO department (name)
                     VALUES(?)`;
        const params = [departmentModel.name];

        await connection.query(sql, params);
        connection.end();
    },
    addRole: async (roleModel) => {
        const connection = connect();
        const sql = `INSERT INTO role (title, salary, department_id)
                     VALUES(?,?,?)`;
        const params = [roleModel.title, roleModel.salary, roleModel.department_id];

        await connection.query(sql, params);
        connection.end();
    },
    updateEmployeeRole: async (employeeId, employeeRoleId) => {
        const connection = connect();
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [employeeRoleId, employeeId];

        await connection.query(sql, params);
        connection.end();
    },

};

module.exports = db;




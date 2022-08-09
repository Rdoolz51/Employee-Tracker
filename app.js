const db = require('./db/db');
const { prompt } = require('inquirer');
const Department = require('./db/Models/department');
const Role = require('./db/Models/role');
const Employee = require('./db/Models/employee');
const { getDepartments, getRoles } = require('./db/db');

async function getRoleChoices () {
    let roles = await db.getRoles();
    let roleNames = [];
    for (let i = 0; i < roles.length; i++) {
        roleNames.push({
            name: roles[i].title,
            value: roles[i].id
        });

    }
    return roleNames;
}

async function getEmployeeChoices () {
    let employees = await db.getEmployees();
    let employeeNames = [];
    for (let i = 0; i < employees.length; i++) {
        employeeNames.push({
            name: employees[i].first_name + ' ' + employees[i].last_name,
            value: employees[i].id
        });
    }
    return employeeNames;
}

async function getDepartmentChoices () {
    let departments = await db.getDepartments();
    let departmentNames = [];
    for (let i = 0; i < departments.length; i++) {
        departmentNames.push({
            name: departments[i].name,
            value: departments[i].id
        });
    }
    return departmentNames;
}


async function nextTask () {
    const nextMenu = [{
        name: 'nextTaskName',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add New Employee', 'Add New Department', 'Add New Role', 'Update Employee Role', 'Quit']
    }];

    let { nextTaskName } = await prompt(nextMenu);
    let hasQuit = false;

    switch (nextTaskName) {
        case 'View All Employees':
            const employees = await db.getEmployees();
            let empDisplay = [];
            for (let i = 0; i < employees.length; i++) {
                empDisplay.push({
                    id: employees[i].id,
                    first_name: employees[i].first_name,
                    last_name: employees[i].last_name,
                    role_title: employees[i].role_title,
                    department_name: employees[i].department_name,
                    salary: employees[i].salary,
                    manager_name: employees[i].manager_name

                });
            }
            console.table(empDisplay);
            break;
        case 'View All Departments':
            const departments = await db.getDepartments();
            let depDisplay = [];
            for (let i = 0; i < departments.length; i++) {
                depDisplay.push({
                    id: departments[i].id,
                    name: departments[i].name
                });
            }
            console.table(depDisplay);
            break;
        case 'View All Roles':
            const roles = await db.getRoles();
            let roleDisplay = [];
            for (let i = 0; i < roles.length; i++) {
                roleDisplay.push({
                    id: roles[i].id,
                    title: roles[i].title,
                    salary: roles[i].salary,
                    department_name: roles[i].department_name
                });
            }
            console.table(roleDisplay);
            break;
        case 'Add New Employee':
            await buildNewEmployee();
            break;
        case 'Add New Department':
            await buildNewDepartment();
            break;
        case 'Add New Role':
            await buildNewRole();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Quit':
            hasQuit = true;
    }
    if (hasQuit) {
        return;
    }
    await nextTask();
}

async function updateEmployeeRole () {
    const updateRole = [{
        name: 'updatedEmployee',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: await getEmployeeChoices()
    },
    {
        name: 'updatedRole',
        type: 'list',
        message: 'Which role would you like to assign this employee to?',
        choices: await getRoleChoices()
    }];

    let updateRoleAnswers = await prompt(updateRole);
    const updatedEmployeeId = updateRoleAnswers.updatedEmployee;
    const updatedRoleId = updateRoleAnswers.updatedRole;
    await db.updateEmployeeRole(updatedEmployeeId, updatedRoleId);
}
async function buildNewDepartment () {
    const newDepartment = [{
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the new department?'
    }];
    let newDepartmentAnswers = await prompt(newDepartment);
    const departmentModel = new Department(newDepartmentAnswers.newDepartment);
    await db.addDepartment(departmentModel);

}
async function buildNewRole () {
    const newRole = [{
        name: 'newRole',
        type: 'input',
        message: 'What is the title of the new role?'
    },
    {
        name: 'newRoleSalary',
        type: 'input',
        message: 'What is the salary of the new role?'
    },
    {
        name: 'newRoleDepartment',
        type: 'list',
        message: 'Which department does the new role belong to?',
        choices: await getDepartmentChoices()
    }
    ];
    let newRoleAnswers = await prompt(newRole);
    const roleModel = new Role(newRoleAnswers.newRole, newRoleAnswers.newRoleSalary.replace(',', ''), newRoleAnswers.newRoleDepartment);
    await db.addRole(roleModel);
}
async function buildNewEmployee () {

    const newEmployee = [{
        name: 'newEmployeeFirst',
        type: 'input',
        message: 'What is the new employee\'s first name?'
    },
    {
        name: 'newEmployeeLast',
        type: 'input',
        message: 'What is the new employee\'s last name?'
    },
    {
        name: 'newEmployeeRole',
        type: 'list',
        message: 'What is the new employee\'s title?',
        choices: await getRoleChoices()

    },
    {
        name: 'newEmployeeManager',
        type: 'list',
        message: 'Who is the new employee\'s manager?',
        choices: [{ name: 'None', value: null }].concat(await getEmployeeChoices())
    }
    ];


    let newEmployeeAnswers = await prompt(newEmployee);

    const employeeModel = new Employee(newEmployeeAnswers.newEmployeeFirst, newEmployeeAnswers.newEmployeeLast, newEmployeeAnswers.newEmployeeRole, newEmployeeAnswers.newEmployeeManager);

    await db.addEmployee(employeeModel);
}

nextTask().then(result => {
    return;
});

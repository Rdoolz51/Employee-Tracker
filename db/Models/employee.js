const Model = require('./model');

class Employee extends Model {
    constructor(first_name, last_name, role_id, manager_id, id = null, manager_first_name = null, manager_last_name = null, role_title = null, department_name = null, salary = null) {
        super(id);

        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
        this.role_title = role_title;

        if (manager_first_name && manager_last_name) {
            this.manager_name = manager_first_name + ' ' + manager_last_name;
        } else {
            this.manager_name = null;
        }

        this.department_name = department_name;
        this.salary = salary;
    }
}

module.exports = Employee;
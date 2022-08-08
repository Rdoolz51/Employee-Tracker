const Model = require('./model');
class Role extends Model {
    constructor(title, salary, department_id, id = null, department_name = null) {
        super(id);

        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
        this.department_name = department_name;
    }
}

module.exports = Role;
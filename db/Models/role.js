const Model = require('./model');
class Role extends Model {
    constructor(title, salary, department_id, id = null) {
        super(id);

        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
}

module.exports = Role;
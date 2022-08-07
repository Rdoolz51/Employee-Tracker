const Model = require('./model');
class Department extends Model {
    constructor(name, id = null) {
        super(id);

        this.name = name;
    }
}

module.exports = Department;

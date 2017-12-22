import ProblemType from '../models/problem_type';
import masterDAO from './masterDAO';

class ProblemTypeDAO {
    constructor() {
        this.properties = [
            'id',
            'type_name',
            'type_index'
        ];
    }

    insert(obj) {
        return masterDAO.getAll(ProblemType, this.properties);
    }

    update(obj) {
        return masterDAO.update(obj, ProblemType, obj.id);
    }

    getAll() {
        return masterDAO.getAll(ProblemType, this.properties);
    }

    getById(problem_type_id) {
        return masterDAO.getById(problem_type_id, ProblemType, this.properties);
    }
}

const problemTypeDAO = new ProblemTypeDAO();

export default problemTypeDAO;
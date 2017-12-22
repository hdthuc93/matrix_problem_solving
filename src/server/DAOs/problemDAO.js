import Problem from '../models/problem';
import masterDAO from './masterDAO';

class ProblemDAO {
    constructor() {
        this.properties = [
            'id',
            'content',
            'is_public',
            'num_of_submits',
            'num_of_correct_ans',
            'problem_type_id',
            'event_id',
            'constant_id'
        ];
    }

    insert(obj) {
        obj.content = JSON.stringify(obj.content);
        return masterDAO.getAll(Problem, this.properties);
    }

    update(obj) {
        if(obj.content)
            obj.content = JSON.stringify(obj.content);
        return masterDAO.update(obj, Problem, obj.id);
    }

    getAll() {
        return masterDAO.getAll(Problem, this.properties);
    }

    getById(problem_id) {
        return masterDAO.getById(problem_id, Problem, this.properties);
    }
}

const problemDAO = new ProblemDAO();

export default problemDAO;
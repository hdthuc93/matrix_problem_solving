import Problem from '../models/problem';
import MasterDAO from './masterDAO';

class ProblemDAO extends MasterDAO {
    constructor() {
        let properties = [
            'id',
            'content',
            'is_public',
            'num_of_submits',
            'num_of_correct_ans',
            'problem_type_id',
            'event_id',
            'constant_id'
        ];
        super(Problem, properties);
    }
}

const problemDAO = new ProblemDAO();

export default problemDAO;
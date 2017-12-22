import Solution from '../models/solution';
import MasterDAO from './masterDAO';

class SolutionDAO extends MasterDAO {
    constructor() {
        let properties = [
            'id',
            'content',
            'problem_id',
            'score_id'
        ];
        super(Solution, properties);
    }
}

const solutionDAO = new SolutionDAO();

export default solutionDAO;
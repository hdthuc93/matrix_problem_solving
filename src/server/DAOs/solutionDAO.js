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

    async getByProblemId(problem_id) {
        try {
            let res = await Solution.findOne({ where: { problem_id: problem_id } });
            return res;
        } catch(ex) {
            throw new Error(ex);
        }
    }
}

const solutionDAO = new SolutionDAO();

export default solutionDAO;
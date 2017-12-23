import Submission from '../models/submission';
import MasterDAO from './masterDAO';

class SubmissionDAO extends MasterDAO {
    constructor() {
        let properties = [
            'id',
            'content',
            'time',
            'result',
            'user_id',
            'problem_id',
        ];
        super(Submission, properties);
    }
}

const submissionDAO = new SubmissionDAO();

export default submissionDAO;
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
        this.properties = properties;
    }

    async getByUserId(user_id) {
        let lst = [];
        let properties = this.properties;
        try {
            let res = Submission.findAll({ where: { user_id: user_id } });

            for(let i = 0; i < res.length; ++i) {
                let obj = {};
                for(let j = 0; j < properties.length; ++j) {
                    obj[properties[j]] = res[i][properties[j]];
                }
                lst.push(obj);
            }
        } catch(ex) {
            throw new Error(ex);
        }

        return lst;
    }
}

const submissionDAO = new SubmissionDAO();

export default submissionDAO;
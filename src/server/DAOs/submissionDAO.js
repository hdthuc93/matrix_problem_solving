import Submission from '../models/submission';
import MasterDAO from './masterDAO';
import { sequelize } from '../models/index-model';

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
        let queryStr = `SELECT * FROM submission AS s
                            WHERE s.user_id = ${user_id} AND 
                                    s.id = (SELECT s2.id 
                                                    FROM submission s2 
                                                    WHERE s.problem_id = s2.problem_id 
                                                    ORDER BY s2.time DESC 
                                                    LIMIT 1)`;
        try {
            let res = await sequelize.query(queryStr, { type: sequelize.QueryTypes.SELECT});
            for(let i = 0; i < res.length; ++i) {
                let obj = {};
                for(let j = 0; j < properties.length; ++j) {
                    if(properties[j] === 'result')
                        obj[properties[j]] = res[i][properties[j]].lastIndexOf(1) !== -1;
                    else
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
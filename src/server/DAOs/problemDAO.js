import Problem from '../models/problem';
import ProblemType from '../models/problem_type';
import Constant from '../models/constant';
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
        this.properties = properties;
    }

    async getConstAndTypeId(problem_id) {
        let result = await Problem.findOne({ 
            where: { id: problem_id },
            include: [{
                model: Constant,
                required: true
            }, {
                model: ProblemType,
                required: true
            }]
        });

        console.log(result);

        let outData = {
            constant_id: result['constant']['id'],
            min_size: result['constant']['min_size'],
            max_size: result['constant']['max_size'],
            level: result['constant']['level'],
            problem_type_name: result['problem_type']['type_name'],
            problem_type_index: result['problem_type']['type_index']
        };

        return outData;
    }

    async getAllExpanded() {
        let arr = [{
            model: Constant,
            modelName: 'constant',
            required: true
        }, {
            model: ProblemType,
            modelName: 'problem_type',
            required: true
        }];

        let superRes = await super.getAllExpanded(arr);
        return superRes;
    }
}

const problemDAO = new ProblemDAO();

export default problemDAO;
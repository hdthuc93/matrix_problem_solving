import ProblemType from '../models/problem_type';
import MasterDAO from './masterDAO';

class ProblemTypeDAO extends MasterDAO {
    constructor() {
        let properties = [
            'id',
            'type_name',
            'type_index'
        ];
        super(ProblemType, properties);
    }
}

const problemTypeDAO = new ProblemTypeDAO();

export default problemTypeDAO;
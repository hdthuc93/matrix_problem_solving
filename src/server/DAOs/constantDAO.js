import Constant from '../models/constant';
import MasterDAO from './masterDAO';

class ConstantDAO extends MasterDAO {
    constructor() {
        let properties = [
            'id',
            'min_size',
            'max_size',
            'level',
            'is_active'
        ];
        super(Constant, properties);
    }
}

const constantDAO = new ConstantDAO();

export default constantDAO;
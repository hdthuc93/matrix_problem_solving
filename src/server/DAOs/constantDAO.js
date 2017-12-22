import Constant from '../models/constant';
import masterDAO from './masterDAO';

class ConstantDAO {
    constructor() {
        this.properties = [
            'id',
            'min_size',
            'max_size',
            'level',
            'is_active'
        ];
    }

    insert(obj) {
        return masterDAO.getAll(Constant, this.properties);
    }

    update(obj) {
        return masterDAO.update(obj, Constant, obj.id);
    }

    getAll() {
        return masterDAO.getAll(Constant, this.properties);
    }

    getById(constant_id) {
        return masterDAO.getById(constant_id, Constant, this.properties);
    }
}

const constantDAO = new ConstantDAO();

export default constantDAO;
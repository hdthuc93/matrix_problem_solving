

class MasterDAO {
    async insert(obj, Model) {
        try {
            let res = await Model.create(obj);
        } catch(ex) {
            throw new Error(ex);
        }
        return true;
    }

    async update(obj, Model, id) {
        try {
            let res = await Model.update(obj, { where: { id: id } });
        } catch(ex) {
            throw new Error(ex);
        }

        return true;
    }

    async getAll(Model, properties) {
        let lst = [];
        try {
            let res = await Model.findAll();
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

    async getById(id, Model, properties) {
        let obj;
        try {
            let res = await Model.findById(id);

            if(res)
                for(let j = 0; j < properties.length; ++j) {
                    obj[properties[j]] = res[properties[j]];
                }
        } catch(ex) {
            throw new Error(ex);
        }

        return obj;
    }
}

const masterDAO = new MasterDAO();

export default masterDAO;
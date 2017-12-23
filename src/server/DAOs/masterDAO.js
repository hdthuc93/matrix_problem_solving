

class MasterDAO {
    constructor(Model, properties) {
        this.properties = properties;
        this.Model = Model;
    }

    async insert(obj) {
        try {
            let res = await this.Model.create(obj);
        } catch(ex) {
            throw new Error(ex);
        }
        return true;
    }

    async update(obj, id) {
        try {
            let res = await this.Model.update(obj, { where: { id: id } });
        } catch(ex) {
            throw new Error(ex);
        }
        return true;
    }

    async getAll() {
        let lst = [];
        let properties = this.properties;
        let Model = this.Model;
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

    async getAllExpanded(arr) {
        let lst = [];
        let properties = this.properties;
        let Model = this.Model;
        let modelInclude = [];

        for(let i = 0; i < arr.length; ++i) {
            modelInclude.push({
                model: arr[i].model,
                required: arr[i].required
            });
        }

        try {
            let res = await Model.findAll({ include: modelInclude });
            for(let i = 0; i < res.length; ++i) {
                let obj = {};
                for(let j = 0; j < properties.length; ++j) {
                    obj[properties[j]] = res[i][properties[j]];
                }

                for(let j = 0; j < arr.length; ++j) {
                    obj[arr[j].modelName] = res[i][arr[j].modelName];
                }

                lst.push(obj);
            }

        } catch(ex) {
            throw new Error(ex);
        }

        return lst;
    }

    async getById(id) {
        let obj;
        let properties = this.properties;
        let Model = this.Model;
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

// const masterDAO = new MasterDAO();

export default MasterDAO;
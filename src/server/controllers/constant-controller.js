import constantDAO from '../DAOs/constantDAO';

async function getAll(req, res) {
    try {
        let result = await constantDAO.getAll();
        return res.status(200).json({
            msg: "Get all constant(s) successfully",
            success: true,
            data: result
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to get constant(s)",
            success: false
        });
    }
}

async function update(req, res) {
    let obj = {
        min_size: req.body.min_size,
        max_size: req.body.max_size
    };

    try { 
        let result = await constantDAO.update(obj, req.body.id);
        return res.status(200).json({
            msg: "Update constant successfully",
            success: true
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to update constant",
            success: false
        });
    }
}

export default { getAll, update };
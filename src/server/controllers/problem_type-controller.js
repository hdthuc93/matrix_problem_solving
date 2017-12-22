import problemTypeDAO from '../DAOs/problemTypeDAO';

async function getAll(req, res) {
    try {
        let result = await problemTypeDAO.getAll();
        return res.status(200).json({
            msg: "Get all problem type(s) successfully",
            success: true,
            data: result
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to get problem type(s)",
            success: false
        });
    }
}

export default { getAll };
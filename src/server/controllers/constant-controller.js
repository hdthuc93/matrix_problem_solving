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

export default { getAll };
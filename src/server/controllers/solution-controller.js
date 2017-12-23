import solutionDAO from '../DAOs/solutionDAO';

async function insert(req, res) {
    let obj = {
        content: req.body.content,
        problem_id: req.body.problem_id,
        score_id: req.body.score_id || null
    }

    obj.content = JSON.stringify(obj.content);
    try {
        let result = await solutionDAO.insert(obj);
        return res.status(200).json({
            msg: "Insert solution successfully",
            success: true
        });
    } catch(ex) {
        return res.status(500).json({
            msg: "Fail to insert solution",
            success: false
        });
    }
}

async function getById(req, res) {
    try {
        let result = await solutionDAO.getById(req.query.id);

        if(result && result.content)
            result.content = JSON.parse(result.content);

        return res.status(200).json({
            msg: "Get solution by id successfully",
            success: true,
            data: result
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to get solution by id",
            success: false
        });
    }
}

export default { insert, getById }
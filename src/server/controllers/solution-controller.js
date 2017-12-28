import solutionDAO from '../DAOs/solutionDAO';
import problemDAO from '../DAOs/problemDAO';

async function insert(req, res) {
    let obj = {
        content: req.body.content,
        problem_id: req.body.problem_id,
        score_id: req.body.score_id
    }

    obj.content = JSON.stringify(obj.content);
    try {
        let solveExist = await solutionDAO.getByProblemId(obj.problem_id);

        if(solveExist && solveExist.id) {
            let res = await solutionDAO.update({ content: obj.content }, solveExist.id);    
            return res.status(200).json({
                msg: "Update solution successfully",
                success: true
            });
        } else {
            let [resIns, resUp] = await Promise.all([solutionDAO.insert(obj), problemDAO.update({ is_public: true }, obj.problem_id)]);
            return res.status(200).json({
                msg: "Insert solution successfully",
                success: true
            });
        }
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to insert solution",
            success: false
        });
    }
}

async function update(req, res) {
    let obj = {
        content: req.body.content,
        // problem_id: req.body.problem_id,
        // score_id: req.body.score_id
    }

    try { 
        let res = await solutionDAO.update(obj, req.body.id);
        return res.status(200).json({
            msg: "Update solution successfully",
            success: true
        });
    } catch(ex) {
        return res.status(500).json({
            msg: "Fail to update solution",
            success: false
        });
    }
}

async function getById(req, res) {
    try {
        let result = await solutionDAO.getById(req.params.id);

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

export default { insert, update, getById }
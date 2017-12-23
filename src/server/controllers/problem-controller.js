import problemDAO from '../DAOs/problemDAO';

async function getAll(req, res) {
    let problem_type_id = req.params.type == -1 ? null : req.params.type;
    let constant_id = req.params.const == -1 ? null : req.params.const;

    try {
        let result;
        if(problem_type_id || constant_id)
            result = await problemDAO.getByCondition(problem_type_id, constant_id);
        else
            result = await problemDAO.getAllExpanded();

        for(let i = 0; i < result.length; ++i)
            result[i].content = JSON.parse(result[i].content);

        result.sort(function(a, b) { return b.id - a.id });
        
        return res.status(200).json({
            msg: "Get all problem type(s) successfully",
            success: true,
            data: result
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to get problems",
            success: false
        });
    }
}

async function insert(req, res) {
    let obj = {
        content: req.body.content,
        is_public: false,
        num_of_submits: 0,
        num_of_correct_ans: 0,
        problem_type_id: req.body.problem_type_id,
        event_id: req.body.event_id || null,
        constant_id: req.body.constant_id
    }

    obj.content = JSON.stringify(obj.content);
    try {
        let result = await problemDAO.insert(obj);
        return res.status(200).json({
            msg: "Insert problem successfully",
            success: true
        });
    } catch(ex) {
        return res.status(500).json({
            msg: "Fail to insert problem",
            success: false
        });
    }
}

export default { getAll, insert };
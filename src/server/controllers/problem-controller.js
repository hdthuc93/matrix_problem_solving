import problemDAO from '../DAOs/problemDAO';
import submissionDAO from '../DAOs/submissionDAO';

async function getAll(req, res) {
    let problem_type_id = req.params.type == -1 ? null : req.params.type;
    let constant_id = req.params.const == -1 ? null : req.params.const;
    let user = res.locals.user;

    try {
        let result, userSubmits;
        if(problem_type_id || constant_id)
            [result, userSubmits] = await Promise.all([problemDAO.getByCondition(problem_type_id, constant_id),
                                                        submissionDAO.getByUserId(user.id)]);
        else
            [result, userSubmits] = await Promise.all([problemDAO.getAllExpanded(),
                                                        submissionDAO.getByUserId(user.id)]);

        for(let i = 0; i < result.length; ++i) {
            result[i].content = JSON.parse(result[i].content);
            for(let j = 0; j < userSubmits.length; ++j) {
                if(result[i].id === userSubmits[j].problem_id) {
                    result[i].user_result = userSubmits[j].result;
                    break;
                }
            }
        }

        result.sort(function(a, b) { return parseInt(b.id) - parseInt(a.id) });
        
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
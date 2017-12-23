import solutionDAO from '../DAOs/solutionDAO';
import problemDAO from '../DAOs/problemDAO';
import submissionDAO from '../DAOs/submissionDAO';

async function checkCorrectAns(req, res) {
    let inObj = {
        content: req.body.content,
        time: null,
        result: false,
        user_id: req.body.user_id,
        problem_id: req.body.problem_id
    }

    try {
        let [constAndType, solution] = await Promise.all([
            problemDAO.getConstAndTypeId(inObj.problem_id),
            solutionDAO.getByProblemId(inObj.problem_id)
        ]);

        let content = JSON.parse(solution.content);
        let flag = true;
        
        if(constAndType.problem_type_index >= 1 && constAndType.problem_type_index <= 3) {
            if(checkMatrixEqual(inObj.content, content)) {
                inObj.result = true;
            }
        } else if(constAndType.problem_type_index === 4) {
            if(inObj.content.length === content.length) {
                for(let i = 0; i < content.length; ++i) {
                    if(!checkCorrectAns(inObj.content[i], content[i])) {
                        flag = false;
                        break;
                    }
                }
                inObj.result = flag;
            }
        } else {
            if(inObj.content.length === content.length) {
                for(let i = 0; i < content.length; ++i) {
                    if(inObj.content[i] !== content[i]) {
                        flag = false;
                        break;
                    }
                }
                inObj.result = flag;
            }
        }
        
        inObj.time = new Date();
        let result = await submissionDAO.insert(obj);

        return res.status(200).json({
            msg: "Submission answer successfully",
            success: true,
            data: inObj
        });
    } catch(ex) {
        console.log(ex);
        return res.status(500).json({
            msg: "Fail to submission answer",
            success: false
        });
    }
}

function checkMatrixEqual(arr1, arr2) {
    if(arr1.length === 0 || arr2.length === 0 || 
        arr1.length !== arr2.length ||
        arr1[0].length === 0 || arr2[0].length === 0||
        arr1[0].length !== arr2[0].length)
        return false;

    for(let i = 0; i < arr2.length; ++i) {
        for(let j = 0; j < arr2[i].length; ++j) {
            if(arr1[i][j] != arr2[i][j]) {
                return false;
            }
        }
    }

    return true;
}

export default { checkCorrectAns };
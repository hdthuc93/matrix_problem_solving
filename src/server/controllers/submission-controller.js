// import solutionDAO from '../DAOs/solutionDAO';
// import problemDAO from '../DAOs/problemDAO';

// async function checkCorrectAns(req, res) {
//     let inObj = {
//         content: req.body.content,
//         time: null,
//         result: null,
//         user_id: req.body.user_id,
//         problem_id: req.body.problem_id
//     }

//     try {
//         let constant = problemDAO.getConstantByProblemId(inObj.problem_id);
//         let solution = solutionDAO.getByProblemId(inObj.problem_id);
//         [constant, solution] = await* [constant, solution];

//     } catch(ex) {
//         console.log(ex);
//         return res.status(500).json({
//             msg: "Fail to get problems",
//             success: false
//         });
//     }
// }
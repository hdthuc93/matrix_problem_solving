import User from '../models/user';

function test(req, res) {
    User.findAll()
    .then(data => {
        res.status(200).json(data);
    })
}

export default { test };
import problemDAO from '../DAOs/problemDAO';

async function getAll(req, res) {
    try {
        let result = await problemDAO.getAll();
        return res.status(200).json(result);
    } catch(ex) {
        return res.status(500).json();
    }
}

export default { getAll };
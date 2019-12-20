import express from 'express';
import usersDataService from '../src/services/usersDataService';
import checkUserBodyMiddleware from '../middleware/checkUserBodyMiddleware';

const router = express.Router();

router.get('/', (req, res) => {
    const { login, limit } = req.query;
    if (login && limit) {
        const list = usersDataService.getAutoSuggestUsers(login, limit);
        res.json(list);
    } else {
        const data = usersDataService.getAllUsers();
        res.json(data);
    }
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = usersDataService.getUserById(userId);
    if (user) {
        res.json(user);
    }
    res.status(400);
    res.end('User not found');
});

router.post('/', checkUserBodyMiddleware, (req, res) => {
    const reqUser = req.body;
    const newUser = usersDataService.createUser(reqUser);
    res.json(newUser);
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const reqUser = req.body;
    const updatedUser = usersDataService.updateUserById(userId, reqUser);
    if (updatedUser) {
        res.json(updatedUser);
    }
    res.status(400);
    res.end('User not found');
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const removedUser = usersDataService.removeUserById(userId);
    if (removedUser) {
        res.json(removedUser);
    }
    res.status(400);
    res.end('User not found');
});

export default router;

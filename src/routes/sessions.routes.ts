import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if (!user) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const comparePassword = compare(password, user.password);

    if (!comparePassword) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const token = sign({}, '4618abe5d74670f36209f2bed928ae9a', {
        subject: String(user.id),
        expiresIn: '1d'
    });

    return response.json({ user, token });
});

export default sessionsRouter;

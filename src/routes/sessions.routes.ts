import { Router } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import knex from '../database/connection';
import authConfig from '../config/auth';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if (!user) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
        return response.status(400).json({ message: 'Credentials not found.' });
    }

    const token = sign({}, authConfig.jwt.secret, {
        subject: String(user.id),
        expiresIn: authConfig.jwt.expiresIn
    });

    return response.json({ user, token });
});

export default sessionsRouter;

/*

Middleware de Autenticação

criar um middleware para proteger rotas que só podem ser acessadas 
por usuários autenticados na aplicação, através do token JWT.

Se considerarmos que para um usuário listar e criar locations ele precisa 
estar autenticado, esse middleware servirá exatamente para que possamos 
verificar, a cada requisição para essas rotas, se existe um token válido 
para liberar o acesso. Esse token é enviado no cabeçalho de cada requisição.

1. ajustar a configuracao do JWT
2. criar o middleware

*/
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthController {
    static authenticate(_arg0: string, _authenticate: any) {
        throw new Error('Method not implemented.');
    }
    
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isValuePassword = await compare(password, user.password);

        if (!isValuePassword) {
            return res.status(400).json({ error: 'Password invalid' });
        }

        const token = sign({id: user.id}, "secret", {expiresIn: "1d"});

        const { id } = user;

        return res.json({user: {id, email}, token});
    }
}
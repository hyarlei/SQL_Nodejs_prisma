import { PrismaClient } from '@prisma/client'
import { Request, Response} from 'express'
import { hash } from 'bcrypt'

const prisma = new PrismaClient();

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export default {
    async index(_req: Request, res: Response) { 
        const users = await prisma.user.findMany();
        return res.json(users);
    },

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            })
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },

    async store(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body

            const userExists = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
    
            if (userExists) {
                return res.status(400).json({ error: 'User exists' });
            }

            const hash_password = await hash(password, 8);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password,
                },
            });
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name, email } = req.body
            const user = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    email
                }
            })
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    
    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            res.json(user)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
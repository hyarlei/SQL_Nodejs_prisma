import express from 'express'
import { Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt';
import { routes } from './routes';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(routes);

// Obter todos os usuários
app.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})

// Obter um usuário pelo ID
app.get('/users/:id', async (req: Request, res: Response) => {
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
    }
})

// Criar um novo usuário
app.post('/users', async (req: Request, res: Response) => {
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

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await hash(password, 8)
            }
        })
        res.json({ user, message: 'User created successfully' })
    } catch (error) {
        console.log(error)
    }
})

// Atualizar um usuário existente
app.put('/users/:id', async (req: Request, res: Response) => {
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
        res.json({ user, message: 'User updated successfully' })
    } catch (error) {
        console.log(error)
    }
})

// Deletar um usuário existente
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.json({ user, message: 'User deleted successfully' })
    } catch (error) {
        console.log(error)
    }
})

// Obter todos os posts
app.get('/posts', async (_req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: false,
                        name: true,
                        email: true,
                        password: true,
                    },
                },
            },
        })
        res.json(posts)
    } catch (error) {
        console.log(error)
    }
})

// Obter um post pelo ID
app.get('/posts/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })
        res.json(post)
    } catch (error) {
        console.log(error)
    }
})

// Criar um novo post
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        })
        res.json({ post, message: 'Post created successfully' })
    } catch (error) {
        console.log(error)//Pesquisar como fazer o tratamento de erro
    }
})

// Atualizar um post existente
app.put('/posts/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, content } = req.body
        const post = await prisma.post.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                content,
            },
            include: {
                author: {
                    select: {
                        id: false,
                        name: true,
                        email: true,
                    },
                },
            },
        })
        res.json({ post, message: 'Post updated successfully' })
    } catch (error) {
        console.log(error)
    }
})

// Excluir um post existente
app.delete('/posts/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const post = await prisma.post.delete({
            where: {
                id: Number(id)
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })
        res.json({ post, message: 'Post deleted successfully' })
    } catch (error) {
        console.log(error)
    }
})

//auth routes
app.post('/auth', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        res.json({ error: 'Error' });
    }
})
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});

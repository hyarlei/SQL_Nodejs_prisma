import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface IPost {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

export default {
  async index(_req: Request, res: Response) {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return res.json(posts);
  },

  // Busca um post pelo id
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          id: Number(id),
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
      });
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  // Cria um novo post
  async store(req: Request, res: Response) {
    try {
      const { title, content, authorId } = req.body;

      const post = await prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: {
              id: authorId,
            },
          },
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
      });
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  
  // Atualiza um post
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = await prisma.post.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
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
      });
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  // Deleta um post
  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.delete({
        where: {
          id: Number(id),
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
      });
      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
};

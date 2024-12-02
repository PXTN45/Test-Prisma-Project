import prisma from "../../prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const getByName = async (req: Request, res: Response) => {
  const role = req.query.role;
  try {
    const user = await prisma.user.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "user",
            text: {
              query: role,
              path: "role"
            },
          },
        },
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error Get By Name" });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, image, email, role, password } = req.body;
  console.log(req.body);

  const salt = 10;
  const newPassword = bcrypt.hashSync(password, salt);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "Email already exists" });
    }
    const newUser = await prisma.user.create({
      data: { name, image, email, password: newPassword, role },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET!;
  const salt = 10;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compareSync(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "10h",
      });
      res.cookie("token", token);
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
    // res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        email,
      },
    });
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const deleteAllUser = await prisma.user.deleteMany();
    res.status(200).json(deleteAllUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export {
  getAllUser,
  getUserById,
  createUser,
  signIn,
  deleteUser,
  deleteAllUser,
  getByName
};

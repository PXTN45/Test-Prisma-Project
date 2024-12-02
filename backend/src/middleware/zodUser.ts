import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";

const shoeSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  image: z.string().optional(),
  role: z.enum(["user", "owner", "admin"]),
});

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    shoeSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
  }
};

export default validateUser;

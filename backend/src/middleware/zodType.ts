import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";

const shoeSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().min(0),
  isAvailable: z.boolean().default(true),
  images: z.array(z.string()).nonempty(),
  sizes: z.string(),
});

const validateShoe = (
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

export default validateShoe;

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // เพิ่ม property user ใน request object
}

function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token; // ดึง token จาก cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // ตรวจสอบความถูกต้องของ token
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user; // เก็บข้อมูลผู้ใช้ใน request
    next();
  });
}

import express from "express";
import cors from "cors"
import userRoutes from "./Routes/userRoutes";
import furnitrueRoutes from "./Routes/shoeRoutes"
import prisma from "../prisma/client";
import cookieParser from 'cookie-parser';

const app = express();
// กำหนดการตั้งค่า CORS
const corsOptions = {
  origin: "http://localhost:5173", // ให้ตรงกับที่คุณเรียกใช้งาน
  credentials: true, // ให้ส่งคุกกี้
};
app.use(cookieParser());
app.use(cors(corsOptions)); // ใช้งาน CORS
app.use(express.json());

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

app.use("/users", userRoutes);
app.use("/", furnitrueRoutes);

// จัดการ uncaughtException
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // คุณสามารถเพิ่มการ log หรือแจ้งเตือนได้ที่นี่
});

// จัดการ unhandledRejection
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // คุณสามารถเพิ่มการ log หรือแจ้งเตือนได้ที่นี่
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

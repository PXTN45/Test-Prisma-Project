import express from "express";
import {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  signIn,
  deleteAllUser,
  getByName,
} from "../Controllers/userController";
import validateUser from "../middleware/zodUser";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUser);
router.get("/search", getByName);
router.post("/create", validateUser, createUser);
router.post("/signin", signIn);
router.delete("/delete", deleteUser);
router.delete("/deleteAll", deleteAllUser);

export default router;

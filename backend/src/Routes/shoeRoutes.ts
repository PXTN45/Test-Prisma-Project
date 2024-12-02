import express from "express";
import {
  getAll,
  createShoe,
  deleteById,
  getById,
  getByName,
} from "../Controllers/shoeController";
import validateShoe from "../middleware/zodType";

const router = express.Router();

router.get("/shoes", getAll);
router.get("/shoe", getByName);
router.get("/shoe/:id", getById);
router.post("/create-shoe", validateShoe, createShoe);
router.delete("/delete/:shoeId", deleteById);

export default router;

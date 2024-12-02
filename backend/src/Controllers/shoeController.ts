import prisma from "../../prisma/client";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
  try {
    const furnitures = await prisma.shoe.findMany({
      where: { isAvailable: true },
    });
    res.status(200).json(furnitures);
  } catch (error) {
    res.status(500).json({ error: "Error Get All Funiture" });
  }
};


const getByName = async (req: Request, res: Response) => {
  const name = req.query.name;
  try {
    const shoe = await prisma.shoe.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: "shoe",
            text: {
              query: name,
              path: "name"
            },
          },
        },
      ],
    });
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json({ error: "Error Get By Name Shoe" });
  }
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const furnitures = await prisma.shoe.findFirst({
      where: { id },
    });
    res.status(200).json(furnitures);
  } catch (error) {
    res.status(500).json({ error: "Error Get All Funiture" });
  }
};

const createShoe = async (req: Request, res: Response) => {
  const { name, description, price, stock, images, sizes } = req.body;

  try {
    // สร้างข้อมูลรองเท้าใหม่
    const shoe = await prisma.shoe.create({
      data: {
        name,
        description,
        price,
        stock,
        isAvailable: stock > 0,
        images: {
          create: images.map((imageUrl: string) => ({
            url: imageUrl, // แก้ให้ `url` เป็น String โดยตรง
          })),
        },
        sizes,
      },
    });

    // ส่งข้อมูลรองเท้าที่ถูกสร้างไปให้ client
    res.status(201).json(shoe);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating shoe:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.shoeId;
    const order = await prisma.order.findMany({
      where: {
        shoeId: id,
      },
    });
    if (order.length > 0) {
      await prisma.order.deleteMany({
        where: {
          shoeId: id,
        },
      });
      console.log("123");
    }

    const deletedShoe = await prisma.shoe.delete({
      where: {
        id: id, // ลบ Furniture โดยใช้ id
      },
    });

    res.status(200).json(deletedShoe);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { getAll, createShoe, deleteById, getById, getByName };

import { Request, Response } from "express";
import { database } from "../../db.js";
import { IUser } from "./user.interface.js";

const userCollection = database.collection<IUser>("user");

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userCollection.find().toArray();
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

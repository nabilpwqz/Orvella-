import { Request, Response } from "express";
import { database } from "../../db.js";
import { IPerfume } from "./perfume.interface.js";
import { ObjectId } from "mongodb";

const perfumeCollection = database.collection<IPerfume>("perfumes");

// Add Perfume
export const addPerfumes = async (req: Request, res: Response) => {
  try {
    const perfumeData = req.body;

    const addPerfumesData = {
      ...perfumeData,
      createdAt: new Date(),
    };

    const result = await perfumeCollection.insertOne(addPerfumesData);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add perfume",
    });
  }
};

// all perfumes get (with Pagination/Infinite Scroll support)
export const getPerfumes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;

    // Calculate items to skip
    const skip = (page - 1) * limit;

    // Fetch paginated data from MongoDB
    const result = await perfumeCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total document count
    const totalPerfumes = await perfumeCollection.countDocuments();
    const totalPages = Math.ceil(totalPerfumes / limit);

    res.json({
      success: true,
      data: result,
      currentPage: page,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get perfumes",
    });
  }
};

// get perfume by id
export const getPerfumeById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const perfume = await perfumeCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!perfume) {
      return res.status(404).json({
        success: false,
        message: "Perfume not found",
      });
    }

    return res.json(perfume);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get perfume",
    });
  }
};

// delete perfume by id
export const deletePerfume = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const result = await perfumeCollection.deleteOne({
      _id: new ObjectId(id),
    });

    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete perfume",
    });
  }
};

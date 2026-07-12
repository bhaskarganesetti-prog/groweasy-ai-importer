import type { Request, Response } from "express";
import { uploadCsvService } from "../services/upload.service";

export const uploadCsv = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.file);

    const result = await uploadCsvService(req.file);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
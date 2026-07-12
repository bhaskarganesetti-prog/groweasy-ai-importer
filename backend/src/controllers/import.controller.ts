import { Request, Response } from "express";
import { importCsvService } from "../services/import.service";

export const importCsv = async (req: Request, res: Response) => {
  try {
    const { records } = req.body;

    if (!records || !Array.isArray(records)) {
      return res.status(400).json({
        success: false,
        message: "records array is required",
      });
    }

    const result = await importCsvService(records);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Import failed",
    });
  }
};
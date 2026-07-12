import fs from "fs";
import csv from "csv-parser";

export const uploadCsvService = async (file: any) => {

  if (!file) {
    return {
      success: false,
      message: "No file uploaded"
    };
  }

  const rows: any[] = [];

  return new Promise((resolve, reject) => {

    fs.createReadStream(file.path)

      .pipe(csv())

      .on("data", (data) => {
        rows.push(data);
      })

      .on("end", () => {

        resolve({
          success: true,
          totalRows: rows.length,
          preview: rows.slice(0, 10)
        });

      })

      .on("error", (error) => {
        reject(error);
      });

  });

};
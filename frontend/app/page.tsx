"use client";

import { useState } from "react";
import Papa, { ParseResult } from "papaparse";

import UploadBox from "../components/UploadBox";
import PreviewTable from "../components/PreviewTable";
import ConfirmButton from "../components/ConfirmButton";
import { importCsv } from "../services/api";
import ResultTable from "../components/ResultTable";
export default function Home() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

    const [previewData, setPreviewData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const handleFileSelect = (file: File) => {
  // Selected file state lo save chestundi
  setSelectedFile(file);

  // CSV ni parse chestundi
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,

    complete: (results: ParseResult<any>) => {
      setPreviewData(results.data as any[]);
    },

    error: (error) => {
      console.error("CSV Parse Error:", error);
    },
  });
};
const handleConfirmImport = async () => {
  try {
    setLoading(true);

    const response = await importCsv(previewData);

    console.log(response);

    setResult(response);
  } catch (error) {
    console.error(error);

    alert("Import Failed");
  } finally {
    setLoading(false);
  }
};

 return (
  <main className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 py-10 px-4">

    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-blue-700">
          GrowEasy AI CSV Importer
        </h1>

        <p className="text-gray-500 mt-2">
          Upload any CRM CSV and let AI automatically extract lead information.
        </p>

      </div>

      <UploadBox onFileSelect={handleFileSelect} />

      {selectedFile && (
        <div className="mt-6 bg-green-100 border border-green-300 rounded-lg p-4">
          <p className="text-green-800 font-medium">
            ✅ Selected File: {selectedFile.name}
          </p>
        </div>
      )}

      {previewData.length > 0 && (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              CSV Preview
            </h2>

            <PreviewTable data={previewData} />
          </div>

          <div className="flex justify-center mt-8">
            <ConfirmButton
              onConfirm={handleConfirmImport}
              loading={loading}
            />
          </div>
        </>
      )}

      {result && (
        <div className="mt-10">
          <ResultTable result={result} />
        </div>
      )}

    </div>

  </main>
); 
}
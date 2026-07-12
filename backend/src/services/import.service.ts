import { createBatches } from "./ai/batch.service";
import { buildPrompt } from "./ai/prompt.service";
import { callGemini } from "./ai/gemini.service";

export const importCsvService = async (records: unknown[]) => {
  const batches = createBatches(records);

  const parsedRecords: Record<string, unknown>[] = [];

  for (const batch of batches) {
    const prompt = buildPrompt(batch);

    const output = await callGemini(prompt);

    if (Array.isArray(output)) {
      parsedRecords.push(...output);
    }
  }

  const totalImported = parsedRecords.length;
  const totalSkipped = records.length - totalImported;

  return {
    success: true,
    totalRecords: records.length,
    totalImported,
    totalSkipped,
    parsedRecords,
  };
};
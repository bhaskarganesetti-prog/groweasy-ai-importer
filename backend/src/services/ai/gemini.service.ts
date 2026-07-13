import { openrouter } from "../../config/openrouter";

export const callGemini = async (prompt: string) => {
  try {
    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      max_tokens: 1500,
    });

    console.log("OpenRouter Response:");
    console.log(JSON.stringify(completion, null, 2));

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No choices returned from OpenRouter");
    }

    let text = completion.choices[0].message?.content || "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
};
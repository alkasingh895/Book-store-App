import OpenAI from "openai";

export const generateBookInsight =
  async (book) => {

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey:
        process.env.OPENROUTER_API_KEY,
    });

    const completion =
      await client.chat.completions.create({
        model:
          "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "system",
            content:
              "You are a professional book reviewer.",
          },

          {
            role: "user",
            content: `
Book Name:
${book.name}

Description:
${book.description}

Generate:

📚 Summary

🎯 What readers will learn

⭐ Why readers like this book

👥 Who should read this book

Keep the response short, attractive and easy to read.
`,
          },
        ],
      });

    return completion.choices[0]
      .message.content;
  };
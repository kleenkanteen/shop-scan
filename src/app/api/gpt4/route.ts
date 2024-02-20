import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { photo } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What’s in this image in a word without any punctuation?",
            },
            {
              type: "image_url",
              image_url: {
                url: photo,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });
  } catch (error: any) {
    return new NextResponse("not alright");
  }

  return new NextResponse("alright");
}

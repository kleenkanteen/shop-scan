import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function encodeImage(imagePath: any) {
  return fs.readFileSync(imagePath, { encoding: "base64" });
}

export async function POST(req: NextRequest) {
  const { photo } = await req.json();

  const base64Image = encodeImage(photo);
  // try and get the photo before this code below
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4-vision-preview",
  //     messages: [
  //       {
  //         role: "user",
  //         content: [
  //           {
  //             type: "text",
  //             text: "What’s in this image?",
  //           },
  //           {
  //             type: "image_url",
  //             image_url: {
  //               url: `data:image/jpeg;base64,${base64Image}`,
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //     max_tokens: 300,
  //   });

  //   console.log(response);

  console.log(base64Image);

  return new NextResponse("ok");
}

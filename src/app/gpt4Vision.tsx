import OpenAI from "openai";
import Image from "next/image";

const fs = require("fs");
const https = require("https");

function encodeImage(imagePath: any) {
  return fs.readFileSync(imagePath, { encoding: "base64" });
}

const openai = new OpenAI();
const imagePath = Image;
// const imagePath = 'path_to_your_image.jpg';
const base64Image = encodeImage(imagePath);

const data = JSON.stringify({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "What’s in this image?",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${base64Image}`,
          },
        },
      ],
    },
  ],
  max_tokens: 300,
});

const options = {
  hostname: "api.openai.com",
  path: "/v1/chat/completions",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer YOUR_OPENAI_API_KEY`,
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res: any) => {
  let responseBody = "";

  res.on("data", (chunk: any) => {
    responseBody += chunk;
  });

  res.on("end", () => {
    console.log(JSON.parse(responseBody));
  });
});

req.on("error", (error: any) => {
  console.error(error);
});

req.write(data);
req.end();

// Quickstart- not for our use case

// async function gpt4Vision() {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4-vision-preview",
//     messages: [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: "What’s in this image?" },
//           {
//             type: "image_url", // change to accept taken image
//             image_url: { //change to taken image
//               "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//             },
//           },
//         ],
//       },
//     ],
//   });
//   console.log(response.choices[0]);
// }
async function gpt4Vision() {}

export default gpt4Vision();

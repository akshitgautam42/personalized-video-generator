import { OpenAI } from "openai";
import sdk from "@api/synthesia";
import dotenv from "dotenv";

dotenv.config();

sdk.auth(process.env.SYNTHESIA_API_KEY || "");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export default async function handler(req:any, res:any) {
  const { companyInfo, productInfo, targetGroup } = req.body;

  try {
    // Generate the script using OpenAI
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Write a 25 words advertisement monologue for explaining the company, product and why they should be interested in learning more about the product.The product "${productInfo}" from the company "${companyInfo}" targeting "${targetGroup}".`,
        },
      ],
    });

    const scriptText = openaiResponse.choices[0].message.content;
    console.log(scriptText);

    // Create the video using Synthesia with the generated script
    const synthesiaResponse = await sdk.createVideo({
      test: "false",
      visibility: "public",
      input: [
        {
          avatarSettings: {
            horizontalAlign: "center",
            scale: 1,
            style: "rectangular",
            seamless: false,
          },
          backgroundSettings: {
            videoSettings: {
              shortBackgroundContentMatchMode: "freeze",
              longBackgroundContentMatchMode: "trim",
            },
          },
          scriptText: scriptText,
          avatar: "anna_costume1_cameraA",
          background: "green_screen",
        },
      ],
      title: productInfo,
      description: `${productInfo} advertisement`,
      soundtrack: "modern",
    });

    res.status(200).json({ success: true, videoId: synthesiaResponse.data.id });
  } catch (error:any) {
    console.error("Error generating video:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

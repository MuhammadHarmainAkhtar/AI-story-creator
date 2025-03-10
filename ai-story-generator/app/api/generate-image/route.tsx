// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   const { prompt } = data;

//   try {
//     const response = await fetch("https://api.deepai.org/api/text2img", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": process.env.DEEPAPI_KEY ?? "",
//       },
//       body: JSON.stringify({ text: prompt }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to generate image");
//     }

//     const result = await response.json();
//     console.log(result);

//     // Assuming `output_url` is the key in the API response containing the image URL
//     return NextResponse.json({ imageUrl: result.output_url });
//   } catch (error) {
//     console.error("Error generating image:", error);
//     return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
//   }
// }

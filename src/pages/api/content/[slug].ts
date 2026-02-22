import type { NextApiRequest, NextApiResponse } from "next";
import { Content } from "@/models";
import connectDB from "@/utils/connectDB";
import { decryptString } from "@/utils/encryptObject";

export default async function contentAPI(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const { slug, key } = req.query;

    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
      });
    }

    if (!key) {
      return res.status(400).json({
        message: "Passkey is required",
      });
    }

    try {
      const savedContent = await Content.findOne({ slug });

      if (!savedContent) {
        return res.status(404).json({
          message: "Not Found",
        });
      }

      const decryptedContent = decryptString(savedContent.content, key as string);

      return res
        .status(200)
        .json({ content: decryptedContent, expiresAt: savedContent.expiresAt });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  return res.status(400).json({
    message: "Bad Request",
  });
}

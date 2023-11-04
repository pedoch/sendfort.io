import { Content } from "@/models";
import connectDB from "@/utils/connectDB";
import { decryptString } from "@/utils/encryptObject";
import runMiddleware from "@/utils/middleware";
import Cors from "cors";

const cors = Cors({
  origin: "*",
  methods: ["GET"],
});

export default async function contentAPI(req, res) {
  await runMiddleware(req, res, cors);

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
      await connectDB();

      const savedContent = await Content.findOne({ slug });

      if (!savedContent) {
        return res.status(404).json({
          message: "Not Found",
        });
      }

      const decryptedContent = decryptString(savedContent.content, key);

      return res
        .status(200)
        .json({ content: decryptedContent, expiresAt: savedContent.expiresAt });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(400).json({
    message: "Bad Request",
  });
}

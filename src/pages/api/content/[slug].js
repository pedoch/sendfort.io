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
    const { slug } = req.query;

    if (!slug) {
      return res.status(400).json({
        error: {
          message: "Slug is required",
        },
      });
    }

    try {
      await connectDB();

      const slugToCheck = slug.slice(0, 10);
      const password = slug.slice(10);

      const savedContent = await Content.findOne({ slug: slugToCheck });

      if (!savedContent) {
        return res.status(404).json({
          error: {
            message: "Not Found",
          },
        });
      }

      const decryptedContent = decryptString(savedContent.content, password);

      return res
        .status(200)
        .json({ content: decryptedContent, expiresAt: savedContent.expiresAt });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  return res.status(400).json({
    error: {
      message: "Bad Request",
    },
  });
}

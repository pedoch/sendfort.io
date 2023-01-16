import connectDB from "@/utils/connectDB";
import Cors from "cors";
import runMiddleware from "@/utils/middleware";
import { Content } from "@/models";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

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

      const savedContent = await Content.findOne({ slug });

      if (!savedContent) {
        return res.status(404).json({
          error: {
            message: "Not Found",
          },
        });
      }

      const sentPassword = CryptoJS.AES.decrypt(
        req.headers.authorization,
        process.env.PASSWORD_SECRET
      ).toString(CryptoJS.enc.Utf8);

      const match = await bcrypt.compare(sentPassword, savedContent.password);

      if (!match) {
        return res.status(401).json({
          error: {
            message: "Unauthorized",
          },
        });
      }

      return res.status(200).json({ content: savedContent.content });
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

import connectDB from "@/utils/connectDB";
import Cors from "cors";
import runMiddleware from "@/utils/middleware";
import { Content } from "@/models";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

const cors = Cors({
  origin: "*",
  methods: ["POST"],
});

export default async function checkContentSlugAPI(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
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

      if (!savedContent.password) {
        return res.status(200).json({ password: false });
      }

      return res.status(200).json({ password: true });
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

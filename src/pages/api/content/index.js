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

export default async function createContentAPI(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    await connectDB();

    const { content, validityPeriod, slug, password = undefined } = req.body;

    try {
      const contentWithExistingSlug = await Content.findOne({ slug });

      if (contentWithExistingSlug) {
        return res.status(400).json({
          error: {
            message: "Slug already exists",
          },
        });
      }

      let passwordToStore = undefined;

      if (password) {
        const sentPassword = CryptoJS.AES.decrypt(
          password,
          process.env.PASSWORD_SECRET
        ).toString(CryptoJS.enc.Utf8);

        const hashedPassword = await bcrypt.hash(
          sentPassword,
          process.env.BCRYPT_SALT
        );

        passwordToStore = hashedPassword;
      }

      let checkValidityPeriod = validityPeriod;

      if (checkValidityPeriod > 24) {
        checkValidityPeriod = 24;
      }

      const savedContent = await Content.create({
        content,
        passwordToStore,
        slug,
        expiresAt: Date.now() + checkValidityPeriod * 60 * 60 * 1000,
      });

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

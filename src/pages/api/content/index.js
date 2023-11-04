import { Content } from "@/models";
import connectDB from "@/utils/connectDB";
import { encryptString } from "@/utils/encryptObject";
import generatePermalink from "@/utils/generatePermalink";
import runMiddleware from "@/utils/middleware";
import Cors from "cors";

const cors = Cors({
  origin: "*",
  methods: ["POST"],
});

export default async function createContentAPI(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    await connectDB();

    const { content, validityPeriod, key } = req.body;

    let slugIsUnique = false;
    let slug;

    try {
      while (!slugIsUnique) {
        const uniquePermalink = generatePermalink();

        slug = `${uniquePermalink}${Date.now()}`;

        const contentWithExistingSlug = await Content.findOne({ slug });

        if (!contentWithExistingSlug) {
          slugIsUnique = true;
        }
      }

      if (!content) {
        return res.status(400).json({
          message: "Content is required",
        });
      }

      if (!key) {
        return res.status(400).json({
          message: "Passkey is required",
        });
      }

      let encryptedContent = encryptString(content, key);

      let checkValidityPeriod = validityPeriod;

      if (checkValidityPeriod > 24) {
        checkValidityPeriod = 24;
      }

      const savedContent = await Content.create({
        content: encryptedContent,
        slug,
        expiresAt: Date.now() + checkValidityPeriod * 60 * 60 * 1000,
      });

      return res.status(200).json({ slug: savedContent.slug });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(400).json({
    error: {
      message: "Bad Request",
    },
  });
}

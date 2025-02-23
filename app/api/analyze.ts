import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

export const config = {
  api: {
    bodyParser: false, // Required to handle file uploads
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "Error parsing file" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file; // Handle possible array structure
    const pdfBuffer = fs.readFileSync(file.filepath);

    try {
      const pdfData = await pdfParse(pdfBuffer);
      const extractedText = pdfData.text;

      console.log("Extracted Text:", extractedText); // Log extracted text on the backend

      res.status(200).json({ extractedText });
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      res.status(500).json({ error: "Failed to process resume" });
    }
  });
}

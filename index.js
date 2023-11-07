import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Use the bodyParser middleware to handle raw binary data
app.use(bodyParser.raw({ type: "audio/wav" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "index.html"));
});

const upload = multer({ dest: "uploads/" });

// Post route to handle uploading audio files
app.post("/upload", upload.single("audio"), (req, res) => {
  // Save the audio file
  const audioFileName = req.file.filename;

  // Respond to the client
  res.status(200).send("Audio recorded and saved successfully.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

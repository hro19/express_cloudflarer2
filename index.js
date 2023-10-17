import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import sharp from 'sharp';

const app = express();
const port = 5000;
app.use(cors());
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const S3 = new S3Client({
    region: 'auto',
    endpoint: process.env.ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  const resizeFileBuffer = await sharp(req.file.buffer)
  .resize({ width: 700 })
  .toBuffer();

  try {
    await S3.send(
      new PutObjectCommand({
        Body: req.file.buffer,
        Bucket: 'reffect',
        Key: req.file.originalname,
        ContentType: req.file.mimetype,
      })
    );
    // ファイルアップロードが成功した場合、JSONレスポンスを返す
    res.status(200).json({ httpStatus: 200, message: 'File Upload Successful' });
  } catch (error) {
    // エラーが発生した場合、JSONレスポンスを返す
    res.status(500).json({ httpStatus: 500, message: 'File Upload Failed' });
  }
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
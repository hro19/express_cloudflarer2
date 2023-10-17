import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const port = 5000;
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send('File Upload');
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
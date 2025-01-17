import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(Configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: { role: 'user', content: 'Say this is a test' }})
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      model: 'gpt-4',
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;
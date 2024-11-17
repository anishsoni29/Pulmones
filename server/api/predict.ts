import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set. Please update your .env file with your OpenAI API key.');
}

console.log('Loaded API Key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { textSymptoms, selectedSymptoms, spo2, breathingDifficulty } = req.body;

  try {
    const prompt = `
      A patient has the following symptoms and metrics:
      - Described Symptoms: ${textSymptoms || 'None'}
      - Selected Symptoms: ${selectedSymptoms?.join(', ') || 'None'}
      - SpO2 Level: ${spo2 || 'Unknown'}
      - Breathing Difficulty: ${breathingDifficulty ? 'Yes' : 'No'}

      Based on the above information, classify the lung condition they might be experiencing. Provide a clear and concise answer.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const prediction = response.choices[0]?.message?.content || 'No prediction available';

    res.json({ prediction });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});

export default router;

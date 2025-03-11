// Use import instead of require for ES modules
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL;

app.use(express.json());
app.use(cors());

// AI-based recommendation endpoint
app.post('/api/recommend', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  const prompt = `Based on this user input: "${input}", recommend the most relevant learning paths from the following list:
  
  1. Web Development Fundamentals
  2. Data Science Essentials
  3. Cloud Architecture
  4. Artificial Intelligence Fundamentals
  5. Mobile App Development
  6. Cybersecurity Basics
  7. Blockchain Development
  8. Backend Development with Node.js
  9. Frontend Development with React
  10. DevOps Mastery

  Only provide the most relevant suggestions in plain text.`;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ recommendation: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error fetching recommendation:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendation' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

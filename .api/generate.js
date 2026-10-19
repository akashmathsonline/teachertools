// File: api/generate.js
export default async function handler(req, res) {
  // Sirf POST request allow karein
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const API_KEY = process.env.DEEPSEEK_API_KEY; // Step 1 me save ki hui key

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key missing in Vercel settings.' });
  }

  try {
    // DeepSeek API Call
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an expert Indian school teacher and curriculum designer.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'DeepSeek API Error');
    }

    // Frontend ko text wapas bhej dein
    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    console.error('DeepSeek Error:', error);
    res.status(500).json({ error: 'Failed to generate content. Check API credits.' });
  }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured on the server.' });
  }

  try {
    const { count, content, links } = req.body;

    if (!content || !links) {
      return res.status(400).json({ error: 'Missing content or links in request body.' });
    }

    const systemPrompt = `You are an expert SEO interlinker for Kings Research. 
You must output a JSON object containing an array called "suggestions".
Format: {"suggestions": [{"anchor": "verbatim text from content", "url": "exact URL", "type": "report/blog/press", "reason": "why it fits"}]}`;

    const userPrompt = `TASK: Analyze content and suggest the BEST ${count || 10} internal links.
RULES: Verbatim anchor texts ONLY from content. Return valid JSON.
CONTENT: ${content}
CANDIDATE LINKS: ${links}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        temperature: 0.3,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({
        error: err.error?.message || 'OpenAI API error'
      });
    }

    const data = await response.json();
    const raw = data.choices[0].message.content;
    const parsed = JSON.parse(raw);

    return res.status(200).json(parsed);

  } catch (err) {
    console.error('Interlink API error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

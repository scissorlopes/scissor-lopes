export default async function handler(req, res) {
  const { query } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
          systemInstruction: {
            parts: [{
              text: "Você é um barbeiro premium especialista em visagismo. Responda em até 3 frases."
            }]
          }
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";

    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ error: "Erro na IA" });
  }
}

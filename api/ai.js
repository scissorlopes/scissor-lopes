export default async function handler(req, res) {
  try {
    const { query } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: query }]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({
        text: "ERRO: " + data.error.message
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({
      text: text || "Resposta vazia da IA"
    });

  } catch (error) {
    res.status(500).json({
      text: "Erro servidor: " + error.message
    });
  }
}

export default async function handler(req, res) {
  try {
    const { query } = req.body;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

    // 👇 MOSTRA ERRO REAL
    if (data.error) {
      return res.status(200).json({
        text: "ERRO DA API: " + data.error.message
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    res.status(200).json({
      text: text || "A API respondeu vazio"
    });

  } catch (error) {
    res.status(500).json({
      text: "Erro servidor: " + error.message
    });
  }
}

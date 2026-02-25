import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { messages } = req.body

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
        }),
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return res.status(500).json({ error: text })
    }

    const data = await response.json()

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content ?? "No response",
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
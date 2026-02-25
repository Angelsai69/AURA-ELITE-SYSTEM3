
import { useState } from "react"

export default function AIChat() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input) return
    const updated = [...messages, { role: "user", content: input }]
    setMessages(updated)
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updated })
    })

    const data = await res.json()
    setMessages([...updated, { role: "assistant", content: data.reply }])

    setLoading(false)
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.content}</div>
        ))}
        {loading && <div>Thinking...</div>}
      </div>
      <div className="input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about automation..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}


import { motion } from "framer-motion"
import AIChat from "./components/AIChat"
import "./index.css"

export default function App() {
  return (
    <div className="app">
      <section className="section hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your business. Running itself.
        </motion.h1>
      </section>

      <section className="section">
        <h2>Autonomous Systems</h2>
      </section>

      <section className="section">
        <h2>Real-Time AI Intelligence</h2>
      </section>

      <AIChat />
    </div>
  )
}

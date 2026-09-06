import { useState } from "react";

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm CraftLink AI. I can help you find artisans, analyze pricing, and discover suitable business matches.",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Thanks for your message! AI response functionality will be connected to the backend in the next development phase.",
        },
      ]);
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div>
              <span className="ai-status-dot"></span>
              <strong>CraftLink AI Assistant</strong>
              <p>AI Marketplace Intelligence</p>
            </div>

            <button
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`message ${item.sender === "ai" ? "ai-message" : "user-message"}`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              placeholder="Ask CraftLink AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <button
        className="ai-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        <span>✦</span>
        <span className="ai-button-text">AI</span>
      </button>
    </>
  );
}

export default AIAssistant;
/**
 * @fileoverview AIAssistant Component
 * High-fidelity conversational AI for electoral guidance.
 */
import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ScrollText, MapPin, Send, Sparkles } from 'lucide-react';
import { getAIResponse } from '../../services/AIEngine';

/**
 * AI Assistant view for the dashboard sidebar.
 */
export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm Electra, your AI assistant. How can I help you navigate the 2026 Elections?" }
  ]);
  const [input, setInput] = useState("");
  const [activeSkill, setActiveSkill] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages, isTyping]);

  const skills = [
    { id: 'fact', label: 'Fact Checker', icon: ShieldCheck, color: '#10b981' },
    { id: 'legal', label: 'Legal Guide', icon: ScrollText, color: '#6366f1' },
    { id: 'booth', label: 'Booth Scout', icon: MapPin, color: '#f59e0b' }
  ];

  const handleSend = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || isTyping) return;
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await getAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      
      // If the response is the default fallback, add a Google Search button
      if (response.includes("specialized assistant") || response.includes("accurate and verified guidance")) {
         setMessages(prev => [...prev, { 
           role: 'ai', 
           text: "Would you like to search Google for live updates on this topic?",
           isSearchAction: true,
           originalQuery: userMsg
         }]);
      }
    } catch {

      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my knowledge base. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <aside className="ai-sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '1.1rem' }}>Electra AI</h3>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>v2.0</div>
        </div>
        <div className="pulse" style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></div>
      </div>
      
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {skills.map(skill => (
          <button 
            key={skill.id} 
            onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              padding: '4px 10px', 
              borderRadius: '20px', 
              fontSize: '0.65rem', 
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              background: activeSkill === skill.id ? skill.color : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeSkill === skill.id ? skill.color : 'var(--border)'}`,
              color: activeSkill === skill.id ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s'
            }}
          >
            <skill.icon size={10} />
            {skill.label}
          </button>
        ))}
      </div>

      <div className="chat-container" role="log" aria-live="polite" aria-label="Chat messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-message ${m.role === 'ai' ? 'message-ai' : 'message-user'}`}>
            {m.role === 'ai' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
                {m.isSearchAction && (
                  <button 
                    className="glow-button" 
                    style={{ fontSize: '0.7rem', padding: '6px 12px', background: 'var(--primary)', alignSelf: 'flex-start' }}
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(m.originalQuery)}+ECI+Election+2026`, '_blank')}
                  >
                    Search on Google
                  </button>
                )}
              </div>
            ) : m.text}
          </div>
        ))}

        {isTyping && (
          <div className="chat-message message-ai" style={{ display: 'flex', gap: '4px', padding: '12px' }} aria-label="Electra is typing">
            <div className="typing-dot" aria-hidden="true"></div>
            <div className="typing-dot" style={{ animationDelay: '0.2s' }} aria-hidden="true"></div>
            <div className="typing-dot" style={{ animationDelay: '0.4s' }} aria-hidden="true"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-wrapper">
        <input 
          type="text" 
          aria-label="Type your message"
          placeholder={activeSkill ? `Ask the ${skills.find(s => s.id === activeSkill).label}...` : "Ask me anything..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={() => handleSend()} 
          style={{ background: 'var(--primary)', border: 'none', borderRadius: '6px', color: 'white', padding: '6px', cursor: 'pointer' }}
          aria-label="Send message"
        >
          <Send size={14} aria-hidden="true" />
        </button>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} color="var(--primary)" aria-hidden="true" />
          <span>Quick Insights</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {['Voter ID Help', 'Booth Map', 'Candidate List', 'Election Laws'].map(act => (
            <button 
              key={act} 
              className="glass-panel" 
              style={{ fontSize: '0.7rem', padding: '6px', cursor: 'pointer' }} 
              onClick={() => handleSend(act)}
            >
              {act}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};


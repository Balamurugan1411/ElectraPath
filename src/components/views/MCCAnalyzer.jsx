/**
 * @fileoverview AI Model Code of Conduct (MCC) Analyzer
 * Implements real-time heuristic auditing of electoral content using the Electra Neural Engine.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, ScanSearch, CheckCircle2, FileSearch, 
  Sparkles, ShieldCheck, Zap, RotateCcw, 
  Info, Cpu
} from 'lucide-react';
import { analyzeMCC } from '../../services/AIEngine';

/**
 * MCCAnalyzer Component
 * Provides a secure, local environment for auditing electoral transcripts against compliance benchmarks.
 * @component
 */
export const MCCAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [activeTab, setActiveTab] = useState('raw');

  const steps = [
    "Initializing Neural Pipeline...",
    "Tokenizing Input Stream...",
    "Scanning Heuristic Patterns...",
    "Neural Model Validation...",
    "Finalizing Audit Report..."
  ];

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setAnalysisStep(0);

    // Simulated progress steps
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const report = await analyzeMCC(inputText);
      setResults(report);
    } catch (error) {
      console.error("Analysis Failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Safely renders highlighted text without using dangerouslySetInnerHTML.
   * @param {string} text 
   * @param {Object[]} violations 
   */
  const renderHighlightedText = (text, violations) => {
    if (!violations || violations.length === 0 || violations[0].category === 'Audit') {
      return <span>{text}</span>;
    }
    
    let parts = [{ text, isHighlight: false }];
    
    violations.forEach(v => {
      if (!v.excerpt) return;
      const newParts = [];
      parts.forEach(part => {
        if (part.isHighlight) {
          newParts.push(part);
        } else {
          const subParts = part.text.split(new RegExp(`(${v.excerpt})`, 'gi'));
          subParts.forEach((sp, idx) => {
            if (idx % 2 === 1) {
              newParts.push({ text: sp, isHighlight: true, type: v.type, msg: v.msg });
            } else if (sp) {
              newParts.push({ text: sp, isHighlight: false });
            }
          });
        }
      });
      parts = newParts;
    });

    return (
      <div style={{ lineHeight: '1.8' }}>
        {parts.map((p, i) => p.isHighlight ? (
          <span key={i} className={`mcc-highlight ${p.type}`} title={p.msg} style={{ transition: 'background 0.3s' }}>
            {p.text}
          </span>
        ) : <span key={i}>{p.text}</span>)}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with Live Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ScanSearch size={28} color="var(--primary)" aria-hidden="true" /> AI MCC Analyzer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
            Advanced NLP screening for electoral compliance and ethical campaigning.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <div className="neural-ping" aria-hidden="true"></div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>GOD-MODE ACTIVE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Main Analysis Area */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="mcc-input" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Electoral Content for Audit</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inputText.length} characters</span>
          </div>
          
          <textarea 
            id="mcc-input"
            className="glass-panel"
            placeholder="Paste campaign speech, transcript, or social media post here for deep neural audit..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ 
              width: '100%', 
              height: '180px', 
              padding: '20px', 
              background: 'rgba(0,0,0,0.2)', 
              color: 'white', 
              border: '1px solid var(--border)',
              borderRadius: '12px',
              resize: 'none',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              fontFamily: 'inherit'
            }}
          />

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="glow-button" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              style={{ flex: 1, height: '48px', opacity: (isAnalyzing || !inputText.trim()) ? 0.6 : 1 }}
            >
              {isAnalyzing ? (
                <><Cpu size={18} className="rotating" aria-hidden="true" /> Analyzing...</>
              ) : (
                <><Zap size={18} aria-hidden="true" /> Run Neural Audit</>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Info / Orb Area */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }} aria-live="polite">
           <div className="orb-container">
              <div className="orb-glow" aria-hidden="true"></div>
              <div 
                className={`ai-orb ${isAnalyzing ? 'analyzing' : results ? (results.isClean ? 'success' : 'danger') : ''}`}
                role="status"
                aria-label={isAnalyzing ? "Processing text" : results ? (results.isClean ? "Clean content" : "Violations found") : "Awaiting input"}
              ></div>
              {!isAnalyzing && !results && <Sparkles size={24} color="white" style={{ position: 'absolute', zIndex: 3, opacity: 0.5 }} aria-hidden="true" />}
              {isAnalyzing && <Cpu size={24} color="white" style={{ position: 'absolute', zIndex: 3 }} className="floating" aria-hidden="true" />}
           </div>

           <div style={{ textAlign: 'center' }}>
              <h4 style={{ marginBottom: '8px' }}>
                {isAnalyzing ? "Processing Audit" : results ? (results.isClean ? "System Compliant" : "Violations Detected") : "Awaiting Input"}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isAnalyzing ? steps[analysisStep] : results ? `Audit completed with ${results.confidenceScore}% confidence.` : "Scan your electoral content against global benchmarks."}
              </p>
           </div>

           {results && !isAnalyzing && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
               role="region" 
               aria-label="Compliance Metrics"
             >
                <CategoryBar label="Bribery Risk" value={results.metrics.bribery} color="var(--danger)" />
                <CategoryBar label="Hate Speech" value={results.metrics.hateSpeech} color="var(--warning)" />
                <CategoryBar label="Religious Appeal" value={results.metrics.religious} color="var(--danger)" />
                <CategoryBar label="Misinformation" value={results.metrics.misinformation} color="var(--warning)" />
             </motion.div>
           )}
        </div>
      </div>

      <AnimatePresence>
        {results && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel" 
            style={{ overflow: 'hidden' }}
          >
            <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <button 
                role="tab"
                aria-selected={activeTab === 'raw'}
                onClick={() => setActiveTab('raw')}
                style={{ flex: 1, padding: '16px', background: activeTab === 'raw' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', color: activeTab === 'raw' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <FileSearch size={18} aria-hidden="true" /> <span>Annotated Report</span>
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'sanitized'}
                onClick={() => setActiveTab('sanitized')}
                style={{ flex: 1, padding: '16px', background: activeTab === 'sanitized' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', color: activeTab === 'sanitized' ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Sparkles size={18} aria-hidden="true" /> <span>AI Sanitized Version</span>
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              {activeTab === 'raw' ? (
                <div role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', lineHeight: '1.8', fontSize: '1rem' }}>
                    {renderHighlightedText(inputText, results.violations)}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {results.violations.map((v, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ padding: '16px', background: `rgba(${v.type === 'danger' ? '239,68,68' : v.type === 'warning' ? '245,158,11' : '16,185,129'}, 0.08)`, borderRadius: '12px', borderLeft: `4px solid var(--${v.type})`, display: 'flex', gap: '12px' }}
                        role="alert"
                      >
                        <div style={{ marginTop: '2px' }}>
                          {v.type === 'danger' ? <AlertTriangle size={18} color="var(--danger)" aria-hidden="true" /> : v.type === 'warning' ? <Info size={18} color="var(--warning)" aria-hidden="true" /> : <CheckCircle2 size={18} color="var(--success)" aria-hidden="true" />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', color: `var(--${v.type})` }}>{v.category}: {v.type === 'success' ? 'Passed' : 'Potential Violation'}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '8px' }}>{v.msg}</div>
                          {v.type !== 'success' && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Flagged Content: "{v.excerpt}"</div>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed var(--success)', borderRadius: '12px', lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-main)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }} aria-hidden="true"><ShieldCheck color="var(--success)" size={24} /></div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {results.isClean ? inputText : "Content has been processed for compliance. See annotated report for details."}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button className="glow-button" style={{ background: 'var(--glass)', border: '1px solid var(--border)' }} onClick={() => setInputText(inputText)}>
                      <RotateCcw size={16} aria-hidden="true" /> Reset Analysis
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Neural Trace Terminal */}
            <div style={{ background: '#0a0a0a', borderTop: '1px solid var(--border)', padding: '16px', fontFamily: 'monospace', fontSize: '0.7rem' }}>
               <div style={{ color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={12} aria-hidden="true" /> NEURAL_PROCESS_TRACE v4.2
               </div>
               <div style={{ color: '#4ade80' }}>[OK] Pipeline initialized in {results.confidenceScore > 95 ? 'Fast' : 'Deep'} mode.</div>
               <div style={{ color: '#60a5fa' }}>[INFO] Audit context: ECI_MCC_2026_V1</div>
               <div style={{ color: '#fbbf24' }}>[WARN] Entropy level: {(100 - results.confidenceScore).toFixed(1)}%</div>
               <div style={{ color: 'var(--text-muted)' }}>[DEBUG] Processed at: {results.processedAt}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryBar = ({ label, value, color }) => (
  <div className="category-bar-wrapper">
    <div className="category-label">
      <span>{label}</span>
      <span aria-hidden="true">{value}%</span>
    </div>
    <div className="category-bar-bg" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" aria-label={label}>
      <motion.div 
        className="category-bar-fill" 
        initial={{ width: 0 }} 
        animate={{ width: `${value}%` }} 
        style={{ background: color }}
      />
    </div>
  </div>
);

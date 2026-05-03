/**
 * @fileoverview AI Model Code of Conduct (MCC) Analyzer
 * Implements real-time heuristic auditing of electoral content using the Electra Neural Engine.
 */

import { useState, useEffect } from 'react';
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
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [activeTab, setActiveTab] = useState('raw'); // 'raw' or 'sanitized'

  const steps = [
    "Initializing Electra NLP Engine...",
    "Tokenizing & Extracting Entities...",
    "Cross-referencing ECI Guidelines...",
    "Synthesizing Compliance Report..."
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 600);
      return () => clearInterval(interval);
    } else {
      setAnalysisStep(0);
    }
  }, [isAnalyzing]);

  const analyzeContent = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    setResults(null);
    setActiveTab('raw');

    try {
      const data = await analyzeMCC(inputText);
      setResults(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI Audit failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };


  const highlightText = (text, violations) => {
    if (!violations || violations.length === 0 || violations[0].excerpt === 'Clean') return text;
    
    let highlighted = text;
    violations.forEach(v => {
      const regex = new RegExp(`(${v.excerpt})`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="mcc-highlight ${v.type}" title="${v.msg}">$1</span>`);
    });
    return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with Live Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ScanSearch size={28} color="var(--primary)" /> AI MCC Analyzer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
            Advanced NLP screening for electoral compliance and ethical campaigning.
          </p>
        </div>
        <div className="live-badge">
          <div className="live-dot"></div>
          GEMINI AI • LIVE
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
        {/* Main Input Area */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 id="analysis-source-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileSearch size={18} aria-hidden="true" /> Source Analysis</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
               <div className="glass-panel" style={{ padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid var(--success)' }}>
                  <ShieldCheck size={14} color="var(--success)" aria-hidden="true" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--success)' }}>SECURE LOCAL AUDIT</span>
               </div>
            </div>
          </div>

          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            aria-labelledby="analysis-source-label"
            placeholder="Paste transcript, speech excerpt, or social media post here for real-time AI audit..."
            style={{ width: '100%', height: '220px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', color: 'white', resize: 'none', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: '1.6' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--success)" aria-hidden="true" /> 
              <span>Heuristic Security Enabled</span>
            </span>
            <button 
              className="glow-button" 
              onClick={analyzeContent} 
              disabled={isAnalyzing || !inputText.trim()} 
              style={{ padding: '12px 32px' }}
              aria-busy={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Run Neural Audit'}
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ overflow: 'hidden' }}>
            <div role="tablist" style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
              <button 
                role="tab"
                aria-selected={activeTab === 'raw'}
                onClick={() => setActiveTab('raw')}
                style={{ flex: 1, padding: '16px', background: activeTab === 'raw' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', color: activeTab === 'raw' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <FileSearch size={18} aria-hidden="true" /> Annotated Report
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'sanitized'}
                onClick={() => setActiveTab('sanitized')}
                style={{ flex: 1, padding: '16px', background: activeTab === 'sanitized' ? 'rgba(255,255,255,0.05)' : 'transparent', border: 'none', color: activeTab === 'sanitized' ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Sparkles size={18} aria-hidden="true" /> AI Sanitized Version
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              {activeTab === 'raw' ? (
                <div role="tabpanel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', lineHeight: '1.8', fontSize: '1rem' }}>
                    {highlightText(inputText, results.violations)}
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
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}><ShieldCheck color="var(--success)" size={24} aria-hidden="true" /></div>
                    <div dangerouslySetInnerHTML={{ __html: results.sanitizedVersion }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                    <button className="glow-button" style={{ background: 'var(--glass)', border: '1px solid var(--border)' }} onClick={() => setInputText(results.sanitizedVersion.replace(/<[^>]*>?/gm, ''))}>
                      <RotateCcw size={16} aria-hidden="true" /> Apply Suggested Corrections
                    </button>
                  </div>
                </div>
              )}
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


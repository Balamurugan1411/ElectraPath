
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, BarChart3, Plus } from 'lucide-react';

const ECI_URL = "https://eci.gov.in/";

export const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={`nav-item ${active ? 'active' : ''}`} 
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

export const MetricCard = ({ title, value, icon: Icon, subtext, trend, color, link }) => (
  <div className="glass-panel metric-card" onClick={() => link && window.open(link, '_blank')} style={{ cursor: link ? 'pointer' : 'default' }}>
    <div className="metric-header">
      <div className="metric-icon" style={{ color: color }}>
        <Icon size={20} />
      </div>
      <div className="metric-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <h4>{title}</h4>
          {link && <ExternalLink size={10} color="var(--text-muted)" />}
        </div>
        <div className="metric-value">{value}</div>
      </div>
    </div>
    {subtext && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtext}</div>}
    {trend && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--success)' }}>
        <TrendingUp size={12} />
        <span>{trend}</span>
      </div>
    )}
  </div>
);

export const CandidateCard = ({ name, party, age, education, assets, cases, color, image, onCompare, onViewDetails, predictionScore }) => (
  <div className="glass-panel candidate-card-hover" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px', position: 'relative', overflow: 'hidden' }}>
    {predictionScore && (
      <div style={{ position: 'absolute', top: 0, right: 0, background: predictionScore > 75 ? 'var(--success)' : 'var(--warning)', color: 'white', fontSize: '0.65rem', padding: '4px 8px', borderBottomLeftRadius: '8px', fontWeight: 'bold' }}>
        AI Score: {predictionScore}/100
      </div>
    )}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ width: '60px', height: '60px', borderRadius: '14px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: `2px solid ${color}` }}>
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h5 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>{name}</h5>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: color }}>
           <span style={{ fontWeight: 600 }}>{party}</span>
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
      <span>Age: {age}</span>
      <span>|</span>
      <span>Edu: {education}</span>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
      <span>Assets: {assets}</span>
      <span style={{ color: cases > 0 ? 'var(--danger)' : 'var(--success)' }}>Cases: {cases}</span>
    </div>
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="glow-button" style={{ fontSize: '0.75rem', padding: '8px', flex: 1 }} onClick={() => onViewDetails({ name, party, age, education, assets, cases, color, image, predictionScore })}>View Details</button>
      <button className="glass-panel" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => onCompare(name)} title="Compare">
        <BarChart3 size={14} />
      </button>
    </div>
  </div>
);

export const CandidateDetailModal = ({ candidate, onClose }) => {
  if (!candidate) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '600px', padding: '32px', position: 'relative' }} 
        onClick={e => e.stopPropagation()}
      >
        <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={onClose}><Plus size={24} style={{ transform: 'rotate(45deg)' }} /></button>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '24px', overflow: 'hidden', border: `4px solid ${candidate.color}` }}>
            <img src={candidate.image} alt={candidate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{candidate.name}</h2>
            <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', background: `${candidate.color}20`, color: candidate.color, fontWeight: 700, fontSize: '0.9rem', marginBottom: '16px' }}>{candidate.party} Contender</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>"Dedicated to the holistic development of Chennai Central, focusing on infrastructure, education, and digital empowerment for all citizens."</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Education</div>
            <div style={{ fontWeight: 600 }}>{candidate.education}</div>
          </div>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Assets</div>
            <div style={{ fontWeight: 600 }}>{candidate.assets}</div>
          </div>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Criminal Cases</div>
            <div style={{ fontWeight: 600, color: candidate.cases > 0 ? 'var(--danger)' : 'var(--success)' }}>{candidate.cases}</div>
          </div>
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Age</div>
            <div style={{ fontWeight: 600 }}>{candidate.age} Years</div>
          </div>
          {candidate.predictionScore && (
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>AI Predictive Sentiment Score</div>
                <div style={{ fontSize: '0.8rem' }}>Based on recent public engagements and manifesto analysis.</div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: candidate.predictionScore > 75 ? 'var(--success)' : 'var(--warning)' }}>
                {candidate.predictionScore}/100
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
          <button className="glow-button" style={{ flex: 1 }} onClick={() => window.open(ECI_URL, '_blank')}>View Full Affidavit</button>
          <button className="glass-panel" style={{ padding: '12px 24px', cursor: 'pointer' }} onClick={() => alert('Manifesto coming soon!')}>View Manifesto</button>
        </div>
      </motion.div>
    </div>
  );
};

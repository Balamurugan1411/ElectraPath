import { useState } from 'react';
import { Filter, BarChart3, MapPin } from 'lucide-react';
import { CandidateCard } from '../shared/UIComponents';

export const CandidatesView = ({ onViewDetails, candidates }) => {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (name) => {
    if (compareList.includes(name)) {
      setCompareList(prev => prev.filter(n => n !== name));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, name]);
    } else {
      alert("You can compare up to 3 candidates.");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>Candidates & Parties</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Exploring contenders with AI Sentiment Predictions.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Filter size={16} /> Filter</button>
          <button className="glow-button" style={{ padding: '8px 16px' }} onClick={() => setCompareList([])}>Clear Compare</button>
        </div>
      </div>

      {compareList.length > 0 && (
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--primary)' }}>
          <h4 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={18} color="var(--primary)" /> Comparison Matrix</h4>
          <div className="comparison-grid">
            <div className="comparison-cell comparison-header">Candidate</div>
            {candidates.filter(c => compareList.includes(c.name)).map(c => (
              <div key={c.name} className="comparison-cell" style={{ fontWeight: 600, color: c.color }}>{c.name}</div>
            ))}
            
            <div className="comparison-cell comparison-header">AI Prediction Score</div>
            {candidates.filter(c => compareList.includes(c.name)).map(c => (
              <div key={c.name} className="comparison-cell" style={{ fontWeight: 800, color: c.predictionScore > 75 ? 'var(--success)' : 'var(--warning)' }}>{c.predictionScore}/100</div>
            ))}

            <div className="comparison-cell comparison-header">Party</div>
            {candidates.filter(c => compareList.includes(c.name)).map(c => (
              <div key={c.name} className="comparison-cell">{c.party}</div>
            ))}

            <div className="comparison-cell comparison-header">Criminal Cases</div>
            {candidates.filter(c => compareList.includes(c.name)).map(c => (
              <div key={c.name} className="comparison-cell" style={{ color: c.cases > 0 ? 'var(--danger)' : 'var(--success)' }}>{c.cases}</div>
            ))}

            <div className="comparison-cell comparison-header">Assets</div>
            {candidates.filter(c => compareList.includes(c.name)).map(c => (
              <div key={c.name} className="comparison-cell">{c.assets}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {candidates.map(c => (
          <CandidateCard key={c.name} {...c} onCompare={toggleCompare} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
};

export const InteractiveMap = () => {
  const zones = [
    { id: 'z1', name: 'Zone A (Nungambakkam)', load: 45, x: '30%', y: '40%' },
    { id: 'z2', name: 'Zone B (T. Nagar)', load: 82, x: '60%', y: '55%' },
    { id: 'z3', name: 'Zone C (Egmore)', load: 20, x: '45%', y: '25%' },
    { id: 'z4', name: 'Zone D (Triplicane)', load: 60, x: '75%', y: '45%' },
  ];

  return (
    <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem' }}>Live Booth Heatmap</h3>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '2px' }}></div> Low</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: 'var(--warning)', borderRadius: '2px' }}></div> Med</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '2px' }}></div> High</div>
        </div>
      </div>
      
      <div style={{ position: 'relative', height: '400px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {/* Animated Neon Paths for map flows */}
        <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
          <path d="M50,100 L150,50 L300,80 L350,200 L300,350 L100,380 L20,300 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          <path d="M150,50 L180,150 L300,80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <path d="M100,380 L180,150 L350,200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          
          <path className="neon-flow" d="M150,50 L180,150" fill="none" stroke="var(--primary)" strokeWidth="3" />
          <path className="neon-flow-reverse" d="M300,80 L180,150" fill="none" stroke="var(--success)" strokeWidth="3" />
        </svg>

        {zones.map(zone => (
          <div key={zone.id} className="map-pin-hot" style={{ position: 'absolute', left: zone.x, top: zone.y, cursor: 'pointer' }}>
            <MapPin size={24} color={zone.load > 70 ? 'var(--danger)' : zone.load > 40 ? 'var(--warning)' : 'var(--success)'} />
            <div className="glass-panel map-tooltip" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', padding: '8px', whiteSpace: 'nowrap', fontSize: '0.7rem', marginTop: '4px', zIndex: 10, opacity: 0, transition: 'opacity 0.2s' }}>
              <div style={{ fontWeight: 600 }}>{zone.name}</div>
              <div style={{ color: 'var(--text-muted)' }}>Load: {zone.load}%</div>
              <div style={{ color: 'var(--primary)', marginTop: '4px', fontSize: '0.65rem' }}>Predictive Flow: {zone.load > 50 ? 'Diverting' : 'Normal'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

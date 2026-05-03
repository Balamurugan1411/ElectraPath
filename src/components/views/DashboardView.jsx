
import { motion } from 'framer-motion';
import { Share2, Download, TrendingUp, Calendar, Users, BarChart3, ShieldCheck, AlertTriangle, Lightbulb } from 'lucide-react';
import { MetricCard, CandidateCard } from '../shared/UIComponents';

const ECI_URL = "https://eci.gov.in/";

export const DashboardView = ({ setActiveTab, queueStatus, demoCandidates, setSelectedCandidate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      role="main"
      aria-label="Election Dashboard"
    >
      <section aria-labelledby="welcome-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 id="welcome-header" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Vanakkam, Chennai! 👋</h2>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Ready for the 2026 Assembly Elections.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="glass-panel" 
              style={{ padding: '8px 16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}
              aria-label="Share Dashboard"
            >
              <Share2 size={16} aria-hidden="true" /> Share
            </button>
            <button 
              className="glow-button" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              aria-label="Download Digital Voter ID"
            >
              <Download size={16} aria-hidden="true" /> Voter ID
            </button>
          </div>
        </div>

        <div className="metrics-grid" role="group" aria-label="Quick Metrics">
          <MetricCard title="Readiness" value="82%" icon={TrendingUp} subtext="Ready for May 15" trend="+5%" color="var(--success)" />
          <MetricCard title="Countdown" value="12 Days" icon={Calendar} subtext="Polls open at 7 AM" color="var(--accent)" link={ECI_URL} />
          <MetricCard title="Booth Load" value={`${queueStatus.waitTime}m`} icon={Users} subtext={`Wait time is ${queueStatus.trend}`} color={queueStatus.waitTime > 30 ? 'var(--danger)' : 'var(--warning)'} />
          <MetricCard title="Voters (Central)" value="14.2L" icon={BarChart3} subtext="Total registered" color="var(--primary)" />
          <MetricCard title="ID Verified" value="EPIC OK" icon={ShieldCheck} subtext="TN/02/9876543" color="var(--success)" />
        </div>
      </section>

      <section className="dashboard-middle" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 id="alerts-header" style={{ fontSize: '1.1rem' }}>Active Alerts</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}>History</button>
          </div>
          <div role="feed" aria-labelledby="alerts-header" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <article className="glass-panel alert-hover" style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', gap: '12px', transition: 'all 0.3s' }}>
              <AlertTriangle size={20} color="var(--warning)" aria-hidden="true" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Mock Poll Today</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VVPAT testing starts at Loyola College booth at 10 AM.</p>
              </div>
            </article>
            <article className="glass-panel alert-hover" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', gap: '12px', transition: 'all 0.3s' }}>
              <Lightbulb size={20} color="var(--success)" aria-hidden="true" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Carry Original ID</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Keep your physical Aadhaar or EPIC card ready for verification.</p>
              </div>
            </article>
          </div>

          <div className="glass-panel" style={{ marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Booth Statistics</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{ flex: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>65% Polled</span>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
             <h3 id="readiness-header" style={{ fontSize: '1.1rem' }}>Civic Readiness</h3>
             <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>800 XP</span>
          </div>
          <div className="badge-grid" role="list" aria-labelledby="readiness-header">
            {[
              { name: 'Early Voter', icon: '🗳️', unlocked: true },
              { name: 'Info Seeker', icon: '🔍', unlocked: true },
              { name: 'Truth Guard', icon: '🛡️', unlocked: true },
              { name: 'Booth Master', icon: '📍', unlocked: false },
              { name: 'Civic Leader', icon: '👑', unlocked: false },
              { name: 'Digital Citizen', icon: '💻', unlocked: true },
            ].map((badge, i) => (
              <div key={i} role="listitem" className={`badge-item ${badge.unlocked ? 'unlocked' : ''}`} title={badge.unlocked ? 'Unlocked' : 'Locked'}>
                <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>{badge.icon}</span>
                <div className="badge-name">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }} aria-labelledby="candidates-header">
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 id="candidates-header" style={{ fontSize: '1.1rem' }}>Top Candidates (AI Predicts)</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => setActiveTab('Candidates & Parties')}>View All</button>
          </div>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {demoCandidates.map((c, i) => (
              <CandidateCard key={i} {...c} onCompare={() => setActiveTab('Candidates & Parties')} onViewDetails={setSelectedCandidate} />
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
           <h3 id="quiz-header" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Knowledge Quiz</h3>
           <div role="form" aria-labelledby="quiz-header" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass-panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <p id="quiz-q1" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>What is the minimum age to vote in India?</p>
                <div role="radiogroup" aria-labelledby="quiz-q1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['18', '21', '25', '16'].map(opt => (
                    <button 
                      key={opt} 
                      className="glass-panel" 
                      style={{ fontSize: '0.75rem', padding: '6px', cursor: 'pointer' }} 
                      onClick={() => alert(opt === '18' ? 'Correct!' : 'Incorrect')}
                      aria-label={`Option ${opt}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};


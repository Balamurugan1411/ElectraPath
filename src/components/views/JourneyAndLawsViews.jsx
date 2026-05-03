
import { CheckCircle2, ShieldCheck, Clock, User, ScrollText } from 'lucide-react';

export const JourneyView = ({ setActiveTab }) => {
  const steps = [
    { title: "Know Your Candidates", desc: "Reviewing manifestos and affidavits.", status: "active", date: "Today" },
    { title: "Identify Booth", desc: "Finding the nearest polling station and route.", status: "pending", date: "May 10" },
    { title: "Poll Day", desc: "Casting your vote at Loyola College.", status: "pending", date: "May 15" }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ marginBottom: '32px', textAlign: 'center' }}>Your Voter Journey 2026</h2>
      <div className="timeline-container glass-panel" style={{ padding: '40px' }}>
        {steps.map((step, i) => (
          <div key={i} className={`timeline-step ${step.status}`}>
            <div className="step-icon-box">
              {step.status === 'completed' && <CheckCircle2 size={14} color="white" />}
              {step.status === 'active' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
            </div>
            <div className="step-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <h4 style={{ color: step.status === 'pending' ? 'var(--text-muted)' : 'var(--text-main)' }}>{step.title}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{step.date}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.desc}</p>
              {step.status === 'active' && (
                <button 
                  className="glow-button" 
                  style={{ marginTop: '16px', padding: '8px 16px', fontSize: '0.8rem' }}
                  onClick={() => setActiveTab('Candidates & Parties')}
                >
                  Take Action
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const LawsView = () => {
  const laws = [
    {
      title: "Model Code of Conduct (MCC)",
      desc: "Guidelines for political parties and candidates during elections. It comes into force immediately after the ECI announces the schedule.",
      points: ["No use of official resources for campaigning.", "No new projects or schemes can be announced.", "Strict rules against hate speech and communal appeals."],
      icon: ShieldCheck,
      color: "#10b981"
    },
    {
      title: "RPA Section 126 (Silence Period)",
      desc: "Prohibits public meetings and campaigning during the 48 hours ending with the hour fixed for the conclusion of the poll.",
      points: ["No TV advertisements or radio broadcasts.", "No musical concerts or theatrical performances.", "Digital campaigning is strictly monitored."],
      icon: Clock,
      color: "#6366f1"
    },
    {
      title: "Voter Rights & NOTA",
      desc: "Every citizen above 18 has the right to vote (Art 326). NOTA (None of the Above) allows voters to express dissent.",
      points: ["Right to a secret ballot.", "Protection against voter intimidation.", "Provision for Braille on EVMs for visually impaired."],
      icon: User,
      color: "#f59e0b"
    },
    {
      title: "Affidavit Disclosure",
      desc: "Candidates must file an affidavit (Form 26) disclosing their criminal records, assets, liabilities, and educational qualifications.",
      points: ["Public access to candidate backgrounds.", "Mandatory newspaper publication of criminal history.", "Strict penalties for false information."],
      icon: ScrollText,
      color: "#ef4444"
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2>Election Laws & Regulations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Essential guidelines and legal frameworks governing the 2026 Elections.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {laws.map((law, i) => (
          <div key={i} className="glass-panel" style={{ padding: '24px', borderLeft: `4px solid ${law.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '8px', borderRadius: '8px', background: `${law.color}15`, color: law.color }}>
                <law.icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem' }}>{law.title}</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.5 }}>{law.desc}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px' }}>
              {law.points.map((pt, j) => (
                <li key={j} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.05)', textAlign: 'center' }}>
        <h4 style={{ marginBottom: '12px' }}>Need more legal clarity?</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Our AI Assistant "Electra" is trained on the full ECI manual and the Representation of the People Act.</p>
        <button className="glow-button" style={{ marginInline: 'auto' }} onClick={() => alert('Opening Legal Manual...')}>Download ECI Law Manual</button>
      </div>
    </div>
  );
};


import { UserPlus, Info, ExternalLink } from 'lucide-react';

const VOTER_PORTAL_URL = "https://voters.eci.gov.in/";

export const NewsTicker = () => {
  const news = [
    "Voter Registration ends in 4 days. Don't wait!",
    "Mock Polls successfully completed in 45 booths across Chennai Central.",
    "Election Commission announces 24/7 helpline for senior citizens.",
    "New digital voter cards (e-EPIC) now available for download.",
    "Security deployment increased at 12 sensitive polling locations."
  ];

  return (
    <div className="news-ticker" role="region" aria-label="Latest Election Updates">
      <div className="ticker-wrapper">
        {news.concat(news).map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-tag" aria-hidden="true">Live Update</span>
            <span className="sr-only">Live Update: </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const RegistrationView = () => {
  return (
    <div 
      className="glass-panel" 
      role="main"
      aria-labelledby="reg-title"
      style={{ padding: '60px', textAlign: 'center', maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))' }}
    >
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--primary)' }} aria-hidden="true">
        <UserPlus size={40} />
      </div>
      <h2 id="reg-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>Official Voter Registration</h2>
      <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: 1.6 }}>
        Voter registration is handled exclusively by the **Election Commission of India**. ElectraPath AI provides guidance, but all official applications must be submitted through the ECI portal.
      </p>
      
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'left', marginBottom: '40px', background: 'rgba(0,0,0,0.2)' }}>
        <h4 id="checklist-title" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Info size={18} color="var(--primary)" aria-hidden="true" /> Required Documents</h4>
        <ul aria-labelledby="checklist-title" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px', listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Ensure you have a scanned copy of your **Aadhaar Card**.</li>
          <li>Keep a digital **Passport-size photograph** ready.</li>
          <li>Have your **Address Proof** (Gas bill/Electric bill) handy.</li>
        </ul>
      </div>

      <button className="glow-button" style={{ padding: '16px 32px', fontSize: '1.1rem', marginInline: 'auto' }} onClick={() => window.open(VOTER_PORTAL_URL, '_blank')}>
        Go to Official ECI Portal <ExternalLink size={20} aria-hidden="true" />
      </button>
    </div>
  );
};


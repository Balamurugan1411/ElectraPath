import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Monitor, Bell, Shield, 
  User, Globe, Cpu, Zap, Save, RefreshCcw, 
  Trash2, CreditCard, ChevronRight, LogIn, CheckCircle2
} from 'lucide-react';

export const SettingsView = ({ theme, setTheme }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || "");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English (India)');
  const [orbAnimation, setOrbAnimation] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const saveApiKey = (val) => {
    setApiKey(val);
    localStorage.setItem('gemini_api_key', val);
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    // Mocking Google Auth delay
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2>System Settings</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
          Manage your interface preferences, AI integration, and security protocols.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Identity & Authentication */}
        <div className="glass-panel" style={{ padding: '24px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <div style={{ width: '50px', height: '50px', background: isLoggedIn ? 'var(--success)' : 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {isLoggedIn ? <Shield size={28} color="white" /> : <User size={28} color="var(--text-muted)" />}
               </div>
               <div>
                 <h4 style={{ marginBottom: '4px' }}>{isLoggedIn ? "Aarav Sharma" : "Guest Voter"}</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                   {isLoggedIn ? "Verified via Google Identity Services" : "Log in to sync your voter journey across devices."}
                 </p>
               </div>
            </div>
            
            <AnimatePresence mode='wait'>
              {!isLoggedIn ? (
                <motion.button 
                  key="login"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="glow-button" 
                  style={{ gap: '12px', padding: '12px 24px', background: 'white', color: '#1f2937' }}
                >
                  {isLoggingIn ? (
                    <RefreshCcw size={18} className="pulse" />
                  ) : (
                    <>
                      <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: '18px' }} />
                      Login with Google
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.div 
                  key="verified"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="live-badge" 
                  style={{ gap: '8px', padding: '10px 20px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid var(--success)' }}
                >
                  <CheckCircle2 size={16} /> ACCOUNT VERIFIED
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sun size={18} color="var(--primary)" /> Appearance
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Theme Mode</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Choose your preferred interface aesthetic.</div>
              </div>
              <div className="glass-panel" style={{ display: 'flex', padding: '4px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <ThemeButton active={theme === 'light'} onClick={() => setTheme('light')} icon={<Sun size={14} />} label="Light" />
                <ThemeButton active={theme === 'dark'} onClick={() => setTheme('dark')} icon={<Moon size={14} />} label="Dark" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Interface Language</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Available in regional languages.</div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
              >
                <option>English (India)</option>
                <option>Tamil (தமிழ்)</option>
                <option>Hindi (हिन्दी)</option>
                <option>Telugu (తెలుగు)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI & Performance */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Cpu size={18} color="var(--primary)" /> AI & Experience
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Holographic Orb</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enable premium AI status animations.</div>
              </div>
              <Toggle active={orbAnimation} onClick={() => setOrbAnimation(!orbAnimation)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Gemini API Key</div>
                <Zap size={14} color="var(--warning)" />
              </div>
              <input 
                type="password"
                placeholder="Enter Gemini API Key..."
                value={apiKey}
                onChange={(e) => saveApiKey(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', color: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}
              />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Get a free key from Google AI Studio.</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '12px' }}>
        <button className="glow-button" style={{ background: 'transparent', border: '1px solid var(--border)' }}>Reset to Default</button>
        <button className="glow-button">Save All Changes</button>
      </div>
    </div>
  );
};

const ThemeButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
      background: active ? 'var(--primary)' : 'transparent',
      color: active ? 'white' : 'var(--text-muted)',
      fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.3s ease'
    }}
  >
    {icon} {label}
  </button>
);

const Toggle = ({ active, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      width: '40px', height: '20px', borderRadius: '10px', background: active ? 'var(--success)' : 'rgba(255,255,255,0.1)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
    }}
  >
    <motion.div 
      animate={{ x: active ? 22 : 2 }}
      initial={false}
      style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px' }}
    />
  </div>
);

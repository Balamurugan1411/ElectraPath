/**
 * @fileoverview Main Application Entry Point
 * Implements high-performance routing and state management for ElectraPath AI.
 */

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Map, UserPlus, Users, 
  MapPin, ScrollText, FolderOpen, 
  Settings, Search, Bell, ChevronDown, Sparkles, ScanSearch, Sun, Moon, Trophy, Calendar, ShieldCheck,
  MapPin as MapPinIcon
} from 'lucide-react';

import { SidebarItem, CandidateDetailModal } from './components/shared/UIComponents';
import { AIAssistant } from './components/views/AIAssistant';
import { DashboardView } from './components/views/DashboardView';
import { RegistrationView, NewsTicker } from './components/views/MiscViews';
import { CandidatesView, InteractiveMap } from './components/views/MapAndCandidatesViews';
import { JourneyView, LawsView } from './components/views/JourneyAndLawsViews';
import { MCCAnalyzer } from './components/views/MCCAnalyzer';
import { SettingsView } from './components/views/SettingsView';
import { ResourcesView } from './components/views/ResourcesView';
import { QuizView } from './components/views/QuizView';
import ComplianceMonitor from './components/views/ComplianceMonitor';

import './App.css';

/**
 * ElectraPath AI Root Component
 * Orchestrates the civic intelligence dashboard, AI integration, and global theme state.
 * @component
 */
function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [queueStatus, setQueueStatus] = useState({ waitTime: 15, trend: 'stable' });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueStatus({
        waitTime: Math.floor(Math.random() * 40) + 10,
        trend: Math.random() > 0.5 ? 'rising' : 'falling'
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sidebarLinks = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'My Journey', icon: Map },
    { label: 'Voter Registration', icon: UserPlus },
    { label: 'Candidates & Parties', icon: Users },
    { label: 'Polling Details', icon: MapPin },
    { label: 'Election Laws', icon: ScrollText },
    { label: 'AI MCC Analyzer', icon: ScanSearch },
    { label: 'Compliance Monitor', icon: ShieldCheck },
    { label: 'Knowledge Check', icon: Trophy },
    { label: 'Resources', icon: FolderOpen },
    { label: 'Settings', icon: Settings },
  ];


  const demoCandidates = [
    { name: 'S. Ramkumar', party: 'ABC Party', age: 52, education: 'B.L.', assets: '₹5.2 Cr', cases: 0, color: '#ff9933', image: '/candidates/ramkumar.png', predictionScore: 82 },
    { name: 'K. Meena', party: 'XYZ Party', age: 44, education: 'M.Sc', assets: '₹1.8 Cr', cases: 0, color: '#138808', image: '/candidates/meena.png', predictionScore: 89 },
    { name: 'J. Balaji', party: 'LMN Front', age: 48, education: 'Ph.D', assets: '₹95 L', cases: 1, color: '#000080', image: '/candidates/balaji.png', predictionScore: 65 },
    { name: 'M. Selvam', party: 'PQR Union', age: 39, education: 'B.E.', assets: '₹40 L', cases: 0, color: '#0000ff', image: '/candidates/selvam.png', predictionScore: 71 },
    { name: 'A. Priya', party: 'Independent', age: 45, education: 'MBA', assets: '₹1.2 Cr', cases: 0, color: '#e0e0e0', image: '/candidates/priya.png', predictionScore: 78 },
    { name: 'R. Vignesh', party: 'Youth Front', age: 29, education: 'M.Tech', assets: '₹25 L', cases: 0, color: '#ff00ff', image: '/candidates/vignesh.png', predictionScore: 60 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardView setActiveTab={setActiveTab} queueStatus={queueStatus} demoCandidates={demoCandidates.slice(0,3)} setSelectedCandidate={setSelectedCandidate} />;
      case 'Voter Registration': return <RegistrationView />;
      case 'Candidates & Parties': return <CandidatesView onViewDetails={setSelectedCandidate} candidates={demoCandidates} />;
      case 'My Journey': return <JourneyView setActiveTab={setActiveTab} />;
      case 'Polling Details': return <InteractiveMap />;
      case 'Election Laws': return <LawsView />;
      case 'AI MCC Analyzer': return <MCCAnalyzer />;
      case 'Compliance Monitor': return <ComplianceMonitor />;
      case 'Knowledge Check': return <QuizView />;
      case 'Resources': return <ResourcesView />;
      case 'Settings': return <SettingsView theme={theme} setTheme={setTheme} />;
      default: {
        const IconComponent = sidebarLinks.find(l => l.label === activeTab)?.icon;
        return (
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '16px' }}>{IconComponent && <IconComponent size={48} />}</div>
            <h2>{activeTab}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '16px 0 32px' }}>This section is being synchronized with live ECI data for the 2026 Elections.</p>
            <button className="glow-button" style={{ marginInline: 'auto' }} onClick={() => setActiveTab('Dashboard')}>Return to Dashboard</button>
          </div>
        );
      }
    }
  };

  return (
    <div className="app-wrapper">
      <CandidateDetailModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
      <aside className="sidebar">
        <div className="logo-section" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('Dashboard')}>
          <div className="logo-icon-wrapper"><Sparkles size={20} /></div>
          <div>
            <h2 style={{ fontSize: '1.2rem', lineHeight: 1 }}>ElectraPath <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>AI</span></h2>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 600 }}>POWERED BY GOOGLE AI</p>
          </div>
        </div>

        <nav className="nav-links">
          {sidebarLinks.map(link => (
            <SidebarItem key={link.label} icon={link.icon} label={link.label} active={activeTab === link.label} onClick={() => setActiveTab(link.label)} />
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="glass-panel" style={{ width: '100%', padding: '12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid var(--primary-glow)' }} onClick={() => window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=Poll+Day+2026&dates=20260515T070000Z/20260515T180000Z&details=Cast+your+vote+at+Loyola+College+booth.', '_blank')}>
            <Calendar size={14} color="var(--primary)" />
            Add Poll Day to Calendar
          </button>
          
          <div className="glass-panel" style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <ShieldCheck size={12} color="var(--primary)" />
              <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Responsible AI</span>
            </div>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Developed in alignment with Google AI Principles for fair and safe electoral guidance.</p>
          </div>
        </div>
      </aside>


      <main className="main-content">
        <NewsTicker />
        <header className="top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <button className="glass-panel" style={{ padding: '8px', cursor: 'pointer' }} onClick={() => setActiveTab('Dashboard')}><LayoutDashboard size={18} /></button>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <MapPinIcon size={14} /> <span>Chennai Central</span> <ChevronDown size={12} />
             </div>
          </div>

          <div className="search-bar">
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Search candidates, laws, booths..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="header-actions">
            <div className="action-icon" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div className="action-icon"><Bell size={18} /><div className="notification-dot"></div></div>
            <div className="user-profile" onClick={() => setActiveTab('Settings')}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Aarav Sharma</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Verified Voter</div>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav" className="user-avatar" alt="User" />
            </div>
          </div>
        </header>

        {renderContent()}
      </main>

      <AIAssistant />
    </div>
  );
}

export default App;

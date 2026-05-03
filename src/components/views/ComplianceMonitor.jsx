import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, CheckCircle, Zap, Globe, Cpu } from 'lucide-react';

const ComplianceMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalProcessed: 1240,
    complianceRate: 98.4,
    activeThreats: 2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['SOCIAL_POST', 'AD_CAMPAIGN', 'SPEECH_TRANSCRIPT'];
      const regions = ['Chennai Central', 'Madurai', 'Coimbatore'];
      const statuses = ['CLEAN', 'CLEAN', 'CLEAN', 'FLAGGED'];
      
      const newLog = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setLogs(prev => [newLog, ...prev].slice(0, 8));
      
      if (newLog.status === 'FLAGGED') {
        setStats(prev => ({
          ...prev,
          activeThreats: prev.activeThreats + 1,
          complianceRate: Math.max(90, prev.complianceRate - 0.1)
        }));
      } else {
        setStats(prev => ({
          ...prev,
          totalProcessed: prev.totalProcessed + 1,
          complianceRate: Math.min(100, prev.complianceRate + 0.01)
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="compliance-monitor-container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
      <div className="main-monitor glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="neural-ping"></div>
            <h3 style={{ margin: 0 }}>Neural Compliance Feed</h3>
          </div>
          <div className="badge-neural">GOD-MODE ACTIVE</div>
        </div>

        <div className="log-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AnimatePresence initial={false}>
            {logs.map(log => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="compliance-log-item"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${log.status === 'FLAGGED' ? '#ef4444' : '#10b981'}`
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.timestamp}</span>
                   <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{log.type}</span>
                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.region}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {log.status === 'FLAGGED' ? <ShieldAlert size={14} color="#ef4444" /> : <CheckCircle size={14} color="#10b981" />}
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: log.status === 'FLAGGED' ? '#ef4444' : '#10b981' }}>{log.status}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Neural Grid Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 80%, rgba(99, 102, 241, 0.05))',
          pointerEvents: 'none'
        }}></div>
      </div>

      <div className="stats-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary)' }}>
            <Cpu size={18} />
            <span style={{ fontWeight: 600 }}>System Health</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <StatRow label="Processing Latency" value="24ms" color="#10b981" />
            <StatRow label="Neural Confidence" value="99.2%" color="#10b981" />
            <StatRow label="Compliance Index" value={`${stats.complianceRate.toFixed(1)}%`} color={stats.complianceRate > 95 ? "#10b981" : "#f59e0b"} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#ef4444' }}>
            <ShieldAlert size={18} />
            <span style={{ fontWeight: 600 }}>Threat Alert</span>
          </div>
          <h2 style={{ margin: '0 0 4px', color: '#ef4444' }}>{stats.activeThreats}</h2>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Anomalies requiring manual review</p>
        </div>

        <button className="glow-button" style={{ width: '100%' }}>
          <Zap size={14} /> Run Global Audit
        </button>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, color }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{value}</span>
  </div>
);

export default ComplianceMonitor;

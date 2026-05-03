import { 
  FileText, Video, ExternalLink, 
  BookOpen, HelpCircle, GraduationCap, Gavel, 
  Link as LinkIcon 
} from 'lucide-react';

export const ResourcesView = () => {
  const categories = [
    {
      title: "ECI Official Rules",
      icon: <Gavel size={20} color="var(--primary)" />,
      items: [
        { name: "Model Code of Conduct (MCC)", url: "https://www.eci.gov.in/mcc/" },
        { name: "Manual on EVM & VVPAT", url: "https://www.eci.gov.in/files/file/15317-manual-on-electronic-voting-machine-and-vvpat-edition-6/" },
        { name: "Compendium of Instructions", url: "https://www.eci.gov.in/handbooks-manuals/" }
      ]
    },
    {
      title: "Educational Guides",
      icon: <GraduationCap size={20} color="var(--primary)" />,
      items: [
        { name: "Voter Education 101", url: "https://ecisveep.nic.in/" },
        { name: "Registering to Vote Online", url: "https://voters.eci.gov.in/" },
        { name: "KYC: Know Your Candidate", url: "https://affidavit.eci.gov.in/" }
      ]
    },
    {
      title: "Multimedia Gallery",
      icon: <Video size={20} color="var(--primary)" />,
      items: [
        { name: "How EVMs Work (Video)", url: "https://www.youtube.com/watch?v=kYI_H_Y5zIk" },
        { name: "Postal Ballot Procedures", url: "https://www.eci.gov.in/files/file/15286-manual-on-postal-ballot/" }
      ]
    }
  ];

  const openECILink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             Civic Resource Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px' }}>
            Verified external links to the Election Commission of India's official documentation and portals.
          </p>
        </div>
        <div className="live-badge" style={{ padding: '8px 16px' }}>
          <LinkIcon size={14} /> OFFICIAL ECI SOURCES
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categories.map((cat, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              {cat.icon} {cat.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cat.items.map((item, i) => (
                <div 
                  key={i} 
                  className="glass-panel alert-hover" 
                  onClick={() => openECILink(item.url)}
                  style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileText size={16} color="var(--primary)" />
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</div>
                  </div>
                  <ExternalLink size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <HelpCircle size={32} />
          </div>
          <div>
            <h3 style={{ marginBottom: '4px' }}>Verified Legal Information</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All links above point directly to government-maintained e-portals.</p>
          </div>
        </div>
        <button className="glow-button" onClick={() => openECILink("https://www.eci.gov.in/")}>Visit eci.gov.in</button>
      </div>
    </div>
  );
};

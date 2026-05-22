import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            background: 'linear-gradient(to bottom, var(--bg), var(--code-bg))'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Alexandr Lavrentyev</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Software Engineer & Creative Developer</p>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
                fontSize: '0.9rem'
            }}>
                <a href="mailto:al3xsus@pm.me" className="footer-link">al3xsus@pm.me</a>
                <a href="https://github.com/al3xsus" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
                <a href="https://al3xsus.github.io/" target="_blank" rel="noopener noreferrer" className="footer-link">Personal Site</a>
                <a href="https://www.linkedin.com/in/alexandr-lavrentyev/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            </div>

            <div style={{
                fontSize: '0.8rem',
                opacity: 0.6,
                maxWidth: '600px',
                textAlign: 'center',
                lineHeight: '1.6'
            }}>
                Built with React and TypeScript. This tool analyzes text using Shannon entropy and Unicode character distribution to generate unique color profiles.
            </div>

            <style>{`
                .footer-link {
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    background: var(--bg);
                    border: 1px solid var(--border);
                    transition: all 0.3s ease;
                }
                .footer-link:hover {
                    border-color: var(--accent);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow);
                }
            `}</style>
        </footer>
    );
};

export default Footer;

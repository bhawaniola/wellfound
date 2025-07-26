'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import VendorList from './components/VendorList';

export default function Home() {
  const { data: session } = useSession();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    flexDirection: 'column',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00bcd4',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const buttonHover = {
    backgroundColor: '#0097a7',
  };

  if (!session)
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h2 style={headingStyle}>Vendor Manager</h2>
          <button
            style={buttonStyle}
            onClick={() => signIn("google")}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Login with Google
          </button>
        </div>
      </div>
    );

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start' }}>
      <div style={{ ...cardStyle, width: '100%', maxWidth: '900px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            style={buttonStyle}
            onClick={() => signOut()}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          >
            Logout
          </button>
        </div>
        <VendorList />
      </div>
    </div>
  );
}

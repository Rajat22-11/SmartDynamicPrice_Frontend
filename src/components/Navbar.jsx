import React from 'react';

export default function Navbar() {
    return (
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <h1 style={styles.logoText}>Smart Dynamic Pricing</h1>
          </div>
          <div style={styles.navLinks}>
            <a href="#" style={styles.navLink}>Home</a>
            <a href="#" style={styles.navLink}>Features</a>
            <a href="#" style={styles.navLink}>Pricing</a>
          </div>
          <div>
            <button style={styles.button}>Get Started</button>
          </div>
        </div>
      </nav>
    );
}

const styles = {
    navbar: {
        width: '100vw', // Full width of the viewport
        backgroundColor: '#F8CB46', // Warm Yellow background
        boxShadow: '0 2px 10px rgba(12, 131, 31, 0.3)', // Deep Green shadow
        borderBottom: '3px solid #0C831F', // Deep Green border
        position: 'fixed', // Fix the navbar at the top
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
    },
    navContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px',
        width: '100%', // Stretch content to full width
        padding: '0', // No padding
        margin: '0' // No margin
    },
    logo: {
        flexShrink: 0,
        marginLeft: '20px' // Only slight spacing for aesthetics
    },
    logoText: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#000000', // Black text for high contrast
    },
    navLinks: {
        display: 'flex',
        gap: '20px'
    },
    navLink: {
        textDecoration: 'none',
        color: '#0C831F', // Deep Green text
        fontSize: '16px',
        fontWeight: '500',
        padding: '8px 12px',
        borderRadius: '6px',
        transition: 'background-color 0.2s, color 0.2s'
    },
    button: {
        backgroundColor: '#0C831F', // Deep Green for CTA
        color: 'white',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        marginRight: '20px', // Only slight spacing for aesthetics
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
    }
};

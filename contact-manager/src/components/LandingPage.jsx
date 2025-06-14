import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  const features = [
    {
      icon: '👥',
      title: 'Manage Contacts',
      description: 'Organize all your contacts in one secure, easy-to-use platform with advanced search capabilities.'
    },
    {
      icon: '📱',
      title: 'Modern Interface',
      description: 'Clean, intuitive design that works seamlessly across all your devices with dark theme support.'
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find any contact instantly with our powerful search that looks through names, emails, and phone numbers.'
    },
    {
      icon: '🏷️',
      title: 'Categories',
      description: 'Organize contacts into categories like Personal, Work, Family, and Friends for better management.'
    },
    {
      icon: '⚡',
      title: 'Fast & Secure',
      description: 'Lightning-fast performance with secure data storage using MongoDB and modern web technologies.'
    },
    {
      icon: '🌐',
      title: 'Cloud Ready',
      description: 'Built with scalability in mind, ready to be deployed to the cloud for global access.'
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <h1>Professional Contact Manager</h1>
        <p>
          The most elegant way to manage your personal and professional contacts. 
          Built with modern technology for maximum efficiency and user experience.
        </p>
        <div className="hero-buttons">
          <Link to="/contacts" className="btn btn-primary btn-lg">
            📋 View All Contacts
          </Link>
          <Link to="/add" className="btn btn-success btn-lg">
            ➕ Add New Contact
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-card">
          <span className="stat-number">∞</span>
          <span className="stat-label">Unlimited Contacts</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">4</span>
          <span className="stat-label">Contact Categories</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">⚡</span>
          <span className="stat-label">Lightning Fast</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">🔒</span>
          <span className="stat-label">Secure Storage</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero" style={{ paddingTop: '2rem' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Ready to Get Started?
        </h2>
        <p style={{ marginBottom: '2rem' }}>
          Start managing your contacts professionally with our modern, secure platform.
        </p>
        <div className="hero-buttons">
          <Link to="/add" className="btn btn-primary btn-lg">
            🚀 Create First Contact
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            ℹ️ Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 
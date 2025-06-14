import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  const technologies = [
    { name: 'React 18', icon: '⚛️', description: 'Modern frontend framework' },
    { name: 'Node.js', icon: '🟢', description: 'Server-side JavaScript runtime' },
    { name: 'MongoDB', icon: '🍃', description: 'NoSQL database for flexible data storage' },
    { name: 'Express.js', icon: '🚀', description: 'Fast web application framework' },
    { name: 'Vite', icon: '⚡', description: 'Next-generation build tool' },
    { name: 'Axios', icon: '🌐', description: 'HTTP client for API requests' }
  ];

  const teamFeatures = [
    {
      title: 'Modern Architecture',
      description: 'Built with the MERN stack (MongoDB, Express, React, Node.js) following industry best practices and modern development patterns.',
      icon: '🏗️'
    },
    {
      title: 'Responsive Design', 
      description: 'Fully responsive interface that works perfectly on desktop, tablet, and mobile devices with a beautiful dark theme.',
      icon: '📱'
    },
    {
      title: 'Security First',
      description: 'Implements proper CORS policies, data validation, and secure API endpoints to protect your contact information.',
      icon: '🔒'
    },
    {
      title: 'Performance Optimized',
      description: 'Lightning-fast load times with optimized database queries, lazy loading, and efficient state management.',
      icon: '⚡'
    }
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">About Contact Manager</h1>
        <p className="page-subtitle">
          Learn more about our professional contact management solution
        </p>
      </div>

      <div className="card">
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1.5rem', 
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          🎯 Our Mission
        </h2>
        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          To provide individuals and businesses with a powerful, intuitive, and secure platform 
          for managing their contacts. We believe that staying connected should be simple, 
          efficient, and enjoyable.
        </p>
      </div>

      <div className="features">
        {teamFeatures.map((feature, index) => (
          <div key={index} className="feature-card slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem', 
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          🛠️ Technology Stack
        </h2>
        
        <div className="tech-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {technologies.map((tech, index) => (
            <div key={index} className="tech-card" style={{
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>
                {tech.icon}
              </span>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {tech.name}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1.5rem', 
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          🌟 Key Features
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              📋 Contact Management
            </h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <li>Add, edit, and delete contacts</li>
              <li>Organize by categories (Personal, Work, Family, Friends)</li>
              <li>Store names, emails, phone numbers, and addresses</li>
              <li>View detailed contact information</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
              🔍 Advanced Search
            </h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <li>Real-time search across all fields</li>
              <li>Search by name, email, or phone number</li>
              <li>Filter contacts by category</li>
              <li>Instant results as you type</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: 'var(--warning-color)', marginBottom: '1rem' }}>
              🎨 User Experience
            </h3>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <li>Beautiful dark theme interface</li>
              <li>Responsive design for all devices</li>
              <li>Smooth animations and transitions</li>
              <li>Intuitive navigation and layout</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1.5rem', 
          color: 'var(--text-primary)'
        }}>
          🚀 Ready to Start?
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Join thousands of users who trust Contact Manager for their contact organization needs. 
          Start building your contact database today!
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contacts" className="btn btn-primary btn-lg">
            📋 View Contacts
          </Link>
          <Link to="/add" className="btn btn-success btn-lg">
            ➕ Add Contact
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            🏠 Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage; 
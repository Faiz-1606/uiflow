import { useState, useEffect } from 'react'
import news1 from './assets/news1.svg';
import news2 from './assets/news2.svg';
import news3 from './assets/news3.svg';
import isroImg from './assets/isro.jpg';
import techImg from './assets/tech.jpg';
import cryptoImg from './assets/crypto.jpg';
import ytIcon from './assets/youtube.svg';
import figmaIcon from './assets/figma.svg';
import './App.css'

// JSON Data with all metadata
const pageData = {
  "app": "GoogleLandingPage",
  "meta": {
    "browserTitle": "Google",
    "url": "https://www.google.com/",
    "user": {
      "name": "John Doe",
      "email": "user@example.com",
      "profileIcon": "profile.png",
      "accountMenu": [
        "Manage your Google Account",
        "Add another account",
        "Sign out"
      ]
    }
  },
  "components": {
    "browserControls": [
      { "id": "back", "icon": "back" },
      { "id": "forward", "icon": "forward" },
      { "id": "reload", "icon": "reload" },
      { "id": "settings", "icon": "settings" }
    ],
    "urlBar": {
      "placeholder": "Search or type a URL",
      "value": "https://www.google.com/"
    },
    "recentTabs": [
      { "title": "YouTube", "favicon": ytIcon, "url": "https://www.youtube.com" },
      { "title": "Gmail", "favicon": "https://www.google.com/gmail/about/static/images/logo-gmail.png", "url": "https://mail.google.com" },
      { "title": "StackOverflow", "favicon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico", "url": "https://stackoverflow.com" },
      { "title": "Figma – UI Flow", "favicon": figmaIcon, "url": "https://www.figma.com" }
    ],
    "logo": {
      "src": "google-logo.png",
      "alt": "Google Logo"
    },
    "searchBar": {
      "placeholderOptions": [
        "Search Google or type a URL",
        "Try searching: weather, news, movies...",
        "What do you want to learn today?",
        "Ask anything…"
      ],
      "leftIcon": "search",
      "rightIcon": "mic",
      "lensIcon": "lens"
    },
    "primaryActions": [
      { "id": "search_button", "label": "Google Search" },
      { "id": "lucky_button", "label": "I'm Feeling Lucky" }
    ],
    "trendingNews": [
      {
        "headline": "India announces new tech innovation grant",
        "src": "Times of India",
        "thumbnail": techImg
      },
      {
        "headline": "Global markets rally after crypto surge",
        "src": "Economic Times",
        "thumbnail": cryptoImg
      },
      {
        "headline": "ISRO prepares next mission for 2026",
        "src": "Hindustan Times",
        "thumbnail": isroImg
      }
    ],
    "topSearches": [
      "Cricket World Cup updates",
      "Best phones under 20000",
      "Weather tomorrow",
      "AI tools for students",
      "Trending memes",
      "How to learn React fast"
    ],
    "footer": {
      "region": "India",
      "leftLinks": [
        "About",
        "Advertising",
        "Business",
        "How Search works"
      ],
      "rightLinks": [
        "Privacy",
        "Terms",
        "Settings"
      ]
    },
    "userInfo": {
      "quickLinks": [
        "Search history",
        "My activity",
        "Personal info",
        "Data & privacy",
        "Security",
        "Payments & subscriptions"
      ]
    }
  }
};

// Browser Header Component
const BrowserHeader = ({ controls, urlBar, recentTabs, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(urlBar.value);

  return (
    <div className="browser-header">
      {/* Browser Controls */}
      <div className="browser-controls">
        <div className="control-buttons">
          {controls.map((control) => (
            <button
              key={control.id}
              className="control-btn"
              title={control.icon}
              onClick={() => {
                if (control.id === 'reload') window.location.reload();
                if (control.id === 'back') window.history.back();
                if (control.id === 'forward') window.history.forward();
              }}
            >
              {control.icon === 'back' && '←'}
              {control.icon === 'forward' && '→'}
              {control.icon === 'reload' && '↻'}
              {control.icon === 'settings' && '⚙'}
            </button>
          ))}
        </div>
        
        {/* URL Bar */}
        <div className="url-bar-container">
          <div className="url-bar">
            <span className="lock-icon">🔒</span>
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder={urlBar.placeholder}
              className="url-input"
            />
            <span className="star-icon">⭐</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="user-section">
          <button className="menu-btn" title="Settings">☰</button>
          <div className="user-profile-wrapper">
            <button 
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
              title={user.name}
            >
              {user.name.charAt(0)}
            </button>
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar-large">{user.name.charAt(0)}</div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <div className="user-menu-divider"></div>
                {user.accountMenu.map((item, idx) => (
                  <button key={idx} className="user-menu-item">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Tabs */}
      <div className="tabs-bar">
        {recentTabs.map((tab, idx) => (
          <a
            key={idx}
            href={tab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tab"
            title={tab.title}
          >
            <img src={tab.favicon} alt="icon" className="tab-icon-img" />
            <span className="tab-title">{tab.title}</span>
            <button className="tab-close" onClick={(e) => e.preventDefault()}>×</button>
          </a>
        ))}
        <button className="new-tab-btn" title="New tab">+</button>
      </div>
    </div>
  );
};

// Main Google Landing Page
function App() {
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState(pageData.components.searchBar.placeholderOptions[0]);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [newName, setNewName] = useState(pageData.meta.user.name || '');
  const [newEmail, setNewEmail] = useState(pageData.meta.user.email || '');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    document.title = pageData.meta.browserTitle;
    
    const interval = setInterval(() => {
      const options = pageData.components.searchBar.placeholderOptions;
      setPlaceholder(options[Math.floor(Math.random() * options.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`, '_blank');
    }
  };

  const handleLuckySearch = () => {
    if (searchValue.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}&btnI=1`, '_blank');
    }
  };

  const handleTopSearch = (query) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Simulate account creation by updating pageData user (in real app, send to backend)
    pageData.meta.user.name = newName || 'New User';
    pageData.meta.user.email = newEmail || 'new@example.com';
    setShowAccountModal(false);
    alert('Account details updated (demo).');
  };

  return (
    <div className="app">
      {/* Browser Header */}
      <BrowserHeader
        controls={pageData.components.browserControls}
        urlBar={pageData.components.urlBar}
        recentTabs={pageData.components.recentTabs}
        user={pageData.meta.user}
      />

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="nav-link">Gmail</a>
            <a href="https://www.google.com/imghp" target="_blank" rel="noopener noreferrer" className="nav-link">Images</a>
          </div>
          <div className="nav-right">
            <div className="apps-wrapper">
              <button 
                className="apps-btn" 
                title="Google apps"
                onClick={() => setShowQuickLinks(!showQuickLinks)}
              >
                ⋮⋮⋮
              </button>
              {showQuickLinks && (
                <div className="quick-links-menu">
                  <div className="quick-links-title">Quick Links</div>
                  {pageData.components.userInfo.quickLinks.map((link, idx) => (
                    <a key={idx} href="#" className="quick-link-item">
                      📄 {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="user-avatar-nav" onClick={() => setShowAccountModal(true)} title="Account details">
              {pageData.meta.user.name.charAt(0)}
            </div>
          </div>
        </nav>

        {/* Google Logo & Search */}
        <div className="search-section">
          {/* Google Logo */}
          <div className="google-logo">
  <svg
    className="logo-svg"
    viewBox="0 0 350 90"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="0"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#4285F4"
    >
      G
    </text>

    <text
      x="58"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#EA4335"
    >
      o
    </text>

    <text
      x="112"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#FBBC04"
    >
      o
    </text>

    <text
      x="168"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#4285F4"
    >
      g
    </text>

    <text
      x="212"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#34A853"
    >
      l
    </text>

    <text
      x="238"
      y="70"
      fontSize="80"
      fontWeight="700"
      fontFamily="Arial, sans-serif"
      fill="#EA4335"
    >
      e
    </text>
  </svg>
</div>


          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-bar">
              <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholder}
                className="search-input"
              />
              <button type="button" className="mic-btn" title="Search by voice">
                <svg className="icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
              <button type="button" className="lens-btn" title="Search by image">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="action-buttons">
            {pageData.components.primaryActions.map((action) => (
              <button
                key={action.id}
                className="action-btn"
                onClick={action.id === 'lucky_button' ? handleLuckySearch : handleSearch}
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Top Searches */}
          <div className="top-searches">
            <h3 className="section-title">Trending Searches:</h3>
            <div className="search-chips">
              {pageData.components.topSearches.map((search, idx) => (
                <button
                  key={idx}
                  className="search-chip"
                  onClick={() => handleTopSearch(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Trending News */}
          <div className="trending-news">
            <h3 className="section-title-large">Trending News</h3>
            <div className="news-grid">
              {pageData.components.trendingNews.map((news, idx) => (
                <div key={idx} className="news-card">
                  <img src={news.thumbnail} alt={news.headline} className="news-image" />
                  <div className="news-content">
                    <p className="news-headline">{news.headline}</p>
                    <p className="news-source">{news.src}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-region">
            <p>{pageData.components.footer.region}</p>
          </div>
          <div className="footer-links">
            <div className="footer-left">
              {pageData.components.footer.leftLinks.map((link, idx) => (
                <a key={idx} href="#" className="footer-link">
                  {link}
                </a>
              ))}
            </div>
            <div className="footer-right">
              {pageData.components.footer.rightLinks.map((link, idx) => (
                <a key={idx} href="#" className="footer-link">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
        {/* Account Modal */}
        {showAccountModal && (
          <div className="account-modal-overlay" onClick={() => setShowAccountModal(false)}>
            <div className="account-modal" onClick={(e) => e.stopPropagation()}>
              <div className="account-modal-header">
                <h2>Create / Update Account</h2>
                <button className="close-btn" onClick={() => setShowAccountModal(false)}>×</button>
              </div>
              <form onSubmit={handleCreateAccount} className="account-form">
                <label>
                  Name
                  <input
                    type="text"
                    placeholder={pageData.meta.user.name}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    placeholder={pageData.meta.user.email}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <div className="account-actions">
                  <button type="submit" className="create-account-btn">Save Account</button>
                  <button type="button" className="secondary-btn" onClick={() => setShowAccountModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App

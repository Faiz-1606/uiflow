const { useState, useEffect } = React;

// JSON Data
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
      { "title": "YouTube", "favicon": "yt.png" },
      { "title": "Gmail", "favicon": "gmail.png" },
      { "title": "StackOverflow", "favicon": "so-icon.png" },
      { "title": "Figma – UI Flow", "favicon": "figma.png" }
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
        "thumbnail": "news1.jpg"
      },
      {
        "headline": "Global markets rally after crypto surge",
        "src": "Economic Times",
        "thumbnail": "news2.jpg"
      },
      {
        "headline": "ISRO prepares next mission for 2026",
        "src": "Hindustan Times",
        "thumbnail": "news3.jpg"
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
  return (
    <div className="bg-gray-800 text-white">
      {/* Browser Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-3">
          {controls.map((control) => (
            <button
              key={control.id}
              className="hover:bg-gray-700 p-2 rounded-full transition"
              title={control.icon}
            >
              {control.icon === 'back' && '←'}
              {control.icon === 'forward' && '→'}
              {control.icon === 'reload' && '↻'}
              {control.icon === 'settings' && '⚙'}
            </button>
          ))}
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 mx-4">
          <div className="bg-gray-700 rounded-full px-4 py-2 flex items-center">
            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="text"
              defaultValue={urlBar.value}
              placeholder={urlBar.placeholder}
              className="bg-transparent flex-1 outline-none text-sm"
            />
            <span className="text-gray-400 ml-2">⭐</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <button className="hover:bg-gray-700 p-2 rounded-full">☰</button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-semibold">
            {user.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Recent Tabs */}
      <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
        {recentTabs.map((tab, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-t-lg text-sm whitespace-nowrap hover:bg-gray-600 transition cursor-pointer"
          >
            <span className="text-xs">📑</span>
            <span>{tab.title}</span>
            <button className="ml-2 hover:text-red-400">×</button>
          </div>
        ))}
        <button className="text-gray-400 hover:text-white px-2">+</button>
      </div>
    </div>
  );
};

// Main Google Landing Page
const GoogleLandingPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [placeholder, setPlaceholder] = useState(pageData.components.searchBar.placeholderOptions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const options = pageData.components.searchBar.placeholderOptions;
      setPlaceholder(options[Math.floor(Math.random() * options.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Browser Header */}
      <BrowserHeader
        controls={pageData.components.browserControls}
        urlBar={pageData.components.urlBar}
        recentTabs={pageData.components.recentTabs}
        user={pageData.meta.user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm hover:underline">Gmail</a>
            <a href="#" className="text-sm hover:underline">Images</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full" title="Google apps">
              ⋮⋮⋮
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-semibold text-white cursor-pointer">
              {pageData.meta.user.name.charAt(0)}
            </div>
          </div>
        </nav>

        {/* Google Logo & Search */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
          {/* Google Logo */}
          <div className="mb-8">
            <svg className="w-72 h-24" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="70" fontSize="80" fontWeight="bold" fill="#4285F4">G</text>
              <text x="55" y="70" fontSize="80" fontWeight="bold" fill="#EA4335">o</text>
              <text x="110" y="70" fontSize="80" fontWeight="bold" fill="#FBBC04">o</text>
              <text x="165" y="70" fontSize="80" fontWeight="bold" fill="#4285F4">g</text>
              <text x="205" y="70" fontSize="80" fontWeight="bold" fill="#34A853">l</text>
              <text x="235" y="70" fontSize="80" fontWeight="bold" fill="#EA4335">e</text>
            </svg>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center border border-gray-300 rounded-full px-6 py-3 hover:shadow-lg transition-shadow">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={placeholder}
                className="flex-1 mx-4 outline-none text-base"
              />
              <svg className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
              <svg className="w-6 h-6 text-blue-500 ml-3 cursor-pointer hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            {pageData.components.primaryActions.map((action) => (
              <button
                key={action.id}
                className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Top Searches */}
          <div className="w-full max-w-2xl mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Trending Searches:</h3>
            <div className="flex flex-wrap gap-2">
              {pageData.components.topSearches.map((search, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition"
                >
                  {search}
                </a>
              ))}
            </div>
          </div>

          {/* Trending News */}
          <div className="w-full max-w-4xl">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Trending News</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pageData.components.trendingNews.map((news, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">{news.headline}</p>
                    <p className="text-xs text-gray-500">{news.src}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 border-t border-gray-300">
          <div className="px-6 py-3 border-b border-gray-300">
            <p className="text-sm text-gray-600">{pageData.components.footer.region}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3 gap-4">
            <div className="flex flex-wrap gap-6">
              {pageData.components.footer.leftLinks.map((link, idx) => (
                <a key={idx} href="#" className="text-sm text-gray-600 hover:underline">
                  {link}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-6">
              {pageData.components.footer.rightLinks.map((link, idx) => (
                <a key={idx} href="#" className="text-sm text-gray-600 hover:underline">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Render App
ReactDOM.render(<GoogleLandingPage />, document.getElementById('root'));

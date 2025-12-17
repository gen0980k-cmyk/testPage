import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  
  const tabs = [
    'おすすめ',
    'フォロー中',
    'トレンド',
    'ビジネス',
    'テクノロジー',
    'エンタメ',
    'ライフスタイル',
    'クリエイター'
  ]

  const articles = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200/41b883/fff?text=Article+1',
      title: 'Reactで作るモダンなWebアプリケーション',
      author: '山田太郎',
      likes: 245,
      date: '2023年12月15日'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200/42b983/fff?text=Article+2',
      title: 'デザインシステムの構築と運用',
      author: '佐藤花子',
      likes: 189,
      date: '2023年12月14日'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x200/35495e/fff?text=Article+3',
      title: 'フロントエンド開発の最新トレンド',
      author: '鈴木一郎',
      likes: 432,
      date: '2023年12月13日'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/300x200/646cff/fff?text=Article+4',
      title: 'ユーザー体験を向上させるUI設計',
      author: '田中美咲',
      likes: 312,
      date: '2023年12月12日'
    }
  ]

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">note</h1>
          <nav className="nav-tabs">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="content-container">
          <h2 className="section-title">新着記事＞</h2>
          <div className="articles-grid">
            {articles.map((article) => (
              <article key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-author">{article.author}</p>
                  <div className="article-footer">
                    <span className="article-likes">♥ {article.likes}</span>
                    <span className="article-date">{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

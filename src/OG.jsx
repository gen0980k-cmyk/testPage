// import { Link } from 'react-router-dom'

// function  OG() {
//   return (
//     <>
//       <h1>OG</h1>
//       <p>This is OG page.</p>
//       <Link to="/">Go back to Home</Link>
//     </>
//   );
// }

// export default OG;

import { Link } from "react-router-dom";
import "./OG.css"; // スタイルを適用

function OG() {
  return (
    <div className="portfolio">
      <h1 className="title">不都合嘉智のポートフォリオ</h1>
      <p className="intro">医療機器向けアプリ開発を中心に活動しています。</p>

      <section className="skills">
        <h2>技術スキル</h2>
        <ul>
          <li>C# - 業務アプリケーション開発</li>
          <li>C++ - 高速処理や組込み系</li>
          <li>React + Vite - Webアプリ開発</li>
          <li>WSL(Ubuntu)環境での開発</li>
        </ul>
      </section>

      <section className="projects">
        <h2>プロジェクト例</h2>
        <p>SPA構築やAPI通信を組み込んだCSRアプリなどを開発。</p>
      </section>

      <nav>
        <Link to="/" className="back-link">🏠 ホームへ戻る</Link>
      </nav>
    </div>
  );
}

export default OG;
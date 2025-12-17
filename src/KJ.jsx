/*
import { Link } from 'react-router-dom'

function  KJ() {
  return (
  <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ネットワークとAWSの学習記録</h1>

      <ul className="space-y-3">
        <li>
          ネットワークの基礎を学ぶ
        </li>
        <li>
          <Link className="text-blue-600" to="/aws-httpd">
             AWSでLinuxサーバーを立ててhttpdを動かす
          </Link>
        </li>
      </ul>
    
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <h2 className="text-xl font-bold mb-4">
        AWSでLinuxサーバーを立てて httpd を動かす手順
      </h2>

      {/*<p>ここに手順を書いていきます。</p>*/
/*
      <ol className="list-decimal ml-4 mt-4 space-y-2">
        <li>EC2インスタンスを作成する</li>
        <li>SSHでログインする</li>
        <li>httpdをインストールする</li>
        <li>ブラウザで確認する</li>
      </ol>
    </div>
  );
}


export default KJ;
*/

import { Link } from "react-router-dom";
import "./KJ.css"; // ← 追加

function KJ() {
  return (
    <div className="kj-container">
      <div className="kj-hero">
        <h1>ネットワークとAWSの学習記録</h1>
        <p>これまで学んだこと・ハンズオンの記録をまとめるサイト</p>
      </div>

      <ul className="kj-list">
        <li className="kj-card">
          <a
            href="https://qiita.com/tomato15/items/0a012033da01de478492"
            target="_blank"
            rel="noopener noreferrer"
            className="kj-link"
          >
             ネットワークの基礎を学ぶ（外部サイト）
          </a>
        </li>
        <li className="kj-card">
          <a href="#aws-steps"  className="kj-link">
            AWSでLinuxサーバーを立てて httpd を動かす
          </a>
        </li>
      </ul>

      {/*<div className="kj-space"></div>
      <div className="kj-divider"></div>
*/}

      <div id="aws-steps" className="kj-hero">
        <h1>AWSでLinuxサーバーを立てて httpd を動かす手順</h1>
      </div>

      <div className="kj-card kj-steps">
        <ol>
          <li>EC2インスタンスを作成する</li>
          <li>SSHでログインする</li>
          <li>httpdをインストールする</li>
          <li>ブラウザで確認する</li>
        </ol>
      </div>
    </div>

    );
}

export default KJ;

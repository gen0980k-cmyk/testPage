import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import { useState, useEffect, useRef } from 'react'
import './SK.css' // CSSファイルをインポート
import { MenuButton } from './MenuButton' // 作成したMenuButtonをインポート
import { SidePanel } from './SidePanel' // 作成したSidePanelをインポート

function SK() {
  // サビの開始時間と終了時間を秒で定義します（動画に合わせて調整してください）
  const SABI_START_TIME = 64
  const SABI_END_TIME = 90

  const [isMenuOpen, setIsMenuOpen] = useState(false); // メニューの開閉状態
  const [time, setTime] = useState(0)
  const playerRef = useRef(null)

  // YouTubeプレーヤーの準備ができたら呼ばれる
  const onReady = (event) => {
    playerRef.current = event.target
  }

  useEffect(() => {
    // 100ミリ秒ごとに動画の再生時間を取得してstateを更新する
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        setTime(playerRef.current.getCurrentTime())
      }
    }, 100)

    // コンポーネントが不要になったら、intervalを停止してメモリリークを防ぐ
    return () => {
      clearInterval(interval)
    }
  }, [])

  // 表示するアニメーション要素を決定する
  const renderAnimation = () => {
    const isSabi = time >= SABI_START_TIME && time < SABI_END_TIME

    if (isSabi) {
      // サビの場合：大きさの違うハートを0.25秒ごとに交互に表示
      const isBigHeart = Math.floor(time * 4) % 2 === 0
      return (
        <span style={{ fontSize: isBigHeart ? '4rem' : '2.5rem', color: 'hotpink', transition: 'font-size 0.1s' }}>
          ♥
        </span>
      )
    } else {
      // サビ以外の場合：〇と×を0.5秒ごとに交互に表示
      const isFirst = Math.floor(time * 2) % 2 === 0
      return <span style={{ fontSize: '3rem' }}>{isFirst ? '〇' : '×'}</span>
    }
  }

  return (
    <>
      {/* メニューボタンとサイドパネル */}
      <MenuButton isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <SidePanel isOpen={isMenuOpen} />

      <h1>SK</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* 左側: YouTube動画 */}
        <YouTube videoId="F3P8vcZkIh4" onReady={onReady} />
        {/* 右側: アニメーションと時間表示 */}
        <div style={{ width: '150px', textAlign: 'center' }}>
          {renderAnimation()}
          <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>再生時間: {time.toFixed(2)}秒</p>
        </div>
      </div>

      <Link to="/">Go back to Home</Link>
    </>
  )
}

export default SK

import { useState, useEffect } from 'react'
import './App.css'

// 勝敗判定パターン（縦・横・斜め）
const WINNING_PATTERNS = [
  [0, 1, 2], // 横1行目
  [3, 4, 5], // 横2行目
  [6, 7, 8], // 横3行目
  [0, 3, 6], // 縦1列目
  [1, 4, 7], // 縦2列目
  [2, 5, 8], // 縦3列目
  [0, 4, 8], // 斜め左上→右下
  [2, 4, 6], // 斜め右上→左下
]

function App() {
  // 盤面の状態: nullは空マス、'○'または'×'が入る
  const [board, setBoard] = useState(Array(9).fill(null))
  
  // 各マスに記号が置かれたターン番号を記録（nullは未配置）
  const [placedTurns, setPlacedTurns] = useState(Array(9).fill(null))
  
  // 現在のターン番号（1から開始）
  const [turn, setTurn] = useState(1)
  
  // 現在のプレイヤー（'○'または'×'）
  const [currentPlayer, setCurrentPlayer] = useState('○')
  
  // ゲーム状態（'playing', 'win-○', 'win-×', 'draw'）
  const [gameStatus, setGameStatus] = useState('playing')

  // ターンが変わるたびに記号が消える処理を実行
  useEffect(() => {
    if (turn === 1) return // 初回は処理しない
    
    removeExpiredMarks()
  }, [turn])

  // 8ターン経過した記号を消す処理
  const removeExpiredMarks = () => {
    const newBoard = [...board]
    const newPlacedTurns = [...placedTurns]
    
    for (let i = 0; i < 9; i++) {
      // 記号が置かれていて、8ターン以上経過していたら消す
      if (placedTurns[i] !== null && turn - placedTurns[i] >= 8) {
        newBoard[i] = null
        newPlacedTurns[i] = null
      }
    }
    
    setBoard(newBoard)
    setPlacedTurns(newPlacedTurns)
    
    // 記号が消えた後の盤面で勝敗判定
    checkWinner(newBoard)
  }

  // マスをクリックしたときの処理
  const handleClick = (index) => {
    // ゲームが終了している、またはすでに記号が置かれている場合は何もしない
    if (gameStatus !== 'playing' || board[index] !== null) {
      return
    }

    // 記号を配置
    const newBoard = [...board]
    const newPlacedTurns = [...placedTurns]
    
    newBoard[index] = currentPlayer
    newPlacedTurns[index] = turn
    
    setBoard(newBoard)
    setPlacedTurns(newPlacedTurns)
    
    // 勝敗判定（配置直後の盤面）
    const winner = checkWinner(newBoard)
    
    if (!winner) {
      // 次のプレイヤーへ交代
      setCurrentPlayer(currentPlayer === '○' ? '×' : '○')
      setTurn(turn + 1)
    }
  }

  // 勝敗判定
  const checkWinner = (currentBoard) => {
    // 各パターンをチェック
    for (const pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern
      
      if (
        currentBoard[a] !== null &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setGameStatus(`win-${currentBoard[a]}`)
        return currentBoard[a]
      }
    }
    
    // 引き分け判定（全マス埋まっている）
    if (currentBoard.every(cell => cell !== null)) {
      setGameStatus('draw')
      return 'draw'
    }
    
    return null
  }

  // ゲームをリセット
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setPlacedTurns(Array(9).fill(null))
    setTurn(1)
    setCurrentPlayer('○')
    setGameStatus('playing')
  }

  // ゲーム状態メッセージを取得
  const getStatusMessage = () => {
    if (gameStatus === 'win-○') return '○の勝ち！'
    if (gameStatus === 'win-×') return '×の勝ち！'
    if (gameStatus === 'draw') return '引き分け'
    return `現在のプレイヤー: ${currentPlayer}`
  }

  return (
    <div className="game-container">
      <h1 className="game-title">消える○×ゲーム</h1>
      
      <div className="game-info">
        <div className="status-message">{getStatusMessage()}</div>
        <div className="turn-counter">ターン: {turn}</div>
      </div>

      <div className="board">
        {board.map((cell, index) => {
          // 次のターンで消えるかどうかを判定
          const willDisappear = placedTurns[index] !== null && turn - placedTurns[index] === 7
          
          return (
            <button
              key={index}
              className={`cell ${cell ? 'filled' : ''} ${willDisappear ? 'will-disappear' : ''} ${cell === '○' ? 'circle' : cell === '×' ? 'cross' : ''}`}
              onClick={() => handleClick(index)}
              disabled={gameStatus !== 'playing'}
            >
              {cell}
            </button>
          )
        })}
      </div>

      <div className="game-rules">
        <h3>ルール</h3>
        <ul>
          <li>3×3のマス目に○と×を交互に配置します</li>
          <li>縦・横・斜めのいずれかに3つ並べると勝利</li>
          <li>配置した記号は8ターン後に自動的に消えます</li>
          <li>記号が消えた後の盤面で勝敗判定が行われます</li>
        </ul>
      </div>

      {gameStatus !== 'playing' && (
        <button className="reset-button" onClick={resetGame}>
          もう一度プレイ
        </button>
      )}
    </div>
  )
}

export default App

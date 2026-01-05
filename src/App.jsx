import { useState, useEffect } from 'react'
import './App.css'

// 円形UIアイコンコンポーネント
const CircleIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" className="circle-icon">
    <g transform="translate(50, 50)">
      {/* 4つのシアンの曲線セグメント */}
      <path
        d="M 0,-35 A 35,35 0 0,1 24.7,-24.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(0)"
      />
      <path
        d="M 0,-35 A 35,35 0 0,1 24.7,-24.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(90)"
      />
      <path
        d="M 0,-35 A 35,35 0 0,1 24.7,-24.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(180)"
      />
      <path
        d="M 0,-35 A 35,35 0 0,1 24.7,-24.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        transform="rotate(270)"
      />
    </g>
  </svg>
)

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
  // ゲームモード（'menu', 'vsPlayer', 'vsCPU'）
  const [gameMode, setGameMode] = useState('menu')
  
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
  
  // 勝利したマスのインデックス
  const [winningCells, setWinningCells] = useState([])

  // ターンが変わるたびに記号が消える処理を実行
  useEffect(() => {
    if (turn === 1) return // 初回は処理しない
    
    removeExpiredMarks()
  }, [turn])

  // CPUのターンを自動実行
  useEffect(() => {
    if (gameMode === 'vsCPU' && currentPlayer === '×' && gameStatus === 'playing') {
      // 少し遅延を入れて自然な動きにする
      const timer = setTimeout(() => {
        cpuMove()
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, gameStatus, gameMode, board])

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
    // CPUモードでCPUのターンの場合は何もしない
    if (gameMode === 'vsCPU' && currentPlayer === '×') {
      return
    }
    
    // ゲームが終了している、またはすでに記号が置かれている場合は何もしない
    if (gameStatus !== 'playing' || board[index] !== null) {
      return
    }

    placeMark(index)
  }

  // 記号を配置する共通処理
  const placeMark = (index) => {
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

  // CPU思考ロジック
  const cpuMove = () => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(i => i !== null)
    
    if (availableMoves.length === 0) return

    // 1. 勝てる手があれば勝つ
    const winningMove = findWinningMove('×')
    if (winningMove !== -1) {
      placeMark(winningMove)
      return
    }

    // 2. 相手が次に勝てる手をブロック
    const blockingMove = findWinningMove('○')
    if (blockingMove !== -1) {
      placeMark(blockingMove)
      return
    }

    // 3. 戦略的な手を選ぶ（中央 > 角 > 辺）
    const strategicMove = findStrategicMove(availableMoves)
    placeMark(strategicMove)
  }

  // 勝てる手を探す
  const findWinningMove = (player) => {
    for (const pattern of WINNING_PATTERNS) {
      const [a, b, c] = pattern
      const values = [board[a], board[b], board[c]]
      
      // 2つが指定プレイヤーで1つが空いている場合
      if (values.filter(v => v === player).length === 2 && values.filter(v => v === null).length === 1) {
        if (board[a] === null) return a
        if (board[b] === null) return b
        if (board[c] === null) return c
      }
    }
    return -1
  }

  // 戦略的な手を選ぶ
  const findStrategicMove = (availableMoves) => {
    // 優先順位: 中央 > 角 > 辺
    const center = 4
    const corners = [0, 2, 6, 8]
    const edges = [1, 3, 5, 7]

    // 中央が空いていれば中央を選ぶ
    if (availableMoves.includes(center)) {
      return center
    }

    // 角の中からランダムに選ぶ（少しランダム性を持たせる）
    const availableCorners = corners.filter(c => availableMoves.includes(c))
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)]
    }

    // 辺の中からランダムに選ぶ
    const availableEdges = edges.filter(e => availableMoves.includes(e))
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)]
    }

    // それでもなければ最初の空きマスを選ぶ
    return availableMoves[0]
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
        setWinningCells([a, b, c])
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
    setWinningCells([])
  }

  // メニューに戻る
  const backToMenu = () => {
    resetGame()
    setGameMode('menu')
  }

  // ゲーム開始
  const startGame = (mode) => {
    resetGame()
    setGameMode(mode)
  }

  // ゲーム状態メッセージを取得
  const getStatusMessage = () => {
    if (gameStatus === 'win-○') return '○の勝ち！'
    if (gameStatus === 'win-×') {
      return gameMode === 'vsCPU' ? 'CPUの勝ち...' : '×の勝ち！'
    }
    if (gameStatus === 'draw') return '引き分け'
    if (gameMode === 'vsCPU' && currentPlayer === '×') return 'CPUが考え中...'
    return `現在のプレイヤー: ${currentPlayer}`
  }

  // モード選択画面
  if (gameMode === 'menu') {
    return (
      <div className="game-container">
        <h1 className="game-title">消える○×ゲーム</h1>
        
        <div className="mode-selection">
          <h2>モードを選択してください</h2>
          <button className="mode-button" onClick={() => startGame('vsPlayer')}>
            👥 2人対戦
          </button>
          <button className="mode-button cpu" onClick={() => startGame('vsCPU')}>
            🤖 CPU対戦
          </button>
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
      </div>
    )
  }

  return (
    <div className="game-container">
      <h1 className="game-title">消える○×ゲーム</h1>
      
      <div className="mode-indicator">
        {gameMode === 'vsCPU' ? '🤖 CPU対戦モード' : '👥 2人対戦モード'}
      </div>
      
      <div className="game-info">
        <div className="status-message">{getStatusMessage()}</div>
        <div className="turn-counter">ターン: {turn}</div>
      </div>

      <div className="board">
        {board.map((cell, index) => {
          // 次のターンで消えるかどうかを判定
          const willDisappear = placedTurns[index] !== null && turn - placedTurns[index] === 7
          const isWinningCell = winningCells.includes(index)
          
          return (
            <button
              key={index}
              className={`cell ${cell ? 'filled' : ''} ${willDisappear ? 'will-disappear' : ''} ${cell === '○' ? 'circle' : cell === '×' ? 'cross' : ''} ${isWinningCell ? 'winning' : ''}`}
              onClick={() => handleClick(index)}
              disabled={gameStatus !== 'playing' || (gameMode === 'vsCPU' && currentPlayer === '×')}
            >
              {cell === '○' ? <CircleIcon /> : cell}
            </button>
          )
        })}
      </div>

      <div className="button-group">
        {gameStatus !== 'playing' && (
          <button className="reset-button" onClick={resetGame}>
            もう一度プレイ
          </button>
        )}
        <button className="menu-button" onClick={backToMenu}>
          メニューに戻る
        </button>
      </div>
    </div>
  )
}

export default App

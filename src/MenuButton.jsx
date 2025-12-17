import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 1本の線を描画するためのコンポーネント
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)" // 線の色
    strokeLinecap="round"
    {...props}
  />
);

export const MenuButton = ({ isOpen, setIsOpen }) => {
  return (
    <motion.button
      onClick={() => setIsOpen(!isOpen)} // propsで受け取った関数を呼び出す
      animate={isOpen ? "open" : "closed"}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 20,
      }}
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        {/* 上の線: 閉じた状態から開いた状態（×の上半分）へ */}
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" }
          }}
        />
        {/* 真ん中の線: 閉じた状態では表示、開いた状態では透明に */}
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        {/* 下の線: 閉じた状態から開いた状態（×の下半分）へ */}
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" }
          }}
        />
      </svg>
    </motion.button>
  );
};
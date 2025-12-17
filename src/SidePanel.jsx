import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  open: {
    x: 'calc(100vw / 3)', // 画面の右から1/3の位置までスライドイン
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  closed: {
    x: '100vw', // 画面の右外に隠れる
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

export const SidePanel = ({ isOpen }) => {
  return (
    <motion.div
      initial={false} // 初期アニメーションは不要
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'calc(100vw / 3 * 2)', // 画面幅の2/3の幅
        height: '100vh',
        backgroundColor: 'rgba(236, 90, 151, 0.8)', // 少し透明な青色
        clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)', // 台形の形
        zIndex: 10 // 他の要素より手前に表示
      }}
    />
  );
};
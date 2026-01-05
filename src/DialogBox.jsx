import React, { useState, useEffect } from 'react';
import PixelPanel from './PixelPanel';

// ✨ 修改点 1：在参数里增加了一个 customAvatar (自定义头像)
const DialogBox = ({ name, text, onNext, isLast, customAvatar }) => {
  
  // ✨ 修改点 2：判断头像逻辑
  // 如果外面传入了 customAvatar，就用传入的图片；
  // 如果没传，还是像以前一样用 name 生成像素小人。
  const avatarUrl = customAvatar || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`;
  
  // === 打字机逻辑保持不变 ===
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  // =======================

  return (
    <div onClick={onNext} style={{ cursor: 'pointer', userSelect: 'none' }}>
      <PixelPanel style={{ 
        display: 'flex', gap: '20px', alignItems: 'flex-start', minHeight: '120px'
      }}>
        <div style={{
          width: '80px', height: '80px', backgroundColor: '#d9a066', 
          border: '4px solid #583220', flexShrink: 0, overflow: 'hidden'
        }}>
          {/* 使用最终计算出来的 avatarUrl */}
          <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ color: '#8b0000', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.2rem' }}>
            {name}
          </div>
          <p style={{ margin: 0, lineHeight: '1.5', minHeight: '3rem' }}>
            {displayedText}
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          </p>
          {displayedText.length === text.length && (
            <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '10px', opacity: 0.6, animation: 'bounce 0.5s infinite alternate' }}>
              {isLast ? "■ 结束" : "▼ 点击继续"}
            </div>
          )}
        </div>
      </PixelPanel>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(3px); } }
      `}</style>
    </div>
  );
};

export default DialogBox;
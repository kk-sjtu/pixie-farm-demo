import React, { useState, useEffect } from 'react';
import PixelPanel from './PixelPanel';

const DialogBox = ({ name, text, onNext, isLast, customAvatar }) => {
  const avatarUrl = customAvatar || `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`;
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText(''); // 清空
    const timer = setInterval(() => {
      i++;
      // ✅ 使用 slice 切片，这是修复吞字、乱序的关键！
      setDisplayedText(text.slice(0, i)); 
      
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, 30); // 打字速度 30ms
    return () => clearInterval(timer);
  }, [text]);

  return (
    <div onClick={onNext} style={{ cursor: 'pointer', userSelect: 'none' }}>
      <PixelPanel style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', minHeight: '120px' }}>
        <div style={{ width: '80px', height: '80px', backgroundColor: '#d9a066', border: '4px solid #583220', flexShrink: 0, overflow: 'hidden' }}>
          <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#8b0000', fontWeight: 'bold', marginBottom: '8px', fontSize: '1.2rem' }}>{name}</div>
          <p style={{ margin: 0, lineHeight: '1.5', minHeight: '3rem' }}>
            {displayedText}
            <span style={{ animation: 'blink 1s infinite', marginLeft: '2px' }}>|</span>
          </p>
          {displayedText.length === text.length && (
            <div style={{ textAlign: 'right', fontSize: '0.8rem', marginTop: '10px', opacity: 0.6, animation: 'bounce 0.5s infinite alternate' }}>
              {isLast ? "■" : "▼"}
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
import React, { useEffect, useState } from 'react';

const PixelTV = ({ content, isActive }) => {
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowScreen(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowScreen(false);
    }
  }, [isActive]);

  return (
    <div className="tv-structure">
      <div className="lcd-frame">
        <div className={`lcd-screen ${isActive ? 'on' : 'off'}`}>
          {isActive && showScreen && (
            <div className="screen-content-wrapper">
              {content}
            </div>
          )}
          <div className="scanlines"></div>
          <div className="glare"></div>
        </div>
        
        <div className="lcd-bottom-bar">
           <div className={`power-light ${isActive ? 'on' : ''}`}></div>
           <div className="brand-logo">PIXEL MAX</div>
        </div>
      </div>
      
      <div className="lcd-stand"></div>

      <style>{`
        .tv-structure {
          position: relative;
          display: flex; flex-direction: column; align-items: center;
        }

        /* === ✨ 修改点：尺寸升级 === */
        .lcd-frame {
          width: 880px;  /* 从 720px -> 880px */
          height: 520px; /* 从 420px -> 520px */
          background: #5d3a24;
          border: 14px solid #3e2723; /* 边框也加粗一点 */
          border-radius: 6px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.6);
          padding: 14px;
          box-sizing: border-box;
          display: flex; flex-direction: column;
        }

        .lcd-screen {
          flex: 1;
          background: #1a1a1a;
          position: relative;
          overflow: hidden;
          transition: all 0.5s ease;
          border: 2px solid #2d1b15;
        }

        .lcd-screen.on {
          background: #fff8e1;
          box-shadow: inset 0 0 50px rgba(0,0,0,0.1);
        }

        .screen-content-wrapper {
          width: 100%; height: 100%;
          padding: 30px; /* 内边距加大 */
          box-sizing: border-box;
          overflow-y: auto;
          font-family: 'VT323', monospace;
          color: #3e2723;
          font-size: 1.3rem; /* 字体稍微放大 */
        }
        
        /* 滚动条 */
        .screen-content-wrapper::-webkit-scrollbar { width: 12px; }
        .screen-content-wrapper::-webkit-scrollbar-track { background: #eac285; }
        .screen-content-wrapper::-webkit-scrollbar-thumb { background: #8b5a2b; border: 2px solid #eac285; }

        .scanlines {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.05));
          background-size: 100% 4px; pointer-events: none; z-index: 10;
        }
        .glare {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 100%);
          pointer-events: none; z-index: 11;
        }

        .lcd-bottom-bar {
          height: 36px;
          background: #4a2e22;
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .power-light { position: absolute; right: 25px; width: 10px; height: 10px; background: #333; border-radius: 50%; }
        .power-light.on { background: #4caf50; box-shadow: 0 0 8px #4caf50; }
        .brand-logo { color: #8b5a2b; font-size: 0.9rem; letter-spacing: 3px; font-weight: bold; opacity: 0.7; }

        /* 底座加宽 */
        .lcd-stand {
          width: 260px; height: 18px;
          background: #3e2723;
          clip-path: polygon(10% 0, 90% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default PixelTV;
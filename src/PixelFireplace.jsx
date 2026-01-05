import React from 'react';

const PixelFireplace = () => {
  // 生成一些随机的火焰粒子
  const particles = Array.from({ length: 12 });

  return (
    <div className="fireplace-wrapper">
      {/* 砖块结构 */}
      <div className="chimney-top"></div>
      <div className="hearth">
        
        {/* 燃烧的木头 */}
        <div className="logs">
          <div className="log log-1"></div>
          <div className="log log-2"></div>
        </div>

        {/* 火焰粒子容器 */}
        <div className="fire-container">
          {particles.map((_, i) => (
            <div key={i} className={`pixel-fire f-${i}`}></div>
          ))}
          <div className="fire-glow-center"></div>
        </div>

      </div>
      <div className="hearth-base"></div>

      <style>{`
        .fireplace-wrapper {
          position: relative;
          width: 200px; /* 壁炉整体宽度 */
          margin: 20px auto 0; /* 居中 */
          display: flex; flex-direction: column; align-items: center;
          image-rendering: pixelated;
        }

        /* === 1. 结构部分：砖块风格 === */
        .chimney-top {
          width: 180px; height: 16px;
          background: #5d3a24;
          border: 4px solid #3e2723;
          border-bottom: none;
          box-shadow: inset 0 4px 0 rgba(255,255,255,0.1);
        }

        .hearth {
          position: relative;
          width: 160px; height: 100px;
          background-color: #261a14; /* 炉膛深色背景 */
          border: 8px solid #5d3a24; /* 砖块外框 */
          border-bottom: none;
          box-shadow: inset 0 0 20px #000; /* 内部阴影 */
          display: flex; justify-content: center; align-items: flex-end;
          overflow: hidden;
        }

        .hearth-base {
          width: 210px; height: 20px;
          background: #3e2723;
          border: 4px solid #261a14;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        /* === 2. 木头 === */
        .logs {
          position: absolute; bottom: 4px;
          display: flex; gap: 4px; z-index: 5;
        }
        .log {
          width: 40px; height: 12px;
          background: #4a332a;
          border: 2px solid #281812;
          border-radius: 4px;
        }
        .log-1 { transform: rotate(-10deg); }
        .log-2 { transform: rotate(10deg) translate(-5px, 2px); }

        /* === 3. 像素火焰动画 (核心) === */
        .fire-container {
          position: absolute; bottom: 10px;
          width: 100%; height: 100%;
          display: flex; justify-content: center;
        }

        .pixel-fire {
          position: absolute; bottom: 0;
          width: 8px; height: 8px;
          background-color: #ff9800;
          opacity: 0;
          /* 动画：向上飘动 + 变色 */
          animation: rise 1s infinite linear;
        }

        /* 不同的粒子有不同的随机位置和速度 */
        .f-0 { left: 40%; animation-duration: 1.2s; animation-delay: 0.1s; }
        .f-1 { left: 45%; animation-duration: 0.8s; animation-delay: 0.3s; }
        .f-2 { left: 50%; animation-duration: 1.5s; animation-delay: 0.5s; }
        .f-3 { left: 55%; animation-duration: 1.0s; animation-delay: 0.2s; }
        .f-4 { left: 42%; animation-duration: 1.3s; animation-delay: 0.7s; }
        .f-5 { left: 52%; animation-duration: 0.9s; animation-delay: 0.4s; }
        .f-6 { left: 48%; animation-duration: 1.1s; animation-delay: 0s; }
        
        /* 核心光晕 */
        .fire-glow-center {
          position: absolute; bottom: 0;
          width: 60px; height: 40px;
          background: radial-gradient(circle, rgba(255,87,34,0.8) 0%, rgba(255,87,34,0) 70%);
          animation: flicker 0.2s infinite alternate; /* 快速闪烁 */
        }

        @keyframes rise {
          0% { 
            transform: translateY(0) scale(1); 
            background-color: #ffeb3b; /* 黄色核心 */
            opacity: 1; 
          }
          50% { 
            background-color: #ff9800; /* 橙色中间 */
            opacity: 0.8; 
          }
          100% { 
            transform: translateY(-50px) scale(0.2); 
            background-color: #f44336; /* 红色顶端 */
            opacity: 0; 
          }
        }

        @keyframes flicker {
          0% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default PixelFireplace;
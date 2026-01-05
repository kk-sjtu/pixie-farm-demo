import React from 'react';

const PixelCottage = ({ onClick }) => {
  return (
    <div className="cottage-wrapper" onClick={onClick}>
      
      {/* 全局噪点层 (保持不变，用于统一质感) */}
      <div className="pixel-noise-overlay"></div>

      {/* === 屋顶结构 (双层设计) === */}
      <div className="roof-section">
        {/* 烟囱 */}
        <div className="chimney">
          <div className="smoke p1"></div>
          <div className="smoke p2"></div>
        </div>

        {/* 主屋顶 (后层) */}
        <div className="main-roof-block">
           <div className="roof-shingles-texture"></div>
           <div className="roof-snow-cap"></div>
        </div>
        
        {/* 阁楼窗 */}
        <div className="dormer">
           <div className="dormer-roof"></div>
           <div className="dormer-window-glass"></div>
        </div>

        {/* 门廊屋顶 (前层) */}
        <div className="porch-roof-block">
           <div className="roof-shingles-texture"></div>
           <div className="roof-snow-cap small"></div>
        </div>
      </div>

      {/* === 房屋主体 === */}
      <div className="house-body-section">
        {/* 屋檐阴影 */}
        <div className="eaves-shadow-main"></div>
        <div className="eaves-shadow-porch"></div>
        
        {/* 墙壁纹理 */}
        <div className="wall-texture-layer"></div>

        {/* 左侧窗户 */}
        <div className="cozy-window left">
          <div className="window-frame-outer">
            <div className="window-glass-warm">
               <div className="muntin-bar horizontal"></div>
               <div className="muntin-bar vertical"></div>
            </div>
          </div>
          <div className="window-sill"></div>
        </div>

        {/* 门与门廊区域 */}
        <div className="porch-entry">
          <div className="sturdy-door">
            <div className="door-panel-top">
              <div className="door-window-small"></div>
            </div>
            <div className="door-panel-bottom">
              <div className="door-handle"></div>
            </div>
          </div>
        </div>

        {/* 右侧窗户 (新增，保持平衡) */}
        <div className="cozy-window right">
          <div className="window-frame-outer">
            <div className="window-glass-warm">
               <div className="muntin-bar horizontal"></div>
               <div className="muntin-bar vertical"></div>
            </div>
          </div>
          <div className="window-sill"></div>
        </div>

      </div>

      {/* 地基与台阶 */}
      <div className="foundation-section">
         <div className="foundation-stones"></div>
         <div className="porch-steps-base"></div>
      </div>

      <div className="tooltip">进入我的庄园</div>

      <style>{`
        :root {
          --p: 4px;
          
          /* --- 全新调和配色 --- */
          --c-outline: #2a1810; /* 更深的轮廓 */
          /* 屋顶：深红砖色 */
          --c-roof-base: #8a3a2b;
          --c-roof-shadow: #692d21;
          /* 墙壁：暖木色 */
          --c-wall-base: #c28a5d;
          --c-wall-shadow: #a3724b;
          /* 木结构：深咖啡色 */
          --c-wood-trim: #523223;
          --c-wood-dark: #3d251a;
          /* 灯光 */
          --c-light-warm: #ffcc66;
          --c-light-hot: #ffe3a0;
          /* 积雪 */
          --c-snow: #e8f3f7;
          --c-snow-shadow: #c5dbe6;
          /* 石头 */
          --c-stone: #6a7b8c;
        }

        .cottage-wrapper {
          position: relative; display: flex; flex-direction: column; align-items: center;
          /* 核心：放大到 1.6 倍！ */
          transform: scale(1.6); transform-origin: bottom center;
          cursor: pointer; image-rendering: pixelated;
          filter: drop-shadow(0 6px 0 rgba(0,0,0,0.2));
        }
        
        .pixel-noise-overlay {
          position: absolute; top:0; left:0; width:100%; height:100%; z-index: 99; pointer-events: none; opacity: 0.1;
          background-image: repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 4px);
          mix-blend-mode: overlay;
        }

        /* 通用描边 */
        .chimney, .main-roof-block, .porch-roof-block, .dormer-roof, .house-body-section, .window-frame-outer, .sturdy-door, .foundation-stones, .porch-steps-base {
          border: var(--p) solid var(--c-outline);
        }

        /* === 屋顶结构 (双层) === */
        .roof-section { position: relative; width: calc(76 * var(--p)); height: calc(36 * var(--p)); z-index: 5; }
        
        /* 主屋顶 */
        .main-roof-block {
          position: absolute; top: 0; left: 0; width: 100%; height: calc(32 * var(--p));
          background: var(--c-roof-base);
          clip-path: polygon(50% 0, 100% 80%, 100% 100%, 0 100%, 0 80%);
        }
        /* 门廊屋顶 */
        .porch-roof-block {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
          width: calc(36 * var(--p)); height: calc(16 * var(--p));
          background: var(--c-roof-base); z-index: 6;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        
        /* 瓦片纹理 */
        .roof-shingles-texture {
           position: absolute; top:0; left:0; width:100%; height:100%;
           background-image: 
             repeating-linear-gradient(45deg, transparent 0, transparent calc(3*var(--p)), rgba(0,0,0,0.15) calc(3*var(--p)), rgba(0,0,0,0.15) calc(4*var(--p))),
             repeating-linear-gradient(-45deg, transparent 0, transparent calc(3*var(--p)), rgba(0,0,0,0.15) calc(3*var(--p)), rgba(0,0,0,0.15) calc(4*var(--p)));
        }
        /* 积雪盖 */
        .roof-snow-cap {
           position: absolute; top:0; left:0; width:100%; height:50%; background: var(--c-snow);
           -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 70%);
        }
        .roof-snow-cap.small { height: 40%; -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 60%); }

        /* 烟囱 */
        .chimney {
          position: absolute; right: calc(16*var(--p)); top: calc(-4*var(--p));
          width: calc(8*var(--p)); height: calc(16*var(--p));
          background: var(--c-wood-trim);
          background-image: linear-gradient(to right, rgba(0,0,0,0.2) var(--p), transparent var(--p)), linear-gradient(to bottom, rgba(0,0,0,0.2) var(--p), transparent var(--p));
          background-size: calc(4*var(--p)) calc(4*var(--p)); z-index: 4;
        }
        .smoke { position: absolute; width: calc(4*var(--p)); height: calc(4*var(--p)); background: white; opacity: 0.7; animation: rise 3s steps(4) infinite; border-radius: 2px; }
        .p1 { top: calc(-4*var(--p)); left: 0; } .p2 { top: calc(-8*var(--p)); left: 4px; animation-delay: 1.5s; }

        /* 阁楼窗 */
        .dormer {
          position: absolute; left: 50%; top: calc(8*var(--p)); transform: translateX(-50%);
          width: calc(12*var(--p)); height: calc(10*var(--p)); background: var(--c-wood-trim);
          z-index: 7; display: flex; justify-content: center; align-items: flex-end;
          padding-bottom: var(--p); box-sizing: border-box; border: var(--p) solid var(--c-outline); border-top: none;
        }
        .dormer-roof {
          position: absolute; top: calc(-5*var(--p)); left: calc(-2*var(--p)); width: calc(14*var(--p)); height: calc(6*var(--p));
          background: var(--c-roof-shadow); clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }
        .dormer-window-glass { width: calc(6*var(--p)); height: calc(6*var(--p)); background: #37474f; border: var(--p) solid var(--c-outline); }


        /* === 房屋主体 === */
        .house-body-section {
          width: calc(70 * var(--p)); height: calc(36 * var(--p));
          background: var(--c-wall-base); margin-top: calc(-1 * var(--p));
          position: relative; display: flex; align-items: flex-end; justify-content: space-between;
          padding: 0 calc(6*var(--p)); padding-bottom: var(--p); box-sizing: border-box;
        }
        /* 屋檐阴影 */
        .eaves-shadow-main { position: absolute; top:0; left:0; width: 100%; height: calc(2*var(--p)); background: var(--c-outline); z-index: 4; }
        .eaves-shadow-porch { position: absolute; top:0; left: 50%; transform: translateX(-50%); width: calc(38*var(--p)); height: calc(3*var(--p)); background: var(--c-outline); z-index: 7; }

        /* 墙壁纹理 */
        .wall-texture-layer {
          position: absolute; top: calc(2*var(--p)); left:0; width: 100%; height: calc(100% - 2*var(--p));
          background-image: repeating-linear-gradient(to bottom, var(--c-wall-base) 0, var(--c-wall-base) calc(4*var(--p)), var(--c-wall-shadow) calc(4*var(--p)), var(--c-wall-shadow) calc(5*var(--p)));
          z-index: 0;
        }

        /* 窗户 */
        .cozy-window { position: relative; z-index: 5; bottom: calc(8*var(--p)); display: flex; flex-direction: column; align-items: center; }
        .window-frame-outer { width: calc(14*var(--p)); height: calc(16*var(--p)); background: var(--c-wood-trim); padding: var(--p); box-sizing: border-box; }
        .window-glass-warm { width: 100%; height: 100%; background: var(--c-light-warm); background-image: radial-gradient(circle at 50% 60%, var(--c-light-hot) 20%, var(--c-light-warm) 70%); position: relative; }
        .muntin-bar { position: absolute; background: var(--c-wood-trim); }
        .horizontal { width: 100%; height: var(--p); top: 50%; margin-top: calc(-0.5*var(--p)); }
        .vertical { height: 100%; width: var(--p); left: 50%; margin-left: calc(-0.5*var(--p)); }
        .window-sill { width: calc(16*var(--p)); height: calc(3*var(--p)); background: var(--c-wood-dark); border: var(--p) solid var(--c-outline); margin-top: calc(-1*var(--p)); }

        /* 门廊 */
        .porch-entry { position: relative; z-index: 8; display: flex; flex-direction: column; align-items: center; }
        .sturdy-door { width: calc(20*var(--p)); height: calc(26*var(--p)); background: var(--c-wood-dark); display: flex; flex-direction: column; }
        .door-panel-top { flex: 1; border-bottom: var(--p) solid var(--c-outline); position: relative; }
        .door-window-small { position: absolute; top: calc(3*var(--p)); left: 50%; transform: translateX(-50%); width: calc(8*var(--p)); height: calc(6*var(--p)); background: #4a6370; border: var(--p) solid var(--c-outline); }
        .door-panel-bottom { flex: 1.2; position: relative; background: repeating-linear-gradient(to right, transparent 0, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0.2) 5px); }
        .door-handle { position: absolute; right: calc(2*var(--p)); top: calc(4*var(--p)); width: calc(2*var(--p)); height: calc(4*var(--p)); background: var(--c-wood-trim); border: var(--p) solid #1a120b; }
        
        /* 地基与台阶 */
        .foundation-section {
           display: flex; flex-direction: column; align-items: center; margin-top: calc(-1*var(--p));
        }
        .foundation-stones {
          width: calc(72 * var(--p)); height: calc(6 * var(--p)); background: var(--c-stone);
          background-image: linear-gradient(to right, var(--c-outline) var(--p), transparent var(--p)), linear-gradient(to bottom, var(--c-outline) var(--p), transparent var(--p));
          background-size: calc(8*var(--p)) calc(6*var(--p));
        }
        .porch-steps-base {
           width: calc(24*var(--p)); height: calc(4*var(--p)); background: var(--c-wood-dark);
           margin-top: calc(-6*var(--p)); /* 向上提，盖住地基 */
           z-index: 9;
           background-image: repeating-linear-gradient(to bottom, transparent 0, transparent calc(2*var(--p)), rgba(0,0,0,0.3) calc(2*var(--p)), rgba(0,0,0,0.3) calc(2.5*var(--p)));
        }

        @keyframes rise { 0% { transform: translateY(0); opacity: 0.7; } 100% { transform: translateY(calc(-16*var(--p))); opacity: 0; } }
        .tooltip { position: absolute; top: -50px; background: var(--c-wall-base); color: var(--c-outline); padding: 4px 8px; border: var(--p) solid var(--c-outline); opacity: 0; pointer-events: none; transition: 0.1s; font-family: 'VT323'; }
        .cottage-wrapper:hover .tooltip { opacity: 1; top: -60px; }
        .cottage-wrapper:hover { transform: scale(1.65) translateY(-2px); }
      `}</style>
    </div>
  );
};

export default PixelCottage;
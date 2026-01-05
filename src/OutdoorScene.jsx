import React, { useState } from 'react';
import bgImage from './assets/cover-bg.jpg';
import DialogBox from './DialogBox';
import bunnyAvatarImg from './assets/小兔子.png';
const OutdoorScene = ({ onEnterHouse }) => {
  // === 状态管理 ===
  // 控制兔子对话框是否显示
  const [showBunnyDialog, setShowBunnyDialog] = useState(false);
  // 控制对话进行到第几句
  const [dialogStep, setDialogStep] = useState(0);

  // === 剧本配置 ===
  const bunnyScript = [
    "小兔子：咕咕...？(它抬头看了你一眼)",
    "小兔子：这房子看起来很暖和，但我更喜欢雪地。",
    "小兔子：如果你要进去的话，记得把门关好哦！"
  ];

  // === 交互逻辑 ===
  const handleBunnyClick = (e) => {
    e.stopPropagation(); // 防止点穿背景
    setShowBunnyDialog(true);
    setDialogStep(0);
  };

  const handleNextDialog = () => {
    if (dialogStep < bunnyScript.length - 1) {
      // 还有下一句，继续
      setDialogStep(dialogStep + 1);
    } else {
      // 没话说了，关闭对话框
      setShowBunnyDialog(false);
    }
  };

  return (
    <div className="scene-wrapper">
      <div className="game-viewport">
        <img src={bgImage} alt="Stardew Valley Scene" className="background-image" />
        {/* <img 
          src={bgImage} 
          alt="Stardew Valley Scene" 
          className="background-image"
          
          // === ✨ 新增：点击图片，打印坐标 ===
          onClick={(e) => {
            // 1. 获取图片在屏幕上的精确尺寸和位置
            const rect = e.target.getBoundingClientRect();
            
            // 2. 计算鼠标点击点相对于图片左上角的距离 (像素)
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 3. 转换成百分比 (保留1位小数)
            const xPercent = ((x / rect.width) * 100).toFixed(1);
            const yPercent = ((y / rect.height) * 100).toFixed(1);
            
            // 4. 在控制台输出代码方便复制
            console.log(`🎯 坐标捕获: top: '${yPercent}%', left: '${xPercent}%'`);
            alert(`坐标已打印在控制台：top: ${yPercent}%, left: ${xPercent}%`);
          }}
          // ===================================
        /> */}

        {/* --- 交互热区 1: 门 --- */}
        {/* 如果对话框正在显示，我们通常会禁用其他交互，所以在 onClick 加个判断 */}
        <div 
          className="interactive-hotspot door-zone" 
          onClick={!showBunnyDialog ? onEnterHouse : undefined}
        >
          {!showBunnyDialog && <div className="tooltip">ENTER</div>}
        </div>

        {/* --- 交互热区 2: 小兔子 (新增!) --- */}
        <div 
          className="interactive-hotspot bunny-zone"
          onClick={handleBunnyClick}
        >
          {/* 鼠标放上去显示个问号或者名字 */}
          {!showBunnyDialog && <div className="tooltip">小兔子</div>}
        </div>

        {/* === 对话框图层 (悬浮在画面底部) === */}
        {showBunnyDialog && (
          <div className="dialog-overlay">
            <DialogBox 
              name="雪地兔" 
              text={bunnyScript[dialogStep]} 
              onNext={handleNextDialog}
              isLast={dialogStep === bunnyScript.length - 1}
              customAvatar={bunnyAvatarImg}
            />
          </div>
        )}

      </div>

      <style>{`
        /* ...之前的样式保持不变... */
        .scene-wrapper {
          width: 100vw; height: 100vh; background-color: #1a1a1a;
          display: flex; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;
        }
        .game-viewport {
          position: relative; width: 100%; max-width: 960px; height: auto;
          border: 4px solid #5d3a24; box-shadow: 0 0 0 4px #3e2723, 0 10px 20px rgba(0,0,0,0.5); background: #000;
        }
        .background-image { width: 100%; height: auto; display: block; image-rendering: pixelated; }
        
        /* 交互热区通用 */
        .interactive-hotspot {
          position: absolute; cursor: url('https://img.itch.zone/aW1nLzEzNzcwMDU4LnBuZw==/original/NxrN5g.png'), pointer; z-index: 10;
          /* 调试用红色边框 (定位好后记得注释掉) */
           /* border: 2px solid rgba(255, 0, 0, 0.5); background: rgba(255, 0, 0, 0.2); */
        }
        //.interactive-hotspot:hover { background-color: rgba(255, 255, 255, 0.15); }

        /* --- 门的位置 (沿用你之前的设置) --- */
        .door-zone { top: 50%; left: 45%; width: 10%; height: 20%; }

        /* --- 小兔子的位置 (需要你手动微调!) --- */
        .bunny-zone {
          top: 32.5%;   /* 假设在稍微靠下的位置 */
          left: 61%;  /* 假设在左边 */
          width: 8%;  /* 兔子的大小 */
          height: 10%;
        }

        /* --- 对话框悬浮层 --- */
        .dialog-overlay {
          position: absolute;
          bottom: 20px; /* 距离底部 20px */
          left: 50%;
          transform: translateX(-50%); /* 居中 */
          width: 90%; /* 宽度占 90% */
          z-index: 100; /* 保证在最上层 */
          animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popUp {
          from { transform: translateX(-50%) scale(0.8); opacity: 0; }
          to { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        .tooltip {
          position: absolute; top: -35px; left: 50%; transform: translateX(-50%);
          background: #eac285; border: 2px solid #5d3a24; color: #3b200d;
          padding: 2px 6px; font-family: 'VT323', monospace; font-size: 1rem;
          pointer-events: none; opacity: 0; transition: opacity 0.2s; white-space: nowrap;
        }
        .interactive-hotspot:hover .tooltip { opacity: 1; }
      `}</style>
    </div>
  );
};

export default OutdoorScene;
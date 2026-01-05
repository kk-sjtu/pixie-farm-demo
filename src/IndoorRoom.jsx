import React, { useState } from 'react';
import DialogBox from './DialogBox';
import PixelFireplace from './PixelFireplace';
import PixelTV from './PixelTV'; 
import kkAvatarImg from './assets/kk对话框头像.png';
import gfAvatarImg from './assets/km.png'; 
import babyImg from './assets/kaka.png';
import bunnyImg from './assets/小兔子.png';

const IndoorRoom = ({ setScene }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [dialogText, setDialogText] = useState("外面冰天雪地，还是屋里暖和。想看点什么？");
  const [isNightMode, setIsNightMode] = useState(true);

  const Rug = () => (
    <div style={{
      width: '700px', height: '140px', background: '#5d4037',
      borderRadius: '50%', border: '4px solid #3e2723',
      position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 0, boxShadow: '0 5px 0 rgba(0,0,0,0.3)'
    }}></div>
  );

  // 像素窗户组件
  const PixelWindow = ({ isNight }) => (
    <div className="window-container">
      <div className="window-frame">
        <div className={`window-glass ${isNight ? 'night' : 'day'}`}>
          {!isNight && (
            <div className="snow-scene">
               <div className="snowfall"></div>
            </div>
          )}
          <div className="window-grid"></div>
        </div>
      </div>
    </div>
  );

  // === 数据 (不变) ===
  const relationships = [
    { id: 1, name: "世界上最好的km", role: "💖 Lover", desc: "值得一生守护的最可爱的小宝。", hearts: 10, avatar: gfAvatarImg },
    { id: 2, name: "kaka", role: "👶🏻 Daughter", desc: "kk和km的小宝宝，爱情的结晶", hearts: 10, avatar: babyImg },
    { id: 3, name: "雪地兔", role: "🐰 宠物", desc: "门口那只话很多的小兔子。", hearts: 3, avatar: bunnyImg },
  ];

  const menuItems = [
    {
      id: 'blog', label: '📚 博客文章', desc: '看看我最近写了什么技术笔记。',
      content: (
        <div className="content-inner">
          <h2 style={{borderBottom: '2px solid #5d3a24', paddingBottom: 10, marginBottom: 15}}>最近更新</h2>
          <ul className="pixel-ul" style={{fontSize: '1.5rem', lineHeight: '1.8'}}>
            <li><span>2026.01</span>React 像素风开发实战</li>
            <li><span>2025.12</span>数据分析师的转型之路</li>
            <li><span>2025.11</span>Islands 架构解析</li>
            <li><span>2025.10</span>如何用 CSS 画一个壁炉？</li>
          </ul>
        </div>
      )
    },
    {
      id: 'projects', label: '💻 项目展示', desc: '回顾一下我的代码仓库和作品。',
      content: (
        <div className="content-inner">
           <h2 style={{borderBottom: '2px solid #5d3a24', paddingBottom: 10, marginBottom: 15}}>我的作品</h2>
           <div className="project-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
             <div className="project-item"><strong>Pixel Farm</strong><p>基于 React 的星露谷风格个人主页。</p></div>
             <div className="project-item"><strong>SST Model</strong><p>海温预测深度学习模型。</p></div>
             <div className="project-item"><strong>Data Viz</strong><p>大屏数据可视化系统。</p></div>
           </div>
        </div>
      )
    },
    {
      id: 'social', label: '♥ 社交关系', desc: '我想看看我的家人们。',
      content: (
        <div className="content-inner">
           <h2 style={{borderBottom: '2px solid #5d3a24', paddingBottom: 10, marginBottom: 15}}>Family & Friends</h2>
           <div className="social-list-large">
             {relationships.map(friend => (
               <div key={friend.id} className={`friend-card-large ${friend.id === 1 ? 'special' : ''}`}>
                 <div className="avatar-section">
                    <img src={friend.avatar} alt={friend.name} onError={(e) => e.target.src='https://api.dicebear.com/9.x/pixel-art/svg?seed=Error'} />
                 </div>
                 <div className="info-section">
                   <div className="card-header">
                     <span className="name">{friend.name}</span>
                     <span className="role-badge">{friend.role}</span>
                   </div>
                   <div className="hearts-row">
                     {Array.from({ length: friend.hearts }).map((_, i) => <span key={i}>❤️</span>)}
                   </div>
                   <p className="description-text">{friend.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      )
    },
    { id: 'exit', label: '🚪 离开房间', desc: '门好像被大雪封住了，暂时出不去。', action: () => {}, disabled: true }
  ];

  const handleMouseEnter = (item) => setDialogText(item.desc);
  const handleMouseLeave = () => { if (!activeItem) setDialogText("外面冰天雪地，还是屋里暖和。想看点什么？"); };
  const handleClick = (item) => {
    if (item.disabled) return;
    if (item.action) {
      item.action();
    } else {
      setActiveItem(item.id);
      setDialogText(`正在电视上播放：${item.label}`);
    }
  };

  const toggleDayNight = () => {
    setIsNightMode(!isNightMode);
    setDialogText(isNightMode ? "天亮了，新的一天开始了！" : "夜深了，该休息了。");
  };

  return (
    <div className={`menu-wrapper ${isNightMode ? 'mode-night' : 'mode-day'}`}>
      <div className="room-lighting-overlay"></div>
      <button className="day-night-toggle pixel-btn" onClick={toggleDayNight}>
        {isNightMode ? '🌙 Night' : '☀️ Day'}
      </button>

      <div className="side-menu-hud">
        <div className="menu-header">遥控器</div>
        <div className="btn-group">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`pixel-btn ${activeItem === item.id ? 'active' : ''} ${item.disabled ? 'disabled-btn' : ''}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item)}
              disabled={item.disabled}
            >
              {item.label}
              {item.disabled && <span style={{float:'right'}}>🔒</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="center-stage">
          
          {/* 窗户组件 */}
          <PixelWindow isNight={isNightMode} />

          <div className="tv-area">
              <PixelTV 
                  content={menuItems.find(i => i.id === activeItem)?.content}
                  isActive={!!activeItem}
              />
          </div>
          <div className="hearth-area">
              <Rug />
              <div className="big-fireplace"><PixelFireplace /></div>
              <div className={`kk-sitting ${isNightMode ? 'sleeping' : 'awake'}`}>
                  <img src={kkAvatarImg} alt="KK" className="kk-sprite" />
                  {isNightMode && <div className="npc-bubble">Zzz...</div>}
              </div>
          </div>
      </div>

      <div className="fixed-dialog">
        <DialogBox name="KK大王" text={dialogText} onNext={() => {}} isLast={true} customAvatar={kkAvatarImg} />
      </div>

      <style>{`
        .menu-wrapper { 
            width: 100vw; height: 100vh; 
            background-size: 58px 58px;
            display: flex; flex-direction: column; align-items: center; justify-content: center; 
            font-family: 'VT323', monospace; overflow: hidden; position: relative; 
            transition: background-color 1s ease;
        }
        .menu-wrapper.mode-night { background-color: #2e2018; background-image: linear-gradient(335deg, rgba(0,0,0,0.2) 23px, transparent 23px), linear-gradient(155deg, rgba(0,0,0,0.2) 23px, transparent 23px), linear-gradient(335deg, rgba(0,0,0,0.2) 23px, transparent 23px), linear-gradient(155deg, rgba(0,0,0,0.2) 23px, transparent 23px); }
        .menu-wrapper.mode-day { background-color: #5d4037; background-image: linear-gradient(335deg, rgba(255,255,255,0.05) 23px, transparent 23px), linear-gradient(155deg, rgba(255,255,255,0.05) 23px, transparent 23px), linear-gradient(335deg, rgba(255,255,255,0.05) 23px, transparent 23px), linear-gradient(155deg, rgba(255,255,255,0.05) 23px, transparent 23px); }

        .room-lighting-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; transition: all 1s ease; }
        .mode-night .room-lighting-overlay { background: radial-gradient(circle at 50% 80%, rgba(255, 100, 50, 0.2), transparent 60%); mix-blend-mode: hard-light; animation: room-flicker-night 4s infinite alternate; opacity: 1; }
        .mode-day .room-lighting-overlay { background: radial-gradient(circle at 50% 80%, rgba(255, 160, 120, 0.15), transparent 70%); mix-blend-mode: overlay; animation: room-flicker-day 4s infinite alternate; opacity: 0.6; }
        @keyframes room-flicker-night { 0% { opacity: 0.8; } 100% { opacity: 0.95; } }
        @keyframes room-flicker-day { 0% { opacity: 0.5; } 100% { opacity: 0.7; } }

        .day-night-toggle.pixel-btn { position: absolute; top: 20px; right: 20px; z-index: 100; width: auto; padding: 10px 20px; }

        /* === ✨ 修改点：窗户变大，位置上移 === */
        .window-container {
            position: absolute;
            /* 上移到 -220px，确保在电视上方 */
            top: -220px; 
            z-index: 8;
        }
        .window-frame {
            /* 宽度翻倍，高度增加 */
            width: 480px; height: 200px;
            background: #5d3a24; border: 8px solid #3e2723; /* 边框加粗 */
            box-shadow: 0 5px 0 rgba(0,0,0,0.3);
            padding: 4px;
        }
        .window-glass { width: 100%; height: 100%; position: relative; overflow: hidden; border: 3px solid #2d1b15; transition: background 1s ease; }
        .window-glass.day { background: #87ceeb; }
        .window-glass.night { background: #1a1a2e; }

        .window-grid {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
            /* 十字格线条加粗 */
            background: linear-gradient(to right, transparent 48%, #5d3a24 48%, #5d3a24 52%, transparent 52%),
                        linear-gradient(to bottom, transparent 48%, #5d3a24 48%, #5d3a24 52%, transparent 52%);
            border: 2px solid #3e2723;
        }
        .snow-scene { position: absolute; width: 100%; height: 100%; }
        .snowfall {
            position: absolute; width: 100%; height: 200%; top: -100%;
            /* 增加雪花密度 */
            background-image: radial-gradient(4px 4px at 20px 30px, #fff 50%, transparent),
                              radial-gradient(5px 5px at 60px 80px, #fff 50%, transparent),
                              radial-gradient(3px 3px at 100px 120px, #fff 50%, transparent),
                              radial-gradient(4px 4px at 150px 40px, #fff 50%, transparent),
                              radial-gradient(5px 5px at 220px 180px, #fff 50%, transparent);
            background-size: 300px 300px;
            animation: fall 5s linear infinite;
        }
        @keyframes fall { to { transform: translateY(300px); } }


        .side-menu-hud { position: absolute; left: 40px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 20px; z-index: 20; }
        .menu-header { color: #eac285; font-size: 1.5rem; text-align: center; text-shadow: 2px 2px #000; letter-spacing: 2px; }
        .btn-group { display: flex; flex-direction: column; gap: 15px; }
        .pixel-btn { width: 220px; padding: 15px; font-size: 1.2rem; background: #d4a373; border: 4px solid #5d3a24; color: #3e2723; cursor: pointer; transition: transform 0.1s; box-shadow: 4px 4px 0 rgba(0,0,0,0.4); font-family: inherit; }
        .pixel-btn:hover { background: #eac285; transform: scale(1.05); }
        .pixel-btn.active { background: #fff8e1; border-color: #ff9800; transform: translate(2px, 2px); box-shadow: 2px 2px 0 rgba(0,0,0,0.4); }
        .pixel-btn.disabled-btn { background: #8d6e63; color: #5d4037; cursor: not-allowed; border-color: #5d4037; box-shadow: none; opacity: 0.7; }
        .pixel-btn.disabled-btn:hover { background: #8d6e63; transform: none; }

        .center-stage { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; margin-bottom: 120px; transform: scale(0.85); }
        @media (min-height: 900px) { .center-stage { transform: scale(1); } }
        .tv-area { position: relative; z-index: 10; margin-bottom: -20px; }
        .hearth-area { position: relative; width: 100%; display: flex; justify-content: center; align-items: flex-end; height: 160px; }
        .big-fireplace { transform: scale(1.6); transform-origin: bottom center; z-index: 2; }
        .kk-sitting { position: absolute; right: -120px; bottom: 10px; z-index: 3; transition: all 0.5s ease; }
        .kk-sitting.sleeping { animation: breathe-deep 3s infinite ease-in-out; }
        .kk-sitting.awake { animation: breathe-light 2s infinite ease-in-out; transform: translateY(-5px); }
        @keyframes breathe-deep { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
        @keyframes breathe-light { 0% { transform: translateY(-5px) scale(1); } 50% { transform: translateY(-4px) scale(1.01); } 100% { transform: translateY(-5px) scale(1); } }
        .kk-sprite { width: 70px; height: 70px; border: 3px solid #3e2723; background: #d4a373; object-fit: cover; image-rendering: pixelated; }
        .npc-bubble { position: absolute; top: -20px; right: -10px; background: white; padding: 2px 6px; border-radius: 8px; font-size: 0.8rem; animation: float 2s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pixel-ul span { background: #eac285; padding: 2px 6px; margin-right: 10px; border-radius: 4px; }
        .project-item { background: rgba(0,0,0,0.05); padding: 10px; border: 2px dashed #8b5a2b; margin-bottom: 10px; }
        .project-item p { margin: 4px 0 0 0; font-size: 0.9rem;}
        .project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .social-list-large { display: flex; flex-direction: column; gap: 15px; }
        .friend-card-large { display: flex; gap: 20px; background: #fff8e1; border: 3px solid #5d3a24; padding: 15px; box-shadow: 4px 4px 0 rgba(0,0,0,0.1); align-items: flex-start; }
        .friend-card-large.special { background: #fff0f5; border-color: #ff80ab; }
        .avatar-section img { width: 80px; height: 80px; object-fit: cover; border: 4px solid #5d3a24; background: #d4a373; }
        .info-section { flex: 1; }
        .card-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 5px; border-bottom: 2px dashed rgba(0,0,0,0.1); padding-bottom: 5px; }
        .info-section .name { font-size: 1.6rem; font-weight: bold; color: #3e2723; }
        .role-badge { background: #eac285; color: #5d3a24; padding: 2px 6px; border-radius: 4px; font-size: 0.9rem; font-weight: bold; }
        .hearts-row { font-size: 0.8rem; letter-spacing: -1px; margin-bottom: 8px; }
        .description-text { font-size: 1.1rem; color: #5d4037; margin: 0; line-height: 1.4; font-family: 'VT323', monospace; }
        .fixed-dialog { position: fixed; bottom: 20px; width: 90%; max-width: 800px; z-index: 50; left: 50%; transform: translateX(-50%); }
      `}</style>
    </div>
  );
};

export default IndoorRoom;
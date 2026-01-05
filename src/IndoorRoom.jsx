import React, { useState, useRef } from 'react';
import PixelModal from './PixelModal';
import DialogBox from './DialogBox';
import kkAvatarImg from './assets/kk对话框头像.png';
import { getMenuItems } from './data/menuConfig'; // 引入配置

const IndoorRoom = ({ setScene }) => {
  const [dialogText, setDialogText] = useState("欢迎来到我的个人主页！请在右侧选择你要浏览的内容。");
  const [activeModal, setActiveModal] = useState(null);
  const hoverTimer = useRef(null);

  // 获取菜单项配置
  // 这里我们手动处理一下 'about' 的内容，因为它依赖本地图片
  const rawMenuItems = getMenuItems(setScene);
  const menuItems = rawMenuItems.map(item => {
    if (item.isAbout) {
      return {
        ...item,
        content: (
          <div style={{ display: 'flex', gap: 20 }}>
            <img src={kkAvatarImg} style={{ width: 64, height: 64, border: '2px solid #5d3a24' }} alt="KK" />
            <div>
              <p>你好！我是 KK。</p>
              <p>Email: kkipaper@163.com</p>
            </div>
          </div>
        )
      };
    }
    return item;
  });

  // === 交互逻辑 ===
  const handleMouseEnter = (item) => {
    setDialogText(item.desc);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);

    if (!item.action) {
      hoverTimer.current = setTimeout(() => {
        console.log(`⏳ 悬停3秒达成，自动展开：${item.label}`);
        setActiveModal(item.id);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    setDialogText("请在右侧选择你要浏览的内容。");
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const handleClick = (item) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (item.action) {
      item.action();
    } else {
      setActiveModal(item.id);
    }
  };

  return (
    <div className="menu-wrapper">
      <div className="rpg-menu-container">
        
        {/* 左侧：个人信息卡片 */}
        <div className="profile-card">
          <div className="avatar-frame"><img src={kkAvatarImg} alt="KK" /></div>
          <h2>KK大王</h2>
          <div className="status-bar"><span>LV.25</span><span>数据法师</span></div>
          <div className="divider"></div>
          <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>"ai让脑海中的奇思妙想成为可能"</p>
        </div>

        {/* 右侧：菜单列表 */}
        <div className="menu-list">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`pixel-btn ${item.id === 'social' ? 'special-btn' : ''}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(item)}
            >
              <span className="loading-bar"></span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 底部对话框 */}
      <div className="fixed-dialog">
        <DialogBox name="KK大王" text={dialogText} onNext={() => {}} isLast={true} customAvatar={kkAvatarImg} />
      </div>

      {/* 弹窗 */}
      {activeModal && (
        <PixelModal 
          title={menuItems.find(i => i.id === activeModal)?.label} 
          onClose={() => setActiveModal(null)}
        >
          {menuItems.find(i => i.id === activeModal)?.content}
        </PixelModal>
      )}

      {/* 样式 (Style) */}
      <style>{`
        .menu-wrapper { width: 100vw; height: 100vh; background-color: #261a14; background-image: repeating-linear-gradient(45deg, #2e2018 25%, transparent 25%, transparent 75%, #2e2018 75%, #2e2018), repeating-linear-gradient(45deg, #2e2018 25%, #261a14 25%, #261a14 75%, #2e2018 75%, #2e2018); background-position: 0 0, 10px 10px; background-size: 20px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'VT323', monospace; }
        .rpg-menu-container { display: flex; gap: 40px; margin-bottom: 140px; align-items: center; }
        .profile-card { width: 200px; padding: 20px; background: #eac285; border: 4px solid #5d3a24; box-shadow: 8px 8px 0 rgba(0,0,0,0.5); text-align: center; color: #3e2723; image-rendering: pixelated; }
        .avatar-frame { width: 100px; height: 100px; margin: 0 auto 10px; background: #d4a373; border: 4px solid #5d3a24; }
        .avatar-frame img { width: 100%; height: 100%; object-fit: cover; }
        .divider { height: 2px; background: #8b5a2b; margin: 10px 0; }
        .status-bar { display: flex; justify-content: space-between; font-weight: bold; color: #8b0000; margin-bottom: 10px; }
        .menu-list { display: flex; flex-direction: column; gap: 20px; }
        .pixel-btn { width: 300px; padding: 15px 20px; font-family: 'VT323', monospace; font-size: 1.5rem; text-align: left; background: #d4a373; color: #3e2723; border: 4px solid #5d3a24; box-shadow: 4px 4px 0 rgba(0,0,0,0.3); cursor: pointer; transition: transform 0.1s; position: relative; }
        .pixel-btn:hover { background: #eac285; transform: translateX(10px); }
        .pixel-btn:hover::before { content: '►'; position: absolute; left: -25px; color: #eac285; }
        .fixed-dialog { position: fixed; bottom: 40px; width: 100%; max-width: 800px; z-index: 50; }

        /* 社交列表样式 */
        .special-btn:hover { background: #ffccdd; color: #880044; }
        .special-btn:hover::before { color: #ffccdd; }
        .social-list { display: flex; flex-direction: column; gap: 15px; }
        .friend-card { display: flex; gap: 15px; background: rgba(255,255,255,0.3); padding: 10px; border: 2px solid #c48c5e; border-radius: 4px; align-items: center; }
        .friend-avatar { width: 64px; height: 64px; border: 2px solid #5d3a24; background: #d4a373; flex-shrink: 0; }
        .friend-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .friend-info { flex: 1; }
        .friend-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .friend-name { font-size: 1.4rem; font-weight: bold; color: #5d3a24; }
        .friend-role { font-size: 1rem; color: #8b0000; background: rgba(255,255,255,0.5); padding: 0 4px; border-radius: 4px; }
        .friend-desc { font-size: 1rem; margin: 0; opacity: 0.9; margin-bottom: 6px; }
        .heart-bar { font-size: 0.8rem; letter-spacing: 2px; }
      `}</style>
    </div>
  );
};

export default IndoorRoom;
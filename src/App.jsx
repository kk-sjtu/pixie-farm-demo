import React, { useState } from 'react';
import PixelPanel from './PixelPanel';
import DialogBox from './DialogBox';
import OutdoorScene from './OutdoorScene';

// ✅ 新增这行：引入本地的 KK 头像图片
import kkAvatarImg from './assets/kk对话框头像.png';

function App() {
  // 1. 状态管理：当前场景在哪里？ ('outdoor' 或 'indoor')
  const [scene, setScene] = useState('outdoor');
  
  // 2. 状态管理：是否正在转场中？(用来显示黑屏动画)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 处理进门逻辑
  const handleEnterHouse = () => {
    setIsTransitioning(true); // 1. 开始黑屏
    
    // 2. 等待 1秒 (等屏幕变黑)
    setTimeout(() => {
      setScene('indoor');     // 3. 切换场景数据
      
      // 4. 再过 0.5秒 (等场景加载好)，慢慢取消黑屏
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 1000);
  };

  // 这是之前的室内页面代码，封装成一个小组件方便管理
  const IndoorRoom = () => {
    const [step, setStep] = useState(0);
    const script = ["欢迎回家，KK大王！", "这里是你的控制中心。", "外面天气不错吧？", "（我的头像现在是本地素材了哦！）"];
    
    return (
      <div style={{ /* ...省略样式代码... */ }}>
        <h1 style={{ color: '#eac285' }}>🏠 Home Sweet Home</h1>
        {/* ...省略 PixelPanel ... */}
        
        <div style={{ width: '500px' }}>
          {/* ✨ 修改这里：给主人的对话框也加上自定义头像 */}
          <DialogBox 
            name="KK大王" 
            text={script[step]} 
            onNext={() => setStep((s) => (s + 1) % script.length)}
            isLast={step === script.length - 1}
            
            // ✅ 加上这一行，传入 KK 的本地头像
            customAvatar={kkAvatarImg}
          />
        </div>
        {/* 返回按钮 */}
        <button onClick={() => setScene('outdoor')} style={{marginTop: 20, cursor: 'pointer'}}>
          出门去 (Back to Outside)
        </button>
      </div>
    );
  };

  return (
    <>
      {/* === 场景渲染器 === */}
      {scene === 'outdoor' ? (
        <OutdoorScene onEnterHouse={handleEnterHouse} />
      ) : (
        <IndoorRoom />
      )}

      {/* === 全局转场黑幕 === */}
      {/* 当 isTransitioning 为 true 时，覆盖一层黑色 div */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'black',
        pointerEvents: 'none', // 让鼠标能穿透（防止误触）
        opacity: isTransitioning ? 1 : 0, // 0是透明，1是全黑
        transition: 'opacity 1s ease-in-out', // 1秒渐变动画
        zIndex: 9999
      }}></div>
    </>
  );
}

export default App;
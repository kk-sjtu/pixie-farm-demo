import React, { useState } from 'react';
import OutdoorScene from './OutdoorScene';
import IndoorRoom from './IndoorRoom'; // 引入新拆分的组件

function App() {
  const [scene, setScene] = useState('outdoor');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 进入室内的转场逻辑
  const handleEnterHouse = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScene('indoor');
      setTimeout(() => setIsTransitioning(false), 500);
    }, 1000);
  };

  return (
    <>
      {/* 场景渲染器 */}
      {scene === 'outdoor' ? (
        <OutdoorScene onEnterHouse={handleEnterHouse} />
      ) : (
        // 把 setScene 传进去，让 IndoorRoom 内部可以调用 setScene('outdoor') 来出门
        <IndoorRoom setScene={setScene} />
      )}
      
      {/* 全局转场黑屏层 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'black', pointerEvents: 'none',
        opacity: isTransitioning ? 1 : 0, transition: 'opacity 0.5s ease-in-out', zIndex: 9999
      }}></div>
    </>
  );
}

export default App;
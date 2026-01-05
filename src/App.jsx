import React, { useState } from 'react';
import OutdoorScene from './OutdoorScene';
import IndoorRoom from './IndoorRoom';

function App() {
  // ✨✨✨ 修改点：初始状态改为 'indoor'，直接进入房间 ✨✨✨
  const [scene, setScene] = useState('indoor'); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 虽然现在直接进屋了，但这个函数留着也无妨，万一以后你想加回“出门”功能呢
  const handleEnterHouse = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setScene('indoor');
      setTimeout(() => setIsTransitioning(false), 500);
    }, 1000);
  };

  return (
    <>
      {scene === 'outdoor' ? (
        <OutdoorScene onEnterHouse={handleEnterHouse} />
      ) : (
        <IndoorRoom setScene={setScene} />
      )}
      
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'black', pointerEvents: 'none',
        opacity: isTransitioning ? 1 : 0, transition: 'opacity 0.5s ease-in-out', zIndex: 9999
      }}></div>
    </>
  );
}

export default App;
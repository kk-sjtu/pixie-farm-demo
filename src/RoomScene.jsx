import React from 'react';
import PixelPanel from './PixelPanel';

// 独立的小屋场景组件
const RoomScene = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '30px',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        color: '#583220', 
        textShadow: '2px 2px 0px #f6e3c4',
        fontSize: '2.5rem',
        margin: 0
      }}>
        🏡 我的像素小屋
      </h1>

      {/* 像素风格的小屋面板 */}
      <PixelPanel style={{ 
        width: '80%', 
        maxWidth: '800px',
        minHeight: '500px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* 墙壁背景 */}
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#eac285',
          zIndex: 1,
          opacity: 0.9
        }}></div>

        {/* 木质桌子 */}
        <div style={{
          width: '200px',
          height: '120px',
          backgroundColor: '#8b4513',
          border: '4px solid #583220',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ color: '#f6e3c4', fontSize: '1.2rem' }}>木桌</span>
        </div>

        {/* 木质椅子 */}
        <div style={{
          width: '80px',
          height: '100px',
          backgroundColor: '#a0522d',
          border: '4px solid #583220',
          position: 'relative',
          zIndex: 2,
          marginLeft: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ color: '#f6e3c4', fontSize: '1rem' }}>木椅</span>
        </div>
      </PixelPanel>

      <p style={{ color: '#583220', fontSize: '1.2rem', margin: 0 }}>
        欢迎来到像素小屋！点击任意位置返回对话页
      </p>
    </div>
  );
};

export default RoomScene;
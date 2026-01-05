import React from 'react';
import PixelPanel from './PixelPanel';

// 小屋内部（Home页）
const InsideScene = ({ onLeaveHouse }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--sdv-bg)',
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(200, 160, 100, 0.2) 0px, rgba(200, 160, 100, 0.2) 8px, transparent 8px, transparent 16px)',
      fontFamily: 'VT323, monospace'
    }}>
      {/* 内部标题 */}
      <h1 style={{
        color: '#583220',
        textShadow: '2px 2px 0px #f6e3c4',
        fontSize: '3rem',
        marginBottom: '40px'
      }}>
        我的小屋 · 内部
      </h1>

      {/* 内部家具布局 */}
      <div style={{
        width: '90%',
        maxWidth: '1000px',
        height: '70%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        {/* 木质桌子 */}
        <PixelPanel style={{
          width: '300px',
          height: '200px',
          backgroundColor: '#8b4513',
          borderColor: '#583220',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ color: '#f6e3c4', fontSize: '1.5rem' }}>木质餐桌</span>
        </PixelPanel>

        {/* 椅子 */}
        <PixelPanel style={{
          width: '120px',
          height: '180px',
          backgroundColor: '#a0522d',
          borderColor: '#583220',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 20px'
        }}>
          <span style={{ color: '#f6e3c4', fontSize: '1.2rem' }}>木椅</span>
        </PixelPanel>

        {/* 书架 */}
        <PixelPanel style={{
          width: '250px',
          height: '250px',
          backgroundColor: '#8b4513',
          borderColor: '#583220',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div style={{
            width: '90%',
            height: '20%',
            backgroundColor: '#f6e3c4',
            border: '2px solid #583220'
          }}>
            <span style={{ color: '#583220', fontSize: '1rem' }}>星露谷指南</span>
          </div>
          <div style={{
            width: '90%',
            height: '20%',
            backgroundColor: '#e08848',
            border: '2px solid #583220'
          }}>
            <span style={{ color: '#583220', fontSize: '1rem' }}>钓鱼手册</span>
          </div>
          <div style={{
            width: '90%',
            height: '20%',
            backgroundColor: '#4a7c59',
            border: '2px solid #583220'
          }}>
            <span style={{ color: '#583220', fontSize: '1rem' }}>农耕笔记</span>
          </div>
        </PixelPanel>
      </div>

      {/* 返回按钮 */}
      <button 
        onClick={onLeaveHouse}
        style={{
          marginTop: '30px',
          padding: '10px 30px',
          backgroundColor: 'var(--sdv-border)',
          color: 'var(--sdv-highlight)',
          border: '4px solid #3b200d',
          borderRadius: 0,
          fontFamily: 'VT323, monospace',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '4px 4px 0px rgba(0,0,0,0.4)',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseOver={(e) => e.target.style.transform = 'translate(-2px, -2px)'}
        onMouseOut={(e) => e.target.style.transform = 'translate(0, 0)'}
      >
        离开小屋
      </button>
    </div>
  );
};

export default InsideScene;
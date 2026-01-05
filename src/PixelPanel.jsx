import React from 'react';

// 通用的像素面板组件
const PixelPanel = ({ children, style }) => {
  return (
    <div style={{
      backgroundColor: 'var(--sdv-bg)',
      border: '4px solid var(--sdv-border)',
      // 这里的阴影是模拟像素立体感的精髓
      boxShadow: `
        inset 4px 4px 0px var(--sdv-highlight),  /* 左上内部高光 */
        inset -4px -4px 0px var(--sdv-shadow),   /* 右下内部阴影 */
        4px 4px 0px rgba(0,0,0,0.4)              /* 外部投影 */
      `,
      padding: '24px', // 内部留白
      maxWidth: '500px',
      position: 'relative', // 为了以后加装饰
      ...style // 允许外部覆盖样式
    }}>
      {/* 四个角的装饰钉子 (可选，增加精致感) */}
      <div style={{position:'absolute', top:8, left:8, width:6, height:6, background:'#583220', borderRadius:'50%'}}/>
      <div style={{position:'absolute', top:8, right:8, width:6, height:6, background:'#583220', borderRadius:'50%'}}/>
      <div style={{position:'absolute', bottom:8, left:8, width:6, height:6, background:'#583220', borderRadius:'50%'}}/>
      <div style={{position:'absolute', bottom:8, right:8, width:6, height:6, background:'#583220', borderRadius:'50%'}}/>

      {children}
    </div>
  );
};

export default PixelPanel;
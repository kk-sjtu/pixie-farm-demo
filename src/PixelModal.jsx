import React from 'react';

// 这是一个通用的“游戏内窗口”组件
// 用来显示博客文章、项目列表等内容
const PixelModal = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* 1. 标题栏 */}
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          {/* 关闭按钮 (红色的 X) */}
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        {/* 2. 内容区域 (这里面可以放任何博客内容) */}
        <div className="modal-content">
          {children}
        </div>

      </div>

      <style>{`
        .modal-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.6); /* 背景变暗 */
          z-index: 100;
          display: flex; justify-content: center; align-items: center;
          animation: fadeIn 0.2s;
        }

        .modal-container {
          width: 80%; max-width: 600px;
          height: 70%; max-height: 500px;
          /* 星露谷 UI 经典配色 */
          background-color: #ffcd8f; 
          border: 4px solid #5d3a24;
          box-shadow: 
            inset 0 0 0 4px #eac285, /* 内描边 */
            0 10px 20px rgba(0,0,0,0.5);
          display: flex; flex-direction: column;
          position: relative;
          image-rendering: pixelated;
        }

        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 15px;
          border-bottom: 2px solid #c48c5e;
        }

        .modal-title {
          font-family: 'VT323', monospace;
          font-size: 1.5rem;
          color: #5d3a24;
          font-weight: bold;
        }

        .close-btn {
          width: 32px; height: 32px;
          background: #d32f2f;
          border: 2px solid #5d3a24;
          color: white; font-family: 'VT323', monospace; font-size: 1.2rem;
          cursor: pointer;
          display: flex; justify-content: center; align-items: center;
        }
        .close-btn:hover { background: #b71c1c; }

        .modal-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto; /* 内容多了可以滚动 */
          font-family: 'VT323', monospace;
          color: #3e2723;
          font-size: 1.2rem;
        }

        /* 自定义滚动条样式，让它看起来像像素风 */
        .modal-content::-webkit-scrollbar { width: 10px; }
        .modal-content::-webkit-scrollbar-track { background: #eac285; }
        .modal-content::-webkit-scrollbar-thumb { background: #c48c5e; border: 2px solid #5d3a24; }

        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default PixelModal;
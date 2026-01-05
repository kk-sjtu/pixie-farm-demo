import React from 'react';
import { relationships } from './relationships';

// 这个函数接收 setScene (用于退出) 和 setDialogText (用于悬停提示) 等回调
export const getMenuItems = (setScene) => [
  {
    id: 'blog',
    label: '📚 博客文章 (Blog)',
    desc: '这里记录了我的学习笔记、技术复盘和生活随笔。',
    content: (
      <ul>
        <li><a href="#">[2026] React 像素风开发实战</a></li>
        <li><a href="#">[2025] 数据分析师的转型之路</a></li>
      </ul>
    )
  },
  {
    id: 'projects',
    label: '💻 项目展示 (Projects)',
    desc: ' 这里展示了我做过的开源项目、数据模型和好玩的小工具。',
    content: (
      <div>
         <p>1. <strong>Pixel Farm</strong>: 基于 React 的个人主页</p>
         <p>2. <strong>SST Model</strong>: 海温预测深度学习模型</p>
      </div>
    )
  },
  {
    id: 'social',
    label: '♥ 社交关系 (Social)',
    desc: '这里记录了我珍视的人和朋友们。',
    content: (
      <div className="social-list">
        {relationships.map(friend => (
          <div key={friend.id} className="friend-card">
            <div className="friend-avatar">
              <img src={friend.avatar} alt={friend.name} onError={(e) => e.target.src='https://api.dicebear.com/9.x/pixel-art/svg?seed=Error'} />
            </div>
            <div className="friend-info">
              <div className="friend-header">
                <span className="friend-name">{friend.name}</span>
                <span className="friend-role">{friend.role}</span>
              </div>
              <p className="friend-desc">{friend.desc}</p>
              <div className="heart-bar">
                {Array.from({ length: friend.hearts }).map((_, i) => <span key={i} className="heart">❤️</span>)}
                {Array.from({ length: 10 - friend.hearts }).map((_, i) => <span key={i} className="heart-empty">🤍</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'about',
    label: '🧑 关于我 (About)',
    desc: 'KK大王，本科计算机，硕士海洋科学。',
    // 注意：这里需要传入 kkAvatarImg，为了简化，我们在组件里处理或这里暂留空
    // 为了彻底解耦，我们把内容放在组件里处理，或者这里只是个静态配置
    // 这里我们先简化处理，About 内容在 IndoorRoom 里直接写比较方便
    isAbout: true 
  },
  {
    id: 'exit',
    label: '🚪 离开房间 (Exit)',
    desc: '回到外面的雪地透透气？',
    action: () => setScene('outdoor')
  }
];




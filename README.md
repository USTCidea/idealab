# 智能决策博弈与数字经济创新 实验室网站

这是一个基于 React + TypeScript + Vite 构建的现代化实验室网站，展示 智能决策博弈与数字经济创新 实验室的研究成果、团队信息和学术动态。

## 🚀 特性

- ⚡️ **现代化技术栈**: React 19 + TypeScript + Vite
- 🎨 **美观界面**: Tailwind CSS + 自定义组件
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🧭 **路由管理**: React Router 支持多页面导航
- 🎯 **TypeScript**: 完整的类型定义和类型安全
- 🔧 **组件化**: 模块化设计，易于维护和扩展

## 📦 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **UI 组件**: Headless UI + 自定义组件
- **路由管理**: React Router
- **图标库**: Heroicons
- **代码规范**: ESLint + TypeScript

## 🛠️ 开发设置

### 环境要求

- Node.js >= 18
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看网站。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/           # 通用组件
│   ├── ui/              # 基础 UI 组件
│   └── layout/          # 布局组件
├── pages/               # 页面组件
├── layouts/             # 布局模板
├── router/              # 路由配置
├── types/               # TypeScript 类型定义
├── data/                # 静态数据
├── hooks/               # 自定义 Hooks
├── utils/               # 工具函数
├── styles/              # 全局样式
└── assets/              # 静态资源
```

## 🎨 设计系统

### 颜色方案

- **主色调**: #00409c (实验室主题色)
- **辅助色**: #1e40af (深蓝)、#3b82f6 (中蓝)、#93c5fd (浅蓝)
- **中性色**: #f8fafc (背景)、#64748b (文本)、#1e293b (深色文本)

### 组件库

- `Button`: 按钮组件，支持多种样式和状态
- `Card`: 卡片组件，用于内容展示
- `Container`: 容器组件，控制页面宽度和间距
- `Header`: 导航栏组件，支持响应式菜单
- `Footer`: 页脚组件，包含联系信息

## 🌐 页面结构

- `/` - 首页 (Hero 区块、团队预览、最新动态、精选论文)
- `/team` - 团队信息 (导师、学生、毕业生)
- `/publications` - 学术论文 (搜索、筛选、分页)
- `/news` - 学术动态 (新闻列表、分类筛选)
- `/gallery` - 团队风采 (图片画廊、瀑布流布局)
- `/projects` - 科研项目 (项目列表、详情展示)

## 🔧 自定义配置

### Tailwind CSS

项目使用 Tailwind CSS 进行样式处理，配置文件 `tailwind.config.js` 包含：

- 自定义颜色方案
- 扩展字体系列
- 自定义间距和圆角
- 动画效果定义

### TypeScript

完整的 TypeScript 配置，包括：

- 严格类型检查
- 路径别名设置
- 组件 Props 类型定义
- API 数据类型定义

## 📝 开发指南

### 添加新页面

1. 在 `src/pages/` 中创建新的页面组件
2. 在 `src/router/index.tsx` 中添加路由配置
3. 在导航栏中添加菜单项 (如需要)

### 创建新组件

1. 在 `src/components/` 相应目录中创建组件
2. 使用 TypeScript 定义 Props 类型
3. 导出组件和类型定义
4. 更新索引文件

### 样式开发

- 优先使用 Tailwind CSS 类名
- 自定义样式放在组件内部或全局 CSS 文件中
- 遵循响应式设计原则

## 🚀 部署

项目支持静态部署到以下平台：

- **Vercel**: 推荐选择，零配置部署
- **Netlify**: 支持自动部署和表单处理
- **GitHub Pages**: 免费的静态网站托管


## 📞 联系方式

- 邮箱: 3dv-lab@university.edu.cn
- 地址: 北京市海淀区中关村南大街 XX 号

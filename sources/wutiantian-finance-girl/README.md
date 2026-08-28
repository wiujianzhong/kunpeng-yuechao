# 吴甜甜｜一个财务女孩的数字世界

为吴甜甜定制的响应式个人主页 Demo。页面没有虚构履历、年龄、证书、联系方式或具体业绩；真实资料不足的位置使用了可继续补充的表达。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 替换照片

所有照片统一放在 `public/images/`。文件名和用途如下：

- `hero.jpg`：首页人物主照片，推荐 4:5。
- `work.jpg`：工作照片，推荐 4:5。
- `life.jpg`：日常生活照片，推荐 4:5。
- `atmosphere.jpg`：横版氛围照片，推荐 16:9。
- `gallery-01.jpg`：照片墙竖图。
- `gallery-02.jpg`：照片墙方图。
- `gallery-03.jpg`：照片墙横图。

文件缺失时会自动显示高级占位图，不会出现裂图。

## 修改个人资料

主要资料和照片路径集中在 `src/content.ts`。当前使用：

- 姓名：吴甜甜
- 职位：财务主管
- 公司：阿新纺织有限公司
- 方向：企业财务 / 财务管理

公司名已经本人确认为“阿新纺织有限公司”。

## 首页 3D 滚轮交互

首页是一段由滚轮或手指滑动直接控制的“财务脑内”3D 叙事：

1. 表面很安静
2. 数字有来处
3. 未平的数字会说话
4. 0.01 是一道裂缝
5. 世界终于安静

滚动进度会同步控制玻璃账页、双重记账金属轨道、发光秩序核心、0.01 裂缝、镜头景别与明暗空间转场。

## 技术说明

- Vite + React + TypeScript
- React Three Fiber + Drei（玻璃账页、双重记账核心和 0.01 裂缝场景）
- GSAP ScrollTrigger（滚轮驱动 3D 时间线）
- 原生 CSS 动效与 IntersectionObserver（其他区域滚动显现）
- 无后端、无第三方数据、无 API Key
- 支持 `prefers-reduced-motion`，并限制 WebGL 像素比以兼顾手机性能

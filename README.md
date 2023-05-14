# react-demo

> 从 0 到 1 搭建基于 Webpack5 + React18 + TypeScript4 的自用脚手架。

## 安装
``` bash
yarn install
```

## 运行
### 开发模式
  ``` bash
  yarn start
  ```
### 生产模式
  ``` bash
  yarn build
  ```
### 打包体积分析
  ``` bash
  yarn analysis
  ```
### ESLint
  ``` bash
  yarn lint
  ```

## 目录说明

``` text
├── README.md                 // 项目说明
├── .gitignore                // git忽略配置
├── assets.d.ts               // ts声明文件（资源相关）
├── package.json              // 依赖包配置
├── public                    // 静态资源
│   ├── favicon.ico
│   └── index.html            // html模板
├── src                       // 开发目录
│   ├── assets                // 静态资源
│   ├── pages                 // 页面文件
│   ├── routes                // 路由文件
│   ├── styles                // 样式文件
│   ├── App.tsx               // 主组件文件
│   └── main.tsx              // 项目入口文件
├── tsconfig.json             // ts配置
└── webpack                   // webpack配置
    ├── webpack.analysis.ts
    ├── webpack.common.ts     
    ├── webpack.dev.ts
    └── webpack.prod.ts
```

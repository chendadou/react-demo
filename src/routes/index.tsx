import React, { lazy, Suspense } from "react";
import Home from '@pages/home/Home';

// 路由懒加载
const Demo = lazy(() => import('@pages/demo/Demo'));
const User = lazy(() => import('@pages/user/User'));

import {
  HomeOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

// key 和 icon 是为了配合 antd menu 使用的
const routes = [
  {
    key: '/',
    path: '/',
    element: <Home />,
    icon: <HomeOutlined />,
    label: 'Home',
    // children: [],
  },
  {
    key: '/demo',
    path: '/demo',
    element: (
      <Suspense fallback={<></>}>
        <Demo />
      </Suspense>
    ),
    icon: <VideoCameraOutlined />,
    label: 'Demo',
    // children: [],
  },
  {
    key: '/user',
    path: '/user',
    element: (
      <Suspense fallback={<></>}>
        <User />
      </Suspense>
    ),
    icon: <UserOutlined />,
    label: 'User',
    // children: [],
  },
];

export default routes;

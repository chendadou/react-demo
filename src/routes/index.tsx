import React from "react";
import Home from '@pages/home/Home';
import Demo from '@pages/demo/Demo';
import User from '@pages/user/User';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const routes = [
  {
    path: '/',
    element: <Home />,
    icon: <UserOutlined />,
    label: 'Home',
    children: [],
  },
  {
    path: '/demo',
    element: <Demo />,
    icon: <VideoCameraOutlined />,
    label: 'Demo',
    children: [],
  },
  {
    path: '/user',
    element: <User />,
    icon: <UploadOutlined />,
    label: 'User',
    children: [],
  },
];

export default routes;

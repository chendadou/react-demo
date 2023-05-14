import React, { useState } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

import routes from './routes';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const element = useRoutes(routes);
  const items = routes.map(item => (
    {
      icon: item.icon,
      key: item.path,
      label: item.label,
    }
  ));

  const navigate = useNavigate();
  const onClick = (e: { key: string }) => {
    navigate(e.key);
  };

  const location = useLocation();

  return <>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={onClick}
          selectedKeys={[location.pathname]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* Content */}
          {element}
        </Content>
      </Layout>
    </Layout>
  </>;
};

export default App;

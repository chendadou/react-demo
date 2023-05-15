import React, { useState } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Row,
  Col,
} from 'antd';
const { Header, Sider, Content, Footer } = Layout;

import routes from './routes';
import './App.scss';
import avatarUrl from '@assets/avatar.png';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const element = useRoutes(routes);

  const navigate = useNavigate();
  const onClickMenuItem = (e: { key: string }) => {
    navigate(e.key);
  };

  const location = useLocation();

  return <>
    <Layout id='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <SmileOutlined />
          {collapsed ? '' : <span>&nbsp;React Demo</span>}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          items={routes}
          onClick={onClickMenuItem}
          selectedKeys={[location.pathname]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px 0', background: colorBgContainer }}>
          <Row>
            <Col span={12}>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={12} style={{ textAlign: 'right'}}>
              <Avatar
                size='large'
                src={<img src={avatarUrl} alt="avatar" />}
              />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow: 'auto',
          }}
        >
          {/* Content */}
          {element}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </>;
};

export default App;

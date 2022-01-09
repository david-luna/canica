import { useState } from 'react';
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import { useAppSelector } from './app/hooks';
import AppSider from './app/components/sider';
import AppHeader from './app/components/header';
import { Files } from './app/pages/files';
import { Login } from './app/pages/login';
import { Setup } from './app/pages/setup';
import { selectRoute } from './app/store/navigation/slice';
import { AppRoutes } from './routes';
import React from 'react';

import './App.less';

const { Header, Content } = Layout;

function routePage(route: AppRoutes): JSX.Element | null {
  const mapping: Record<AppRoutes, JSX.Element | null> = {
    [AppRoutes.Setup]: <Setup></Setup>,
    [AppRoutes.Login]: <Login></Login>,
    [AppRoutes.Import]: null,
    [AppRoutes.Files]: <Files></Files>,
  }

  return (mapping[route] || null); // TODO: 404 page
}

function App() {
  const route = useAppSelector(selectRoute);
  const [collapsed, setCollapsed] = useState(false);
  const isLoggedIn = [AppRoutes.Setup, AppRoutes.Login].indexOf(route) === -1;

  const toggleSider = () => setCollapsed(!collapsed);

  return (
    <Layout>
      {isLoggedIn ? <AppSider collapsed={collapsed}></AppSider> : null}

      <Layout className="site-layout">
        {isLoggedIn ? <AppHeader></AppHeader> : null}
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {routePage(route)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

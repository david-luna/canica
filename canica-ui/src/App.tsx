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
import { selectRoute } from './app/store/navigation/slice';
import { AppRoutes } from './routes';

import './App.less';

const { Content } = Layout;

function routePage(route: AppRoutes): JSX.Element | null {
  const mapping: Record<AppRoutes, JSX.Element | null> = {
    [AppRoutes.Login]: <Login></Login>,
    [AppRoutes.Import]: null,
    [AppRoutes.Files]: <Files></Files>,
  }

  return (mapping[route] || null); // TODO: 404 page
}

function App() {
  const route = useAppSelector(selectRoute);
  const isLoggedIn = AppRoutes.Login !== route;

  return (
    <Layout>
      {isLoggedIn ? <AppSider collapsed={false}></AppSider> : null}
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

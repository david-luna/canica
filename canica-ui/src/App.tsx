import { Layout, Menu } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout';

import { useAppSelector } from './app/hooks';
import { Files } from './app/pages/files';
import { Login } from './app/pages/login';
import { Setup } from './app/pages/setup';
import { selectRoute } from './app/store/navigation/slice';
import { AppRoutes } from './routes';

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
  const doLogout = () => {};

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" onClick={doLogout}>Logout</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        {routePage(route)}
      </Content>
      <Footer style={{ textAlign: 'center' }}>xxx</Footer>
    </Layout>
  );
}

export default App;

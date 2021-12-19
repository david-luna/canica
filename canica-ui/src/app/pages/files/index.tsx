// import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser, logout } from '../../store/auth/slice';

import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import './index.less';


export function Files() {
  const count = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logoutClick = (e: React.MouseEvent) => {
    dispatch(logout());
  };

  const importClasses = (e: React.MouseEvent) => {
    console.log('importClasses', e);
  };

  return (
    <Layout>
      <Header>

      </Header>
      <Content>
        <button onClick={(e) => logoutClick(e)}>Logout</button>
        <button onClick={(e) => importClasses(e)}>Import</button>
      </Content>
      <Footer>

      </Footer>
    </Layout>
  );
}

export default Files;

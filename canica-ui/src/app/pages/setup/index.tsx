import { Fragment, useEffect } from 'react';
import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppRoutes } from '../../../routes';
import { selectAuthHasConfig, selectAuthStatus } from '../../store/auth/slice';
import { navigate } from '../../store/navigation/slice';

import './index.less';
import { AuthActions } from '../../store/auth/slice';

export function Setup() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus)
  const hasConfig = useAppSelector(selectAuthHasConfig)

  const handleClick = (values: any) => {
    dispatch(AuthActions.setConfig({ client: 'xxx', secret: 'yyy' }));
  };

  useEffect(
    () => {
      if (typeof hasConfig === 'undefined') {
        dispatch(AuthActions.checkConfig());
      } else if (hasConfig) {
        dispatch(navigate(AppRoutes.Login));
      }
    },
    [dispatch, hasConfig],
  );

  return (
    <Fragment>
      <div className="form">
        <div className='status'>{authStatus}</div>
        <div className='config'>hasConfig: {hasConfig ? 'true' : 'false' }</div>
        <div className="logo">
          <img alt="logo" src="/logo.svg" />
          <span>SETUP</span>
        </div>
        <Button
          type="primary"
          loading={false}
          onClick={handleClick}
        >
          Set Config
        </Button>
      </div>
      <div className="footer">
        Footer comes here
      </div>
    </Fragment>
  );
}

export default Setup;

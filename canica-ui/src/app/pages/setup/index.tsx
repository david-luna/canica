import { Fragment } from 'react';
import { Button } from 'antd'

import { useAppDispatch } from '../../../app/hooks';

import './index.less';
import { navigate } from '../../store/navigation/slice';
import { AppRoutes } from '../../../routes';

export function Setup() {
  const dispatch = useAppDispatch();

  const handleClick = (values: any) => {
    dispatch(navigate(AppRoutes.Login));
  };

  return (
    <Fragment>
    <div className="form">
      <div className="logo">
        <img alt="logo" src="/logo.svg" />
        <span>SETUP</span>
      </div>
      <Button
        type="primary"
        loading={false}
        onClick={handleClick}
      >
        Next
      </Button>
    </div>
    <div className="footer">
      Footer comes here
    </div>
    </Fragment>
  );
}

export default Setup;

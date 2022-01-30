import { useEffect } from 'react';
import { Image, Upload, Spin } from 'antd'

import { PlusOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuthStatus, AuthActions, selectAuthHasConfig } from '../../store/auth/slice';

import './index.less';

export function Login() {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const hasConfig = useAppSelector(selectAuthHasConfig);

  const getText = async (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsText(file);
    });
  };

  const handleConfigFile = async (request: any) => {
    const fileContent = await getText(request.file);
    const config = JSON.parse(fileContent) as any;
    dispatch(AuthActions.setConfig(config));
  };
  const handleLoginClick = (values: any) => {
    dispatch(AuthActions.login())
  };

  useEffect(
    () => {
      if (typeof hasConfig === 'undefined') {
        dispatch(AuthActions.checkConfig());
      }
    },
    [dispatch, hasConfig],
  );

  const renderForm = (hasConfig: boolean) => {
    if (hasConfig) {
      return (
        <Image
          onClick={handleLoginClick}
          width={'100%'}
          src="error"
          fallback="login-button.png"
        />
      );
    }

    return (
      <Upload
        name="config-file"
        listType="picture-card"
        className="file-uploader"
        showUploadList={false}
        customRequest={handleConfigFile}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Add configuration</div>
        </div>
      </Upload>
    );
  }

  return (
    <div className="form">
      <Spin spinning={authStatus === 'loading'}>
        {renderForm(!!hasConfig)}
      </Spin>
    </div>
  );
}

export default Login;

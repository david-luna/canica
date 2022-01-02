import { Fragment } from 'react';
import { Button, Row, Input, Form } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../app/hooks';


import './index.less';
import { loginAsync } from '../../store/auth/thunks';
import { selectAuthStatus } from '../../store/auth/slice';

const FormItem = Form.Item;

export function Login() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  

  const handleSubmit = (values: any) => {
    dispatch(loginAsync());
  };

  return (
    <Fragment>
    <div className="form">
      <div className="logo">
        <img alt="logo" src="/logo.svg" />
        <span>CANICA</span>
      </div>
      <Form
        onFinish={handleSubmit}
        >
        <FormItem name="username" 
          rules={[{ required: true }]} hasFeedback>
            <Input
              placeholder="Username"
            />
        </FormItem>
        <FormItem name="password"
          rules={[{ required: true }]} hasFeedback>
            <Input
              type="password"
              placeholder="Password"
            />
        </FormItem>
        <Row>
          <Button
            type="primary"
            htmlType="submit"
            loading={false}
          >
            Sign in
          </Button>
          <p>
            <span className="margin-right">
              Username
              ：guest
            </span>
            <span>
              Password
              ：guest
            </span>
          </p>
        </Row>
      </Form>
    </div>
    <div className="footer">
      Footer comes here
    </div>
    </Fragment>
  );
}

export default Login;

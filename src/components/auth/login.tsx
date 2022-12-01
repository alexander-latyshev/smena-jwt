import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { getLoginPage } from "../../redux/reducer";

type Props = {};
interface LoginField {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const [loginField, setLoginField] = useState({
    username: "",
    password: "",
  });

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ marginTop: 20, width: 350 }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginField({
              ...loginField,
              username: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLoginField({
              ...loginField,
              password: e.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <Link to={"/about"}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => dispatch(getLoginPage(loginField))}
          >
            Log in
          </Button>
        </Link>
        Or <Link to={"/register"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;

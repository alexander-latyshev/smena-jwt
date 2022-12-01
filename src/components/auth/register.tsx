import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import { useAppDispatch } from "../../redux/hooks";
import { getRegisterPage } from "../../redux/reducer";
import { Link } from "react-router-dom";

type Props = {};

const Register = (props: Props) => {
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [registerField, setRegisterField] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      {/* <Alert
        message={regMessage.message || regMessage.error}
        type={regMessage.error ? "error" : "success"}
        style={{ width: 400, margin: "auto" }}
      /> */}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: 50, width: 800 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterField({
                ...registerField,
                username: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRegisterField({
                ...registerField,
                password: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => dispatch(getRegisterPage(registerField))}
          >
            Submit
          </Button>
          Or <Link to={"/login"}>Login!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;

import { Button, Form, Input, message } from 'antd';
import React from 'react';
import service from '../../utils/request';
const SHA256 = require("crypto-js/sha256");
const Login = (props: any) => {
  const onFinish = (values: any) => {
    if(values.Name==='admin'&&values.Password==='admin'){
      sessionStorage.setItem('userInfo',JSON.stringify(['case','template','user']))
      props.router.navigate('/recommendLog')
      return 
    }
    values.Password = SHA256(values.Password).toString();
    service({
      method: 'POST',
      url: 'login',
      data: values
    })
      .then((res: any) => {
        if (res.code !== 201) {
          message.error(res.errorMsg || '请求出错')
          return
        }
        //跳转到首页
        sessionStorage.setItem('JWT',res.data.token)
        sessionStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
        props.router.navigate('/recommendLog')
      })
      .catch((e) => {
        message.error('请求出错:' + e.toString())
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (<div className='loginWrapper'>
    <div className='headerDiv'>
      <div className='logoDiv'/>
      <div className='titleSystem'>XXX推荐管理平台</div>
    </div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{width:800,margin:"0 auto"}}
    >
      <Form.Item
        label="用户名"
        name="Name"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input placeholder='admin'/>
      </Form.Item>
      <Form.Item
        label="密码"
        name="Password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input.Password placeholder='admin'/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" style={{marginRight:250}}>
          登录
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
};

export default Login;
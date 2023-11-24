import React,{useState} from 'react';
import { Button, Form, Input, Select } from 'antd';
import {AuthorityEnum} from '../utils/static';
const SHA256 = require("crypto-js/sha256");

const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  interface ListItemProps {
    submit: Function,
    oncancel: Function
}
const AddUserForm: React.FC<ListItemProps> = (props: any)=>{
    const [form] = Form.useForm();
    const [password,setPassword] = useState('')
    const onFinish = (values: any) => {
        console.log(values);
        values['Password'] = SHA256(values.Password).toString();
        props.submit(values);
        props.oncancel();
    };
    
    const onReset = () => {
        form.resetFields()
        props.oncancel()
    };
    const RandoNumber = ()=>{
        let number = ''
        for(let i= 0;i<8;i++){
            number += Math.floor(Math.random()*10);
        }
        let values = form.getFieldsValue();
        values = {
          ...values,
          Password:number
        }
        console.log(values,'values')
        setPassword(number)
        form.setFieldsValue(values)
    }
    return (<Form style={{paddingRight:"16%"}} {...layout} name="control-ref" form={form} onFinish={onFinish}>
    <Form.Item name="Name" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input />
    </Form.Item>
    <Form.Item name="Partment" label="所属机构" rules={[{ required: true, message: '请输入所属机构'  }]}>
      <Input />
    </Form.Item>
    <Form.Item name="Authority" label="权限" rules={[{ required: true, message: '请输入权限'  }]}>
      <Select
        placeholder="请选择权限"
        mode="tags"
        tokenSeparators={[',']}
        allowClear
      >
        {Object.keys(AuthorityEnum).map(item=><Option value={item}>{AuthorityEnum[item as keyof typeof AuthorityEnum]}</Option>)}
      </Select>
    </Form.Item>
    <Form.Item name="Password" label="登录密码" rules={[{ required: true , message: '请输入登录密码'}]}>
      <Input value={password} onChange={(e)=>{
        let values = form.getFieldsValue();
        values = {
          ...values,
          Password:e.target.value
        }
        setPassword(e.target.value)
        form.setFieldsValue(values)
      }}/> <Button onClick={RandoNumber} style={{marginTop:10}}>随机生成密码</Button>
    </Form.Item>
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        确定
      </Button>
      <Button htmlType="button" onClick={onReset} style={{marginLeft:20}}>
        取消
      </Button>
    </Form.Item>
  </Form>)
}
export default AddUserForm
import React from 'react';
import { Button, Card,Row,Col, Form, Input,DatePicker } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker
interface ListItemProps {
    search: Function
}
const RecommendLogSearchForm: React.FC<ListItemProps> = (props)=>{
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        if(values.CreateTime){
          values['BeginTime'] = moment(values.CreateTime[0].format("YYYY-MM-DD")).unix();
          values['EndTime' ] =  moment(values.CreateTime[1].format("YYYY-MM-DD")).unix();
        }
        delete values.CreateTime
        if(!values['Name']){
          delete values.Name
        }
        if(!values['Birthday']){
          delete values.Birthday
        }else{
          values.Birthday = moment(values.Birthday.format("YYYY-MM-DD")).unix()
        }
        props.search(values)
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const resetFields = ()=>{
          form.resetFields()
      }
    return (<Card title="搜索" bordered={false}>
    <Form
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Row>
        <Col span={12}>
        <Form.Item
          label="姓名"
          name="Name"
        >
          <Input style={{width:"90%"}}/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          label="创建时间"
          name="CreateTime"
        > 
        <RangePicker style={{width:"90%"}}  format="YYYY-MM-DD"/>
        </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}> 
        <Form.Item
          label="出生日期"
          name="Birthday"
        >
          <DatePicker style={{width:"90%"}} format="YYYY-MM-DD"/>
        </Form.Item>
        </Col>   
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button style={{marginRight:20}} onClick={resetFields}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form></Card>)

}

export default RecommendLogSearchForm

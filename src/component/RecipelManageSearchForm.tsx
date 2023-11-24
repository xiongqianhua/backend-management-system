import React from 'react';
import { Button, Card,Row,Col, Form, Input,DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
interface ListItemProps {
    search: Function
}
const RecommendLogSearchForm: React.FC<ListItemProps> = (props)=>{
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Success:', values);
        if(values.CreateTime){
          values['BeginTime'] = parseInt(values.CreateTime[0].format('X'))
          values['EndTime' ] =  parseInt(values.CreateTime[1].format('X'))
        }
        delete values.CreateTime
        if(!values.Title){
          delete values.Title
        }
        if(!values.CreateBy){
          delete values.CreateBy
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
          label="处方标题"
          name="Title"
        >
          <Input style={{width:"90%"}}/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item
          label="创建时间"
          name="CreateTime"
        >
        <RangePicker style={{width:"90%"}} format="YYYY-MM-DD" />
        </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}> 
        <Form.Item
          label="创建人"
          name="CreateBy"
        >
          <Input style={{width:"90%"}} />
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

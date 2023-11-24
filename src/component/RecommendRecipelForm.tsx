import React,{useState} from 'react';
import { Button, Form, Input, Radio, DatePicker } from 'antd';
import moment from 'moment';
import {PromotionProjectv1,PromotionProjectv2,PhysiqueTestResEnum,SportsRiskRatingEnum,PhysicalLevelEnum} from '../utils/static';
interface ListItemProps {
  submitRecommendRecipelForm: Function
}
const RecommendRecipelForm: React.FC<ListItemProps> = (props: any) => {
    const [form] = Form.useForm();
    const [age,setAge] = useState(0);
    const [visible,setVisible] = useState(false)
    const [healthResult,setHealthResult] = useState(null)
    const onFinish = (values: any) => {
      console.log('Success:', values);
      values['Birthday'] = moment(values['Birthday'].format("YYYY-MM-DD")).unix()
      values['PhysicalLevel'] = parseInt(values['PhysicalLevel'])
      values['HealthResult'] = parseInt(values['HealthResult'])
      values['PhysiqueTestRes'] = parseInt(values['PhysiqueTestRes'])
      values['SportsRiskRating'] = parseInt(values['SportsRiskRating'])
      props.submitRecommendRecipelForm(values)
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    const resetFields = ()=>{
        form.resetFields()
    }
    const getPromotionProject = ()=>{
      let result: JSX.Element[] = []
      if(age && 6 <= age && age <= 8){
        result = PromotionProjectv1.map(item=><Radio value={item} key={item}>{item}</Radio>)
      }else if(age && 9 <= age && age <= 12){
        result = PromotionProjectv2.map(item=><Radio value={item} key={item}>{item}</Radio>)
      }
      return result
    }
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          PhysicalLevel:0,
          HealthResult:0,
          PhysiqueTestRes:0,
          SportsRiskRating:0
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="姓名"
          name="Name"
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input style={{width:201}}/>
        </Form.Item>
        <Form.Item
          label="性别"
          name="Sex"
          rules={[{ required: true, message: '请输入性别!' }]}
        >
          <Radio.Group>
            <Radio value="man">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="出生日期"
          name="Birthday"
          rules={[{ required: true, message: '请输入出生日期!' }]}
        >
          <DatePicker placeholder='出生日期' format="YYYY-MM-DD" onChange={ v =>{
            if(v){
              const nowTime = new Date().getTime()/1000; 
              const birthDayTime = moment(v.format("YYYY-MM-DD")).unix();
              const AGE = Math.ceil((nowTime - birthDayTime)/(365*12*24*360));
              console.log(AGE)
              if(6<=AGE && AGE <=12){
                setAge(AGE)
                setVisible(true)
              }else{
                setVisible(false)
              }
            }
          }}/>
        </Form.Item>
        {visible?<Form.Item
          label="提升项目"
          name="PromotionProject"
          rules={[{ required: true, message: '请输入可提升项目' }]}
        >
          <Radio.Group>
            {getPromotionProject()}
          </Radio.Group>
        </Form.Item>:null}
        <Form.Item
          label="体力活动水平"
          name="PhysicalLevel"
          rules={[{ required: true, message: '请输入体力活动水平' }]}
        >
          <Radio.Group>
          { Object.keys(PhysicalLevelEnum).map((item: string)=> <Radio key={item} value={item}>{PhysicalLevelEnum[item as keyof typeof PhysicalLevelEnum]}</Radio>)}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="健康筛查结果"
          name="HealthResult"
          rules={[{ required: true, message: '请输入健康筛查结果' }]}
        > { healthResult !== '0'?
          <Radio.Group  onChange={(e)=>{
            setHealthResult(e.target.value)
            let values = form.getFieldsValue();
            values = {
              ...values,
              HealthResult:e.target.value
            }
            form.setFieldsValue(values)
         }}>
          <Radio key={'1'} value={'1'}>健康（无运动系统、神经系统相关疾病病史；精神状态正常、无心理精神疾患；近6个月内无受伤史）</Radio>
          <Radio key={'-1'} value={'-1'}>健康（无心血管、代谢疾病及运动禁忌症等） </Radio>
          <Radio key={'-2'} value={'-2'}>体质较弱（无心血管、代谢疾病及运动禁忌症等）</Radio>
          <Radio key={'0'} value={'0'}>其他</Radio>
          </Radio.Group> : <Input onChange={ e => {
            let values = form.getFieldsValue();
            values = {
              ...values,
              HealthResult: '0',
              HealthResultDetail: e.target.value
            }
            form.setFieldsValue(values)
          }}/> }
        </Form.Item>
        <Form.Item
          label="体制检测结果"
          name="PhysiqueTestRes"
          rules={[{ required: true, message: '请输入体制检测结果！' }]}
        > 
         <Radio.Group>
         {Object.keys(PhysiqueTestResEnum).map((item: string)=> <Radio key={item} value={item}>{PhysiqueTestResEnum[item as keyof typeof PhysiqueTestResEnum]}</Radio>)}
       </Radio.Group>
        </Form.Item>
        <Form.Item
          label="运动风险等级"
          name="SportsRiskRating"
          rules={[{ required: true, message: '请输入运动风险等级' }]}
        >
          <Radio.Group>
          {Object.keys(SportsRiskRatingEnum).map((item: string)=> <Radio key={item} value={item}>{SportsRiskRatingEnum[item as keyof typeof SportsRiskRatingEnum]}</Radio>)}
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button style={{marginRight:20}} onClick={resetFields}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            推荐运动处方
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default RecommendRecipelForm;
import React from 'react';
import { Button, Form, Input, Radio, Card, Select, message,DatePicker,Breadcrumb} from 'antd';
import service from '../../utils/request';
import {PhysiqueTestResEnum,HealthResultEnum,SportsRiskRatingEnum,PhysicalLevelEnum} from '../../utils/static';
const CreateRecipel = ()=>{
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        values['CaseDate'] =  parseInt(values.CaseDate.format('X'))
        values.PhysicalLevel = parseInt(values.PhysicalLevel)
        values.HealthResult = parseInt(values.HealthResult)
        values.PhysiqueTestRes = parseInt(values.PhysiqueTestRes)
        values.SportsRiskRating = parseInt(values.SportsRiskRating)
        console.log('Success:', values);
        service({
          method: 'POST',
          url: 'template',
          data: values
        })
          .then((res: any) => {
            if (res.code !== 201) {
              message.error(res.errorMsg || '请求出错')
              return
            }
            message.success('创建成功！')
          })
          .catch((e) => {
            message.error('请求出错:' + e)
          })
      };
      const onFinishFailed = (errorInfo: any) => {
        message.error('输入数据有误，请仔细检查！')
        console.log('Failed:', errorInfo);
      };
      const resetFields = () => {
        form.resetFields()
      }
    const FormWrite = () => (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="处方标题"
            name="Title"
            rules={[{ required: true, message: '请输入处方标题!' }]}
          >
            <Input style={{ width: 400 }} />
          </Form.Item>
          <Card title="适用人群" bordered={false}>
            <Form.Item
              label="适用人群"
              name="People"
              rules={[{ required: true, message: '请输入适用人群!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item></Card>
          <Card title="运动前基础水平" bordered={false}>
            <Form.Item
              label="体力活动水平"
              name="PhysicalLevel"
              rules={[{ required: true, message: '请输入体力活动水平!' }]}
            >
              <Radio.Group>
              {Object.keys(PhysicalLevelEnum).map((item: string)=> <Radio key={item} value={item}>{PhysicalLevelEnum[item as keyof typeof PhysicalLevelEnum]}</Radio>)}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="健康筛查结果"
              name="HealthResult"
              rules={[{ required: true, message: '请输入健康筛查结果!' }]}
            >
              <Select style={{ width: 400 }}>
              {Object.keys(HealthResultEnum).map((item: string)=> <Radio key={item} value={item}>{HealthResultEnum[item as keyof typeof HealthResultEnum]}</Radio>)}
              </Select>
            </Form.Item>
            <Form.Item
              label="体制检测结果"
              name="PhysiqueTestRes"
              rules={[{ required: true, message: '请输入体制检测结果!' }]}
            >   
                <Radio.Group>
                {Object.keys(PhysiqueTestResEnum).map((item: string)=> <Radio key={item} value={item}>{PhysiqueTestResEnum[item as keyof typeof PhysiqueTestResEnum]}</Radio>)}
                </Radio.Group>
            </Form.Item>
            <Form.Item
              label="运动风险等级"
              name="SportsRiskRating"
              rules={[{ required: true, message: '请输入运动风险等级！' }]}
            >
              <Radio.Group>
              {Object.keys(SportsRiskRatingEnum).map((item: string)=> <Radio key={item} value={item}>{SportsRiskRatingEnum[item as keyof typeof SportsRiskRatingEnum]}</Radio>)}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="存在主要问题"
              name="MainQuesion"
              rules={[{ required: false, message: '请输入存在主要问题!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item></Card>
          <Card title="运动处方" bordered={false}>
            <Form.Item
              label="目的"
              name="Purpose"
              rules={[{ required: true, message: '请输入目的!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="方式"
              name="Mode"
              rules={[{ required: true, message: '请输入方式!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="强度"
              name="Intensity"
              rules={[{ required: true, message: '请输入强度!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="时间"
              name="Time"
              rules={[{ required: true, message: '请输入时间!' }]}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频率"
              name="Frequency"
              rules={[{ required: true, message: '请输入频率!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="周运动量"
              name="ExerciseWeekendCount"
              rules={[{ required: true, message: '请输入周运动量!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="运动进阶"
              name="MotionProgression"
              rules={[{ required: true, message: '请输入运动进阶!' }]}
            >
               <Select  mode="tags"/>
            </Form.Item>
            <Form.Item
              label="运动周期"
              name="MovementCycle"
              rules={[{ required: true, message: '请输入运动周期!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item></Card>
          <Card title="运动处方具体内容" bordered={false}>
            <Form.Item
              label="热身"
              name="WarmUp"
              rules={[{ required: true, message: '请输入热身!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="正式运动"
              name="FormalMovement"
              rules={[{ required: true, message: '请输入正式运动!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="放松"
              name="Relax"
              rules={[{ required: true, message: '请输入放松!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="拉伸"
              name="Stretching"
              rules={[{ required: true, message: '请输入拉伸!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="注意事项"
              name="Attention"
              rules={[{ required: true, message: '请输入注意事项!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item></Card>
          <Card title="运动处方效果评估" bordered={false}>
            <Form.Item
              label="预期改善效果"
              name="Expection"
              rules={[{ required: true, message: '请输入预期改善效果!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
           </Card>
           <Card title="处方来源" bordered={false}> 
            <Form.Item
              label="运动处方师"
              name="PrescriptionTeacher"
              rules={[{ required: true,message: '请输入运动处方师!' }]}
            >
               <Select  mode="tags"/>
            </Form.Item>
            <Form.Item
              label="机构名称"
              name="Organization"
              rules={[{ required: true, message: '请输入机构名称!' }]}
            >
              <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="日期"
              name="CaseDate"
              rules={[{ required: true, message: '请输入日期!' }]}
            > 
                <DatePicker style={{width:"90%"}} format="YYYY-MM-DD"/>
            </Form.Item></Card>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{ marginRight: 20 }} onClick={resetFields}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      );
    return <div>
        <Breadcrumb>
        <Breadcrumb.Item href="recipelManage">处方管理</Breadcrumb.Item>
        <Breadcrumb.Item>新建处方</Breadcrumb.Item>
      </Breadcrumb>
        <FormWrite/>
    </div>
}
export default CreateRecipel
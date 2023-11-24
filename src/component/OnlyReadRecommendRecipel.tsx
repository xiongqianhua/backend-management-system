import React from 'react';
import { Button, Form, Card } from 'antd';
import moment from 'moment';
import Download from '../utils/downloadPDF';
import { PhysiqueTestResEnum,HealthResultEnum,SportsRiskRatingEnum, PhysicalLevelEnum} from '../utils/static';

interface ListItemProps {
    data: object
}

const FormReadOnly: React.FC<ListItemProps> = (props)=> {
    console.log(props)
    const Data: {
      Title?: string,
      PrescriptionTeacher?: string,
      Organization?: string,
      CaseDate?: string,
      People?: string,
      PhysicalLevel?: number,
      SportsRiskRating?: string,
      HealthResult?: number,
      MainQuesion?: string,
      PhysiqueTestRes?: number,
      Purpose?: number,
      Mode?: string,
      Intensity?: string,
      Time?: number,
      Frequency?: string,
      ExerciseWeekendCount?: string,
      MotionProgression?: any[],
      MovementCycle?: string,
      WarmUp?: string,
      FormalMovement?: string,
      Relax?: string,
      Stretching?: string,
      Attention?: string,
      Expection?: string,
    } = props.data
    const Time = moment((parseInt(Data.CaseDate || '0')) * 1000).format('YYYY-MM-DD HH:mm:ss')
    const download = ()=>{
      Download(Data?.Title);
    }
    const print = ()=>{
        // 获取打印内容
    let Pdiv:any = document.getElementById('recipelOnlyReadFormId')
    // 创建iframe
    let iframe:any = document.createElement('IFRAME')
    iframe.setAttribute(
      'style',
      'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'
    )
    
    document.body.appendChild(iframe)
    let doc = iframe.contentWindow.document
    // 打印时去掉页眉页脚
    doc.write('<style media="print">@page {size: auto;  margin: 0mm; }</style>')
    // 打印内容放入iframe中
    doc.write(Pdiv.innerHTML)
    let ys = 'html,body{height:auto;fontSize:16}'
    let style = document.createElement('style')
    style.innerText = ys
    doc.getElementsByTagName('head')[0].appendChild(style)
    doc.close()
    // 开始打印iframe内容
    iframe.contentWindow.focus()
    iframe.contentWindow.print()
    if (navigator.userAgent.indexOf('MSIE') > 0) {
      //打印完删除iframe
      document.body.removeChild(iframe)
    }
    }
    return (<div><div id='recipelOnlyReadFormId'>
    <Card title="基本信息" bordered={false} >
        <Form.Item
          label="处方标题"
        >
          {Data.Title}
        </Form.Item>
        <Form.Item
          label="适用人群"
        >
          {Data.People}
        </Form.Item>
    </Card>
    <Card title="运动前基础水平" bordered={false}>
    <Form.Item
          label="体力活动水平"
        >
          {PhysicalLevelEnum[JSON.stringify(Data.PhysicalLevel)]}
        </Form.Item>
        <Form.Item
          label="运动风险等级"
        >
          {SportsRiskRatingEnum[JSON.stringify(Data.SportsRiskRating)]}
        </Form.Item>
        <Form.Item
          label="健康筛查结果"
        >
          {HealthResultEnum[JSON.stringify(Data.HealthResult)]}
        </Form.Item>
        <Form.Item
          label="存在主要问题"
        >
          {Data.MainQuesion}
        </Form.Item>
        <Form.Item
          label="体质检测结果"
        >
          {PhysiqueTestResEnum[JSON.stringify(Data.PhysiqueTestRes)]}
        </Form.Item>
    </Card>
    <Card title="运动处方" bordered={false}>
    <Form.Item
          label="目的"
        >
          {Data.Purpose}
        </Form.Item>
        <Form.Item
          label="方式"
        >
          {Data.Mode}
        </Form.Item>
        <Form.Item
          label="强度"
        >
          {Data.Intensity}
        </Form.Item>
        <Form.Item
          label="时间"
        >
          {Data.Time}
        </Form.Item>
        <Form.Item
          label="频率"
        >
          {Data.Frequency}
        </Form.Item>
        <Form.Item
          label="周运动量"
        >
          {Data.ExerciseWeekendCount}
        </Form.Item>
        <Form.Item
          label="运动进阶"
        >
          {Data.MotionProgression	}
        </Form.Item>
        <Form.Item
          label="运动周期"
        >
          {Data.MovementCycle	}
        </Form.Item>
    </Card>
    <Card title="运动处方具体内容" bordered={false}>
    <Form.Item
          label="热身"
        >
          {Data.WarmUp}
        </Form.Item>
        <Form.Item
          label="正式运动"
        >
          {Data.FormalMovement}
        </Form.Item>
        <Form.Item
          label="放松"
        >
          {Data.Relax}
        </Form.Item>
        <Form.Item
          label="拉伸"
        >
          {Data.Stretching}
        </Form.Item>
        <Form.Item
          label="注意事项"
        >
          {Data.Attention}
        </Form.Item>
    </Card>
    <Card title="运动处方效果评估" bordered={false}>
      <Form.Item
          label="回访时间"
        >
          {Time}
        </Form.Item>
        <Form.Item
          label="预期改善效果"
        >
          {Data.Expection}
        </Form.Item>
    </Card>
    </div><div>
      <Button onClick={print} style={{marginRight:20}}>打印</Button>
      <Button onClick={download}>下载</Button>
    </div></div>)
}
export default FormReadOnly
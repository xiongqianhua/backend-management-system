import React, { useState } from 'react';
import { Card, Breadcrumb,message } from 'antd';
import RecommendRecipelDetailForm from '../../component/RecommendRecipelDetailForm';
import RecommendRecipelForm from '../../component/RecommendRecipelForm';
import service from '../../utils/request';

const RecommendRecipel = () => {
  const [showRecommend, setShowRecommend] = useState(true)
  const [data, setData] = useState({})

  const getBestTemplate = (values: any)=> {
    service({
      method: 'POST',
      url: 'template/best',
      data: {
        Birthday:values.Birthday,
        PhysicalLevel:values.PhysicalLevel,
        HealthResult:values.HealthResult,
        PhysiqueTestRes:values.PhysiqueTestRes,
        SportsRiskRating:values.SportsRiskRating
      }
    })
      .then((res: any) => {
        if (res.code !== 200) {
          message.error(res.errorMsg || '请求出错')
          return
        }
        const param = {
          ...values,...res.data.info
        }
        param.PhysicalLevel = JSON.stringify(param.PhysicalLevel)
        param.HealthResult	 = JSON.stringify(param.HealthResult	)
        param.SportsRiskRating	= JSON.stringify(param.SportsRiskRating)
        param.PhysiqueTestRes = JSON.stringify(param.PhysiqueTestRes)
        setData(param)
        setShowRecommend(false)
      })
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }
  const submitRecommendRecipelForm = (values: any) => {
    if (values) {
      getBestTemplate(values)
    }
  }
  
  const Bread = () => {
    if (!showRecommend) {
      return <Breadcrumb>
        <Breadcrumb.Item href="recommendRecipel">推荐处方</Breadcrumb.Item>
        <Breadcrumb.Item>推荐运动处方</Breadcrumb.Item>
      </Breadcrumb>
    } else {
      return null
    }
  }
  return (<div>{Bread()}
    {showRecommend ? <Card title="推荐处方" bordered={false}>
      <RecommendRecipelForm submitRecommendRecipelForm={submitRecommendRecipelForm} />
    </Card> : <RecommendRecipelDetailForm data={data} />}
  </div>);
};

export default RecommendRecipel;
import React,{useState,useEffect} from 'react';
import OnlyReadRecommendRecipel from '../../component/OnlyReadRecommendRecipel'
import {Breadcrumb} from 'antd';
interface ListItemProps{

}
const Details: React.FC<ListItemProps> = (props)=>{
    const [data,setData] = useState({})
    useEffect(()=>{
        setData(JSON.parse(sessionStorage.getItem('/manageDetails') || ''))
    },[])
    return <div>
        <Breadcrumb>
        <Breadcrumb.Item href="recipelManage">处方管理</Breadcrumb.Item>
        <Breadcrumb.Item>详情</Breadcrumb.Item>
      </Breadcrumb>
        <OnlyReadRecommendRecipel data={data}/>
    </div>
}
export default Details
import React,{useState,useEffect} from 'react';
import OnlyReadRecommendRecipel from '../../component/OnlyReadRecommendRecipel'
import {Breadcrumb} from 'antd';
interface ListItemProps{

}
const Details: React.FC<ListItemProps> = ()=>{
    const [data,setData] = useState({})
    useEffect(()=>{
        setData(JSON.parse(sessionStorage.getItem('/LogDetails') || ''))
    },[])
    return <div>
        <Breadcrumb>
        <Breadcrumb.Item href="recommendLog">推荐记录</Breadcrumb.Item>
        <Breadcrumb.Item>详情</Breadcrumb.Item>
      </Breadcrumb>
        <OnlyReadRecommendRecipel data={data}/>
    </div>
}
export default Details
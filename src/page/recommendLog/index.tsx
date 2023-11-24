import { Table,message } from 'antd';
import React ,{ useState,useEffect } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import RecommendLogSearchForm from '../../component/RecommendLogSearchForm';
import service from '../../utils/request';
import moment from 'moment';
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
interface ListItemProps {
  router?: any
}
const RecommendLog: React.FC<ListItemProps>  = (props) => {
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(false);
  const [page ,setPage] = useState({ current: 1, pageSize: 10, total: 0 });
  const search = (values: any)=>{
    console.log(values)
    if(values)
    service({
      method: 'GET',
      url: 'case',
      params: {
        ...values,
        Limit: page.pageSize,
        Offset: (page.current-1) * page.pageSize
      }
    })
      .then((res: any) => {
        if (res.code !== 200) {
          message.error(res.errorMsg || '请求出错')
          return
        }
        page.total = res.data.count
        setPage(page)
        setLoading(false)
        setData(res.data.rows)
      })
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }
  useEffect(()=>{
    search({})
  },[page])
  const details = (row: any)=>{
    console.log(row)
    sessionStorage.setItem('/LogDetails',JSON.stringify(row))
    props.router.navigate('/LogDetails')
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'Name',
    },
    {
      title: '出生日期',
      dataIndex: 'Birthday',
      render: (val) => moment(val * 1000).format('YYYY-MM-DD')
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      render: (val) => moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '详情',
      dataIndex: '_id',
      render:(val,row)=><a onClick={()=> details(row)}>详情</a>
    },
  ];
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    const PAGE = {
      current:pagination.current || 1, pageSize: pagination.pageSize || 10, total: pagination.total || 0
    }
    setPage(PAGE)
  };
  return (
   <div>
    <RecommendLogSearchForm search={search}/>
    <Table columns={columns} dataSource={data} onChange={onChange} loading={loading} pagination={page}/>
   </div>
  );
};

export default RecommendLog;
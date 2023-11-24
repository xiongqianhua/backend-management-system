import { Table,Button,message } from 'antd';
import React,{useState,useEffect} from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import RecipelManageSearchForm from '../../component/RecipelManageSearchForm';
import service from '../../utils/request';
import moment from 'moment';
interface DataType {
  _id: string;
  Name: string;
  CreateTime: string;
  CreateBy: string;
}
interface ListItemProps {
  router?: any
}
const RecipelManage: React.FC<ListItemProps> = (props)=> {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [page ,setPage] = useState({ current: 1, pageSize: 10, total: 0 });
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    const PAGE = {
      current:pagination.current || 1, pageSize: pagination.pageSize || 10, total: pagination.total || 0
    }
    setPage(PAGE)
  };
  const search = (values: object)=> {
    setLoading(true)
    service({
      method: 'GET',
      url: 'template',
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
  const details = (row: object)=>{
    sessionStorage.setItem('/manageDetails',JSON.stringify(row))
    props.router.navigate('/ManageDetails')
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '处方标题',
      dataIndex: 'Title',
    },
    {
      title: '创建人',
      dataIndex: 'CreateBy',
    },
    {
      title: '创建时间',
      dataIndex: 'CreateTime',
      render: (val) => moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作',
      dataIndex: '_id',
      render:(val,row)=><a onClick={()=>details(row)}>查看</a>
    },
  ];
  const createRecipel = ()=>{
      props.router.navigate('/CreateRecipel')
  }
  return (
   <div>
    <RecipelManageSearchForm search={search}/>
    <Button type='primary' onClick={createRecipel}>新建处方</Button>
    <Table columns={columns} dataSource={data} onChange={onChange} loading={loading} pagination={page}/>
   </div>
  );
};

export default RecipelManage;
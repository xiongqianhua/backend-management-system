import { Button, Card, Modal, Table, message, Select,} from 'antd';
import React, { useState,useEffect} from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import AddUserForm from '../../component/AddUserForm';
import service from '../../utils/request';
import { AuthorityEnum } from '../../utils/static';
import moment from 'moment';
const { Option } = Select;

const App = () => {
  const [visible, setvisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleUpdate,setVisibleUpdate] = useState(false)
  const [id, setId] = useState(null)
  const [Authority,setAuthority] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState({ current: 1, pageSize: 10, total: 0 })

  interface DataType {
    _id: React.Key;
    Name: string;
    CreateTime: number;
    Partment: string;
  }
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    const Page = {
      current: pagination.current || 0,
      pageSize: pagination.pageSize || 10,
      total: pagination.total || 0
    }
    console.log(Page)
    setPage(Page);
  };
  const getUserList = () => {
    setLoading(true)
    console.log(page)
    service({
      method: 'GET',
      url:'user',
      params:{
        Limit: page.pageSize,
        Offset: (page.current-1) * page.pageSize
      }
    })
      .then((res: any) => {
        if (res.code !== 200) {
          message.error(res.errorMsg || '请求出错')
          return
        } else {
          page.total = res.data.count
          setData(res.data.rows || [])
          setPage(page)
          setLoading(false)
        }
      })
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }
  useEffect(()=>{
    getUserList()
  },[page])
  const update = () => {
    if(!id) return
    const values = {Authority:Authority}
    service({
      method: 'PATCH',
      url: 'user/' + id,
      data: values
    })
      .then((res: any) => {
        if (res.code !== 201) {
          message.error(res.errorMsg || '请求出错')
        } else {
          setVisibleUpdate(false)
          getUserList()
        }
      })
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }
  const deleteUser = (row: any) => {
    service({
      method: 'DELETE',
      url: 'user/' + row._id,
    })
      .then(()=> getUserList())
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'Name',
    },
    {
      title: '所属机构',
      dataIndex: 'Partment',
    },
    {
      title: '权限',
      dataIndex: 'Authority',
      render:val=> val ? val.map((item: any)=> AuthorityEnum[item as keyof typeof AuthorityEnum] + ';'): '无'
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
      render: (val, row: any) => <span>
          <a onClick={()=>{
            setAuthority(row.Authority || []);
            setId(val);
            setVisibleUpdate(true)
          }}>更新</a> | <a onClick={() => deleteUser(row)}>删除</a></span>
    },
  ];

  const submit = (values: any) => {
    service({
      method: 'POST',
      url: 'user',
      data: values
    })
      .then((res: any) => {
        console.log(res)
        if (res.code !== 201) {
          message.error(res.errorMsg || '请求出错')
          return
        }
        getUserList()
      })
      .catch((e) => {
        message.error('请求出错:' + e)
      })
  }

  return (
    <Card title="用户管理" bordered={false}>
      <Button type='primary' onClick={() => setvisible(true)}>新增用户</Button>
      <Table columns={columns} dataSource={data} onChange={onChange} loading={loading} pagination={page}/>
      <Modal
        title="新增用户"
        width={800}
        visible={visible}
        onCancel={() => setvisible(false)}
        footer={null}>
        <AddUserForm submit={submit} oncancel={() => setvisible(false)} />
      </Modal>
      <Modal
        title="修改用户权限"
        width={800}
        visible={visibleUpdate}
        onCancel={() => setVisibleUpdate(false)}
        onOk={update}>
        <Select
        style={{width:700}}
        placeholder="请选择权限"
        mode="tags"
        tokenSeparators={[',']}
        onChange={(v)=> setAuthority(v)}
        defaultValue={Authority}
        value={Authority}
        allowClear
      >
        {Object.keys(AuthorityEnum).map(item=><Option value={item}>{AuthorityEnum[item as keyof typeof AuthorityEnum]}</Option>)}
      </Select>
      </Modal>
    </Card>
  );
};

export default App;
import React from 'react';
import { Button, Popover,message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import service from '../utils/request';
interface ListItemProps{
  router: object
}
const UserInfo: React.FC<ListItemProps> = (props: any) => {
    const userInfo: any = JSON.parse(sessionStorage.getItem('userInfo')|| '')
    console.log(userInfo)
    const loginOff = () => {
        service({
            method: 'DELETE',
            url: 'logout',
          })
            .then(() => {
              //跳转到首页
              sessionStorage.removeItem('JWT');
              sessionStorage.removeItem('userInfo');
              props.router.navigate('/login');
              window.location.reload();
            })
            .catch((e) => {
              message.error('请求出错:' + e);
            })
    }
    const content = (
        <div className="userInfoWrapper">
            <UserOutlined />
            <p>{userInfo.Name}</p>
            <p>{userInfo.Partment}</p>
            <Button type="primary" onClick={loginOff}>退出登录</Button>
        </div>
    );
    return (<Popover content={content} title="登录用户">
        <span className='userName'>{userInfo.Name}</span><UserOutlined />
    </Popover>)
}
export default UserInfo
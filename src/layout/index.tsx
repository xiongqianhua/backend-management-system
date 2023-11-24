/*
 * @Author: qianhua.xiong
 */
import React, { useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import RouterPage from '../router';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../style/layout.scss';
import UserInfo from '../component/UserInfo';
import Login from '../page/login/index';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const getURL = ()=> {
    console.log(window.location.href)
    const url = window.location.href
    const array = ['/recommendRecipel','/recommendLog','/recipelManage','/userManage']
    let result = '/recommendLog'
    array.map(item=>{
        if(url.search(item) != -1){
            result = item
        }
    })
    return result
}
const LayoutContent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [collapsed, setCollapsed] = useState(false);
    const [sekectKeys, setSelectKeys] = useState([getURL() || '/recommendLog'])
    
    const MenuChange = (value: any) => {
        if (value) {
            setSelectKeys([value.key])
            navigate(value.key)
        }else{
            setSelectKeys(['/recommendLog'])
            navigate('/recommendLog')
        }
    }
    const url = window.location.href
    const isloginPage =  url.indexOf('/login') > -1 || !sessionStorage.getItem('userInfo') 
    console.log(url)
    //key值要跟路由路径保持一致，并且唯一
    let items: MenuItem[] = [
        getItem('推荐记录', '/recommendLog', <FileOutlined />),
    ];
    const Authority = JSON.parse(sessionStorage.getItem('userInfo') || '[]') || []
    console.log(Authority, 'Authority')
    if (Authority.includes('case')) {
        items.push(getItem('推荐处方', '/recommendRecipel', <DesktopOutlined />))
    }
    if (Authority.includes('template')) {
        items.push(getItem('处方管理', '/recipelManage', <PieChartOutlined />))
    } 
    if (Authority.includes('user')) {
        items.push(getItem('权限管理', '/userManage', <TeamOutlined />))
    }
    return (
        isloginPage ? <Login router={{ location, navigate, params }} /> : <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} width={220}>
                <div className="logo">XXX推荐管理平台</div>
                <Menu theme="dark" defaultSelectedKeys={sekectKeys} mode="inline" items={items} onClick={MenuChange} />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ display:"flex",flexDirection:"row-reverse",padding:"0 80px" }}>
                    <UserInfo router={{ location, navigate, params }}/>
                </Header>
                <Content style={{}}>
                    <div className="site-layout-background" style={{ margin: '16px',padding: 24, minHeight: 360 }}>
                        <RouterPage router={{ location, navigate, params }} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>XXX推荐管理平台</Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutContent;
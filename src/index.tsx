
import React from 'react';
import ReactDOM from 'react-dom';
import LayoutPage from './layout/index';
import { BrowserRouter} from "react-router-dom";
import Login from './page/login/index';
import './index.scss';
const user = localStorage.getItem('userInfo') || 'lily';
const App: any = () => user ?(
      <BrowserRouter>
            <LayoutPage/>
      </BrowserRouter>
):<Login/>;
ReactDOM.render(<App/>, document.getElementById('root'));
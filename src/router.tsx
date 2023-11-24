import React from 'react'
import { Routes, Route } from "react-router-dom";
import RecommendRecipel from './page/recommendRecipel/index';
import RecommendLog from './page/recommendLog/index';
import RecipelManage from './page/recipelManage/index';
import UserManage from './page/userManage/index';
import PropTypes from 'prop-types';
import CreateRecipel from './page/recipelManage/createRecipel';
import Details from './page/recommendLog/details';
import ManageDetails from './page/recipelManage/details';

class RouterPage extends React.Component {
  constructor(props: any) {
		super(props)
        this.state = {}
  }
  static propTypes = {
    router: PropTypes.object.isRequired,
  };
    render() {
        return (
            <Routes>
                <Route path='/' element={<RecommendRecipel {...this.props} />} />
                <Route path='/recommendRecipel' element={<RecommendRecipel {...this.props} />} />
                <Route path='/recommendLog' element={<RecommendLog {...this.props} />} />
                <Route path='/recipelManage' element={<RecipelManage {...this.props} />} />
                <Route path='/userManage' element={<UserManage {...this.props} />} />
                <Route path='/CreateRecipel' element={<CreateRecipel {...this.props}/>}/>
                <Route path='/LogDetails' element={<Details {...this.props}/>}/>
                <Route path='/ManageDetails' element={<ManageDetails {...this.props}/>}/>
            </Routes>)
    }
}

export default RouterPage

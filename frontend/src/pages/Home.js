import React from 'react';
import {Route, Switch} from 'react-router-dom';
import '../assets/css/main.css';
import {
    Main,
    Contacts,
    MarketWrite,
    Review,
    Market,
    Notice,
    NoticeDetail,
    Application,
    Reports,
} from './index';
import {Navigator, Footer} from '../commons/index';
import {VideoUploadPage} from '../components';
import MovingType from '../components/move/component/MovingType';
import {MovingEstimateForm} from '../components/move/component';
import {CustomerInfo, Order, Statistics} from './CompanyPage';
import {
    Signup,
    Login,
    FindId,
    FindPassword,
    UserMyPage,
    AdminMyPage,
} from './account';
import ModalTest from '../components/modalTest/ModalTest';
import VideoTest from '../components/videoUpload/VideoTest';
import Weather from '../components/weather/Weather';
import VideoCommunity from '../components/videoUpload/VideoCommunity';
import UserInfo from './community/UserInfo';
import MovingEstimateFormTwo from "../components/move/component/MovingEstimateFormTwo";
import Charts from "./admin/Charts";

const Home = () => {
    return (
        <>
            <Navigator/>
            <Switch>
                <Route exact path={'/'}>
                    <Main/>
                </Route>
                <Route path={'/notice'} component={Notice}/>
                <Route path={'/noticedetail'} component={NoticeDetail}/>
                <Route path={'/review'} component={Review}/>
                <Route path={'/market'} component={Market}/>
                <Route path={'/contacts'} component={Contacts}/>
                <Route path={'/write'} component={MarketWrite}/>
                <Route path={'/video'} component={VideoUploadPage}/>
                <Route path={'/type'} component={MovingType}/>
                <Route path={'/estimate'} component={MovingEstimateForm}/>
                <Route path='/login' component={Login}/>
                <Route path='/findId' component={FindId}/>
                <Route path='/findPassword' component={FindPassword}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/userMyPage' component={UserMyPage}/>
                <Route path='/adminMyPage' component={AdminMyPage}/>
                <Route path='/order' component={Order}/>
                <Route
                    path={`/customerInfo/:orderId`}
                    render={props => <CustomerInfo {...props} />}
                />
                <Route path='/statistics' component={Statistics}/>
                <Route path='/customerinfo' component={CustomerInfo}/>
                <Route path={'/notice'} component={Notice}/>
                <Route path={'/contacts'} component={Contacts}/>
                <Route path={'/test'} component={ModalTest}/>
                <Route path={'/videotest'} component={VideoTest}/>
                <Route path={'/wh'} component={Weather}/>
                <Route path={'/application'} component={Application}/>
                <Route path={'/reports'} component={Reports}/>
                <Route path={'/userInfo/:articleId'}
                       render={props => <UserInfo {...props} />}/>
                <Route path={'/videocommunity'} component={VideoCommunity}/>
                <Route path={"/estimatetwo"} component={MovingEstimateFormTwo}/>
                <Route path={"/charts"} component={Charts}/>
            </Switch>
            <Footer/>
        </>
    );
};

export default Home;

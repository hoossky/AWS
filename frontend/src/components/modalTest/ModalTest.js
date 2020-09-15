import React, {useState, useReducer} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Switch} from "react-router-dom";
import {MCalendar} from "../../pages";
import {
    MDBCardBody,
    MDBContainer,
    MDBJumbotron,
    MDBMask, MDBRow, MDBView, MDBBtn, MDBCol
} from "mdbreact";
import {Table} from "react-bootstrap";
import {useHistory} from "react-router";
import '../../assets/css/sb-admin-2.css'

const ModalTest = ({modalPage, show, handleClose, handlePage}) => {
    const [shows, setShow] = useState(false);
    const onClickShow = e => {
        setShow(!shows)
    }
    const initialState = {
        number: 0,
    }

    const today = () => {
        new Date()
    }
    const count = (state, action) => {
        switch (action.type) {
            case 'increment':
                return {number: state.number + 0.5};
            case 'initialize':
                return {number: 0};
            default:
                throw new Error();
        }
    }
    const [state, dispatch] = useReducer(count, initialState);

    const [regDate, setRegDate] = useState(0);
    const [number, setNumber] = useState(0)
    const history = useHistory();
    const [movingFrom, setMovingFrom] = useState('');
    const [movingTo, setMovingTo] = useState('');
    const [movingType, setMovingType] = useState('');
    const[movingThing,setMoingThing]=useState(0)
    const submitBtu = () => {
        const nonmemberJson = {
            movingType: movingType,
            movingFrom: movingFrom,
            movingTo: movingTo,
            movingPrice: (state.number * 20),
        };
        localStorage.setItem('nonmemberJson',JSON.stringify(nonmemberJson));
        const result = {
            movingPrice: (state.number * 20)
        }
        .log(result)

    }

    const handleSubmit = e => {
        e.preventDefault()
        const result = {
            movingPrice: (state.number * 20)
        }
        .log(result)

    }

    return (
        <div>
            <Modal dialogClassName='custom-dialog'show={show} onHide={handleClose}>
                {(modalPage === 1) &&
                <div className="modalImg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            이사종류
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body onClick={handlePage}>
                        <MDBRow>
                            <MDBCol md="5">
                                <MDBView hover>
                                    <button onClick={() => setMovingType('보관이사')}>
                                        <img
                                            src="https://image.flaticon.com/icons/svg/888/888448.svg"
                                            className="img-fluid"
                                            alt=""
                                        />
                                        <h3>보관이사</h3>
                                        <p>국내 최대 규모의 보관창고운영<br/>안전하고 깔끔한 보관서비스</p>
                                        <MDBMask className="flex-center" overlay="red-strong">
                                            <p className="white-text">보관이사</p>
                                        </MDBMask>
                                    </button>
                                </MDBView>
                            </MDBCol>
                            <MDBCol md="5">
                                <MDBView hover>
                                    <button  onClick={() => setMovingType('사무실이사')}>
                                        <img
                                            src="https://image.flaticon.com/icons/svg/1625/1625514.svg"
                                            className="img-fluid"
                                            alt=""
                                        /><h3>사무실이사</h3><p>회사,공장,병원,관공서,학교,학원 등의 이사</p>
                                        <MDBMask className="flex-center" overlay="red-strong">
                                            <p className="white-text">사무실이사</p>
                                        </MDBMask>
                                    </button>

                                </MDBView>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="5">
                                <MDBView hover>
                                    <button  onClick={() => setMovingType('집이사')}>
                                    <img
                                        src="https://image.flaticon.com/icons/svg/3023/3023392.svg"
                                        className="img-fluid"
                                        alt=""
                                    /><h3>집이사</h3><p>이삿짐이 1톤 이상의 짐</p>
                                    <MDBMask className="flex-center" overlay="red-strong">
                                        <p className="white-text">집이사</p>
                                    </MDBMask>
                                    </button>
                                </MDBView>
                            </MDBCol>
                            <MDBCol md="5">
                                <MDBView hover>
                                    <button  onClick={() => setMovingType('소형이사')}>
                                    <img
                                        src="https://image.flaticon.com/icons/svg/948/948615.svg"
                                        className="img-fluid"
                                        alt=""
                                    /><h3>소형이사</h3><p>이삿짐이 1톤 이하의 짐</p>
                                    <MDBMask className="flex-center" overlay="red-strong">
                                        <p className="white-text">소형이사</p>
                                    </MDBMask>
                                    </button>
                                </MDBView>
                            </MDBCol>
                        </MDBRow>
                    </Modal.Body>
                </div>
                }
                {(modalPage === 2) &&
                <div><Modal.Header closeButton>
                    <Modal.Title>이사날짜</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <MCalendar/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePage}>다음</Button>
                    </Modal.Footer></div>
                }
                {(modalPage === 3) &&
                <div onClick={onClickShow}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            출발지( 서울 )
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body onClick={handlePage}>

                        <Switch>
                            <a className="list" onClick={() => setShow(false)}>
                                <MDBBtn  onClick={()=>setMovingFrom('강남구')}> 강남구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('강동구')}>강동구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('강북구')}>강북구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('강서구')}>강서구</MDBBtn>
                                <MDBBtn onClick={()=>setMovingFrom('관악구')}>관악구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('광진구')}>광진구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('구로구')}>구로구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('금천구')}>금천구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('노원구')}>노원구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('도봉구')}>도봉구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('동대문구')}>동대문구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('동작구')}>동작구</MDBBtn>
                                <MDBBtn onClick={()=>setMovingFrom('마포구')}>마포구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('서대문구')}>서대문구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('서초구')}>서초구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('성동구')}>성동구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('성북구')}>성북구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('송파구')}>송파구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('양천구')}>양천구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('영등포구')}>영등포구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('용산구')}>용산구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('은평구')}>은평구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('종로구')}>종로구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('중구')}>중구</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingFrom('중랑구')}>중랑구</MDBBtn>
                            </a>
                        </Switch>
                    </Modal.Body>
                </div>
                }
                {(modalPage === 4) &&
                <div onClick={onClickShow}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            도착지
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body onClick={handlePage}>

                        <Switch onClick={submitBtu}>
                            <a className="list" onClick={() => setShow(false)}  >
                                <MDBBtn onClick={()=>setMovingTo('서울')}> 서울</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('경기')}>경기</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('인천')}>인천</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('대전')}>대전</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('광주')}>광주</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('대구')}>대구</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('부산')}>부산</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('울산')}>울산</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('충북')}>충북</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('충남')}>충남</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('전북')}>전북</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('전남')}>전남</MDBBtn>
                                <MDBBtn onClick={()=>setMovingTo('경북')}>경북</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('경남')}>경남</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('강원')}>강원</MDBBtn>
                                <MDBBtn  onClick={()=>setMovingTo('세종')}>세종</MDBBtn>
                            </a>
                        </Switch>

                    </Modal.Body>

                </div>
                }
                {(modalPage === 5) &&
                <div id="wrapper">
                    <div id="page-wrap">
                        <div className="row">
                            <div className="col-lg-12"><br/>
                                <Modal.Header closeButton>
                                    <Modal.Title className="mt-5 text-center">
                                        특수가구 추가비용
                                    </Modal.Title>
                                </Modal.Header>

                            </div>
                            <Modal.Body>
                                <MDBContainer className="mt-5 text-center">
                                    <MDBRow>
                                        <MDBCol>
                                            <MDBJumbotron>
                                                <MDBCardBody>
                                                    <Table >
                                                        <tbody>
                                                        <tr>
                                                            <th>가구</th>
                                                            <th>
                                                                <MDBBtn rounded outline color="warning"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    장농</MDBBtn>
                                                                <MDBBtn rounded outline color="warning"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    침대</MDBBtn>
                                                                <MDBBtn rounded outline color="warning"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    쇼파</MDBBtn>
                                                                <MDBBtn rounded outline color="warning"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    서랍장</MDBBtn>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>전자 제품</th>
                                                            <th>
                                                                <MDBBtn rounded outline color="success"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    냉장고</MDBBtn>
                                                                <MDBBtn rounded outline color="success"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    TV</MDBBtn>
                                                                <MDBBtn rounded outline color="success"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    에어컨</MDBBtn>
                                                                <MDBBtn rounded outline color="success"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    세탁기</MDBBtn>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>기타 용품</th>
                                                            <th>
                                                                <MDBBtn rounded outline color="danger"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    가스레인지</MDBBtn>
                                                                <MDBBtn rounded outline color="danger"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    식기세척기</MDBBtn>
                                                                <MDBBtn rounded outline color="danger"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    헬스기구</MDBBtn>
                                                                <MDBBtn rounded outline color="danger"
                                                                        onClick={() => dispatch({type: 'increment'})}>
                                                                    난방기</MDBBtn>
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>예상 무게</th>
                                                            <th><h3 id="weight">{state.number}</h3>Ton</th>
                                                        </tr>
                                                        <tr>
                                                            <th>추가 금액</th>
                                                            <th><h3
                                                                value={number}
                                                                onChange={e => setNumber(e.target.value)}
                                                            >{state.number * 50}</h3>만원
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                <MDBBtn outline color="danger"
                                                                        onClick={() => dispatch({type: 'initialize'})}
                                                                >
                                                                    초기화</MDBBtn>
                                                            </th>
                                                         <th>
                                                                <MDBBtn outline color="primary"
                                                                        /*onClick={handleSubmit}*/
                                                                        onClick={e=>setMoingThing(state.number * 20)}
                                                                >추가 가구 확정하기
                                                                </MDBBtn>
                                                             <MDBBtn outline color="primary"
                                                                 /*onClick={handleSubmit}*/onClick={handlePage}

                                                             >제출하기
                                                             </MDBBtn>
                                                            </th>
                                                        </tr>
                                                        </tbody>
                                                    </Table>
                                                </MDBCardBody>
                                            </MDBJumbotron>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </Modal.Body>
                        </div>
                    </div>
                </div>
                }
                {(modalPage === 6) &&
                <div><Modal.Header closeButton>
                    <Modal.Title>예상금액</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <h2>
                       이사 타입: {movingType}<br/>
                       출발지: {movingFrom}<br/>
                       도착지: {movingTo}<br/>
                       특수 가구 추가: {movingThing}만원<br/>
                        예상금액: {(movingThing)+ 60}만원 ~ {(movingThing)+ 100}만원
                        </h2>
                        <br/>
                        <br/>
                        <br/>

                        <h5>*예상가격이므로 실제 가격과 다를수 있습니다.<br/>
                            *자세한 상담은 로그인 또는 회원가입 후 견적서를 작성해주세요.</h5>
                        <MDBBtn href={"/login"}>로그인</MDBBtn>
                        <MDBBtn href={"/signup"}>회원가입</MDBBtn>
                    </Modal.Body>
                        </div>
                }

            </Modal>
        </div>
    );
};
export default ModalTest;
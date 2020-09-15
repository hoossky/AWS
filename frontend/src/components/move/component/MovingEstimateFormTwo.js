import React, { useState} from 'react';
import { Modal, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {
    MDBBtn,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBJumbotron,
    MDBCardTitle
} from 'mdbreact'

import SquareLg from "./dragdrop/SquareLg";
import QRcode from "../../../assets/img/QRcode.png";
import "../../../assets/css/calendar.css";
import '../../modalTest/modal.css'
import '../../../assets/css/sb-admin-2.css'
import {Image} from "../../videoUpload";
import SquareA from "./dragdrop/SquareA";
import SquareC from "./dragdrop/SquareC";
import SquareB from "./dragdrop/SquareB";
function MovingEstimateFormTwo() {
const [show, setShow] = useState(false)
const [showA, setShowA] = useState(false)
const [showB, setShowB] = useState(false)
const [showC, setShowC] = useState(false)
const [qrshow, setQrshow] = useState(false)
const [img, setImg] =useState('')

return (
    <>
        <div id="wrapper">
            <div>
                <div className="row">
                    <MDBContainer className="mt-5 text-center">
                        <MDBRow>
                            <MDBCol>
                                <MDBJumbotron>
                                    <MDBCardBody>
                                        <MDBCardTitle className="h2" style={{
                                            textAlign: 'center',
                                            marginButton: '2rem'
                                        }}>{/*가구배치*/}
                                            2단계 내 방 비디오와 원하는 위치 가구배치도 올리기
                                        </MDBCardTitle>
                                            <MDBCard style={{width: "100%", height: "200px"}}>
                                                <MDBCardBody>
                                                    <h3>가구배치도</h3>
                                               <MDBBtn color="amber" onClick={e => setShow(true)}>
                                                        58평
                                                    </MDBBtn>
                                                    <MDBBtn color="amber" onClick={e => setShowA(true)}>
                                                        49평
                                                    </MDBBtn>
                                                    <MDBBtn color="amber" onClick={e => setShowB(true)}>
                                                        34평
                                                    </MDBBtn>
                                                    <MDBBtn color="amber" onClick={e => setShowC(true)}>
                                                        13평
                                                    </MDBBtn>

                                                    <Modal
                                                        show={show}
                                                        onHide={() => setShow(false)}
                                                        dialogClassName='custom-dialog'
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >

                                                        <Modal.Header closeButton>
                                                            <Modal.Title
                                                                id="example-custom-modal-styling-title">
                                                                58평
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <a className="list">
                                                                <SquareLg/>
                                                            </a>
                                                        </Modal.Body>
                                                    </Modal>
                                                    <Modal
                                                    show={showA}
                                                    onHide={() => setShowA(false)}
                                                    dialogClassName='custom-dialog'
                                                    aria-labelledby="example-custom-modal-styling-title"
                                                >

                                                    <Modal.Header closeButton>
                                                        <Modal.Title
                                                            id="example-custom-modal-styling-title">
                                                            49평
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <a className="list">
                                                            <SquareA/>
                                                        </a>
                                                    </Modal.Body>
                                                </Modal>
                                                    <Modal
                                                        show={showB}
                                                        onHide={() => setShowB(false)}
                                                        dialogClassName='custom-dialog'
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >

                                                        <Modal.Header closeButton>
                                                            <Modal.Title
                                                                id="example-custom-modal-styling-title">
                                                              34평
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <a className="list">
                                                                <SquareB/>
                                                            </a>
                                                        </Modal.Body>
                                                    </Modal>
                                                    <Modal
                                                        show={showC}
                                                        onHide={() => setShowC(false)}
                                                        dialogClassName='custom-dialog'
                                                        aria-labelledby="example-custom-modal-styling-title"
                                                    >

                                                        <Modal.Header closeButton>
                                                            <Modal.Title
                                                                id="example-custom-modal-styling-title">
                                                                13평
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <a className="list">
                                                                <SquareC/>
                                                            </a>
                                                        </Modal.Body>
                                                    </Modal>
                                                </MDBCardBody>
                                            </MDBCard>
                                                <br/>
                                                <br/>
                                        <MDBCol>{/*파일업로드*/}
                                            <MDBCard style={{width: "100%", height: "200px"}}>
                                                <MDBCardBody>
                                                    <h3>내 방 비디오 올리기</h3>
                                                            <div id="batchDelete" className="category-table order-table coupon-list-delete"/>
                                                            <Image path={'imgUpload'} setImgLink={(imgLink)=>{setImg(imgLink)}}/>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <br/>
                                        <br/>

                                        <MDBCardTitle className="h2" style={{
                                            textAlign: 'center',
                                            marginButton: '2rem'
                                        }}>
                                            <Button onClick={e => setQrshow(!qrshow)}>
                                                어플다운받기
                                                <Modal show={qrshow} size={"sm"}
                                                       onClick={e => setQrshow(!qrshow)}
                                                       onHide={() => false}>
                                                    <img src={QRcode}/>
                                                </Modal>
                                            </Button>
                                            {sessionStorage.userData && (
                                                <Link to={'/videotest'}><Button type='submit' >
                                                    Submit form
                                                </Button></Link>
                                            )}
                                            {!sessionStorage.userData && (
                                                <Button type="submit" onClick={() => alert("로그인을 해주세요")}>Submit
                                                    form</Button>)}
                                        </MDBCardTitle>
                                    </MDBCardBody>

                                </MDBJumbotron>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>
        </div>
        <div>
            <div style={{textAlign: 'center', marginButton: '2rem'}}>
            </div>
        </div>
    </>
);


}

export default MovingEstimateFormTwo;
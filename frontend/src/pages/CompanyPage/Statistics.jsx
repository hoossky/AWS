import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import '../../assets/css/sb-admin-2.css'
import zscore from '../../assets/img/gau.jpg'

const Charts = () => {


    const [dataList, setDataList] = useState('')

    const lineD = {
        labels: [
            '1월', '2월', '3월', '4월',
            '5월', '6월', '7월', '8월'
        ],
        datasets: [
            {
                label: '월 별 매출',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(139,189,255,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [26479189,
                    26245766,
                    27912212,
                    25948412,
                    24257253,
                    25633730,
                    24894450,
                    25263218,
                ]
            }
        ]

    }

    useEffect(() => {
        axios
            .get(`http://ip/statistics/list`)
            .then(({data}) => {
                setDataList(data.list);
            })
            .catch(err => {
                throw err;
            });
    }, [])

    return (
        <>
            <nav className="sidebar sidebar-offcanvas">
                <ul className="nav">
                    <li className="nav-item nav-category"><h3>주문 관리</h3></li>
                    <li className="nav-item">
                        <a className="nav-link" href="/order">
                            <span className="menu-title">이사 접수 내역</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <span className="menu-title">고객 관리</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="statistics">
                            <span className="menu-title">매출 통계</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/charts">
                            <span className="menu-title">인구통계</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">
                            <span className="menu-title"></span>
                        </a>
                    </li>
                </ul>
            </nav>

            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>가우시안 정규분포도</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={zscore}></img>
                </Modal.Body>
                <Modal.Body>
                    <p>가우시안 정규분포도를 이용하여</p>
                    <p>평균 값을 국내 이사 평균 가격인 47만원</p>
                    <p>표준편차를 30만원으로 대입하여</p>
                    <p>산출한 금액을 하루 2회 주문을 기준으로 하여</p>
                    <p>일 별 매출액을 산정하였습니다.</p>
                </Modal.Body>

            </Modal.Dialog>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="page-header">매출 통계</h2><br/>
                        </div>

                        <div>
                            <div className="panel panel-default">
                                <input type="date"
                                       validate
                                       containerClass='mb-0'
                                />
                                <input type="date"
                                       validate
                                       containerClass='mb-0'
                                />
                            </div>
                        </div>
                        <Line data={lineD}/>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Charts;
import React, {useEffect, useState} from 'react';
import { Line} from 'react-chartjs-2';
import axios from 'axios';
import '../../assets/css/sb-admin-2.css'
const Charts = () => {
    const [dataList, setDataList] = useState('')
    const lineData = {
        labels: ['1월', '2월', '3월', '4월',
            '5월', '6월','7월','8월',
            '9월', '10월','11월','12월'],
        datasets: [
            {
                label: '전출 인구수 (명)',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#2176C1',
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
                data: [667227, 702329, 641449, 587293,
                    569020, 484468, 563622, 565607,
                    1647014, 594081, 565735, 1805598]
            }
        ]
    };
    useEffect(()=> {
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

                </ul>
            </nav>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12"><br/>
                            <h2 className="page-header">19년도 인구 이동 통계</h2><br/>
                            <h5>*출처 통계청(940만명 기준)</h5>
                        </div>
                    </div>
                    <div>
                        <Line data={lineData} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Charts;
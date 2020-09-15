import React, {useEffect, useState} from 'react';
import {SideBar} from "../../commons/index";
import '../../assets/css/sb-admin-2.css'
import {Link,useHistory} from "react-router-dom";
import {MDBBtn} from "mdbreact";
import MaterialTable from "material-table";
import axios from 'axios';
const VideoCommunity = () => {

        const history= useHistory()
        const [myData, setMyData] = useState([]);
        useEffect(() => {
            axios
                .get('http://ip/orders/list')
                .then(({data}) => {
                    setMyData(data.list);
                })
                .catch(error => {
                    throw error;
                });
        }, []);
    const columns=[
        {title: '번호', field: 'orderId'},
        {title: '이름', field: 'movingName'},
        {title: '출발지', field: 'movingFrom'},
        {title: '도착지', field: 'movingTo'},
        {title: '이사종류', field: 'movingType'},
        {title: '평수', field: 'square'},
        {title: '이사 희망일', field: 'movingDate'},
    ]
    return (
        <>
            <SideBar />
            <div style={{padding: '2rem', margin: '0 auto', maxWidth: 1200}}>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <div id='batchDelete' className='transactions'>
                                    <MaterialTable
                                        title='내방 견적 의뢰'
                                        columns={columns}
                                        data={myData}
                                        options={{
                                            search: true,
                                            pageSize: 10,
                                            columnsButton: true,
                                            maxBodyHeight: 700,
                                            grouping: true,
                                        }}
                                        onRowClick={((event, rowData) => {
                                            history.push(`/customerInfo/${rowData.orderId}`)
                                        })}
                                    />
                                </div>
                                {sessionStorage.userData && (
                                    <Link to='/estimate'>
                                        <MDBBtn className='btn blue-gradient'>글쓰기</MDBBtn>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default VideoCommunity;
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {SideBar} from "../../commons";

import '../../assets/css/sb-admin-2.css'
import axios from "axios";
import MaterialTable from "material-table";
import {MDBBtn} from "mdbreact";

const Notice = () => {
    const [noticeList, setNoticeList] = useState([]);
    const history = useHistory()
    useEffect(() => {
        axios
            .get(`http://ip/notices/list`)
            .then(({data}) => {
                setNoticeList(data.list);
            })
            .catch(error => {
                throw error;
            });
    }, []);
    const columns = [
        {title: '제목', field: 'title'},
        {title: '작성자', field: 'writer'},
        {title: '작성일', field: 'regDate'},
    ]
    return (
        <>
            <SideBar/>
            <div id="wrapper">
                <div id="page-wrapper">
                    <div style={{padding: '2rem', margin: '0 auto', maxWidth: 1800}}>
                        <div id='batchDelete' className='transactions'>
                            <MaterialTable
                                title='공지 사항'
                                columns={columns}
                                data={noticeList}
                                options={{
                                    search: true,
                                    pageSize: 10,
                                    columnsButton: true,
                                    maxBodyHeight: 700,
                                    grouping: true,
                                }}
                                onRowClick={((event, rowData) => {
                                    history.push("/noticedetail")
                                })}
                            />
                        </div>
                        <br/>
                        {sessionStorage.userData && (
                            <Link to='/write'>
                                <MDBBtn outline color="primary">글쓰기</MDBBtn>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notice;
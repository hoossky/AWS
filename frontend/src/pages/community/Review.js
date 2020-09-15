import React, {useEffect, useState} from 'react';
import {SideBar} from '../../commons/index';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import MaterialTable from "material-table";
const Review = () => {
    const [articlesList, setArticlesList] = useState([]);
    const history =useHistory()
    useEffect(() => {
        axios
            .get(`http://ip/articles/list`)
            .then(({data}) => {
                setArticlesList(data.list);
            })
            .catch(error => {
                throw error;
            });
    }, []);
    const columns=[
        {title: '번호', field: 'articleId'},
        {title: '제목', field: 'title'},
        {title: '내용', field: 'contents'},
        {title: '작성자', field: 'writer'},
        {title: '작성일', field: 'regDate'},
    ]
    return (
        <>
            <SideBar />
            <div id="page-wrapper">
                <div style={{padding: '2rem', margin: '0 auto', maxWidth: 1800}}>
                    <div id='batchDelete' className='transactions'>
                        <MaterialTable
                            title='리뷰 게시판'
                            columns={columns}
                            data={articlesList}
                            options={{
                                search: true,
                                pageSize: 10,
                                columnsButton: true,
                                maxBodyHeight: 700,
                                grouping: true,
                            }}
                            onRowClick={((event, rowData) => {
                                history.push(`/userInfo/${rowData.articleId}`)
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
        </>
    );
};
export default Review;
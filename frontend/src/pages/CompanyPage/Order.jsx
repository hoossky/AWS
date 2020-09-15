import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import {Link, useHistory} from "react-router-dom";
const Order = () => {
	const history = useHistory()
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
	const columns = [
		{title: '번호', field: 'orderId'},
		{title: '이름', field: 'movingName'},
		{title: '출발지', field: 'movingFrom'},
		{title: '도착지', field: 'movingTo'},
		{title: '이사종류', field: 'movingType'},
		{title: '평수', field: 'square'},
		{title: '이사 희망일', field: 'movingDate'},
	];
	return (
		<>
			<nav className="sidebar sidebar-offcanvas">
				<ul className="nav">
					<li className="nav-item nav-category"><h3>이사 접수</h3></li>
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
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-sm-12'>
								<div className='card'>
									<div className='card-body'>
										<div id='batchDelete' className='transactions'>
											<MaterialTable
												title='이사접수'
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Order;
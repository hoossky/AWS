import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

const AdminMypage = () => {

	const [profitList, setProfitList] = useState('')

	useEffect(() => {
		axios
			.get(`http://ip/statistics/list`)
			.then(({data}) => {
				setProfitList(data.list.slice(0,1));
			})
			.catch(error => {
				throw error;
			});
	}, []);
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
					<section className='page-section' id='services'>
						<div className='container'>
							<div className="row" style={{padding: '0.5rem'}}>
								<div className="col-lg-12"><br/>
									<h2 className="page-header">주문 관리</h2>
								</div>
							</div>
							<div className='col-lg-12 text-center'>
								<h3 className='section-heading'>
									최근 주문 입금 건은</h3>   <h3>원입니다.
							</h3>
							</div>
						</div>
						<div className='row text-center'>
							<div className='col-md-7'>
							<span className='fa-stack fa-4x'>
								<i className='fa fa-circle fa-stack-2x text-primary'></i>
								<i className='fa fa-laptop fa-stack-1x fa-inverse'></i>
							</span>
								<Link to='/order'>
									<h2 className='service-heading'>이사 접수 내역</h2>
								</Link>
							</div>
							<div className='col-md-4'>
							<span className='fa-stack fa-4x'>
								<i className='fa fa-circle fa-stack-2x text-primary'></i>
								<i className='fa fa-user fa-stack-1x fa-inverse'></i>
							</span>
								<Link to='/'>
									<h2 className='service-heading'>고객 관리</h2>
								</Link>
							</div>
						</div>
						<br/>
						<div className='row text-center'>
							<div className='col-md-7'>
									<span className='fa-stack fa-4x'>
										<i className='fa fa-circle fa-stack-2x text-primary'></i>
										<i className='fa fa-align-left fa-stack-1x fa-inverse'></i>
									</span>
								<Link to='/statistics'>
									<h2 className='service-heading'>매출 통계</h2>
								</Link>
							</div>
							<div className='col-md-4'>
									<span className='fa-stack fa-4x'>
										<i className='fa fa-circle fa-stack-2x text-primary'></i>
										<i className='fa fa-envelope-open fa-stack-1x fa-inverse'></i>
									</span>

							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default AdminMypage;
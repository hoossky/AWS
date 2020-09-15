import React, {useState} from 'react';
import {SideBar} from '../../commons';
import '../../assets/css/sb-admin-2.css';
import {Postcode} from '../account';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {MDBCard, MDBCardBody, MDBCol} from "mdbreact";
import {Image} from "../../components/videoUpload";

const Write = () => {
	const [title, setTitle] = useState('');
	const [writer, setWriter] = useState(
		JSON.parse(sessionStorage.userData).userId,
	);
	const [address, setAddress] = useState('');
	const [contents, setContents] = useState('');
	const history = useHistory();

	const newUsedArticle = e => {
		e.preventDefault()
		const review = {
			title: title,
			writer: writer,
			contents: contents,
		};
		if (title === '' || contents === '') {
			alert('입력창을 다채워주세요');
		} else {
			axios
				.post(`http://ip/articles/createReview`, review)
				.then(response => {
					alert('성공');
					console.log(response);
					history.push('/review');
				})
				.catch(error => {
					throw error;
				});
		}
	};
/*	const [upload, setUpload] = useState(null);
	const postApis = (payload) => {

		const orderId = JSON.parse(localStorage.estiDate).orderId
		axios.post(`http://localhost:8080/file/upload/${orderId}/null`, payload, {
			authorization: 'JWT fefege..',
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		})
			.then(res => {
				alert("이미지 업로드 완료")

			})
	}
	const handlePost = () => {
		const formData = new FormData()
		formData.append('file', upload)
		postApis(formData)
	}*/
	const [img, setImg] =useState('')
	return (
		<>
			<SideBar />
			<div id='wrapper'>
				<div id='page-wrapper'>
					<div className='row'>
						<div className='col-lg-12'>
							<br />
							<h2 className='page-header'>커뮤니티</h2>
							<br />
						</div>
					</div>
					<div className='row'>
						<div className='col-lg-12'>
							<div className='panel panel-default'>

								<form method='post'>
									<div className='form-group'>
										<label>제목</label>
										<input
											type='text'
											className='form-control'
											placeholder='제목을 작성해주세요.'
											value={title}
											onChange={e => setTitle(e.target.value)}
										/>
									</div>
									<div className='form-group'>
										<label>작성자</label>
										<input
											type='text'
											className='form-control'
											placeholder='이름을 적어주세요.'
											value={writer}
										/>
									</div>

									<div className='input-group-append'>
										<Postcode onSelectedAddr={setAddress} />
									</div>
									<div className='form-group'>
										<label htmlFor='exampleFormControlTextarea1'>내용</label>
										<textarea
											className='form-control'
											id='exampleFormControlTextarea1'
											name='contents'
											rows={10}
											value={contents}
											onChange={e => setContents(e.target.value)}
										/>
									</div>
									<MDBCol>
										<MDBCard style={{width: "100%", height: "170px"}}>
											<MDBCardBody>
												<h3>리뷰 사진 올리기</h3>
												<Image path={'marketImgUpload'} setImgLink={(imgLink)=>{setImg(imgLink)}}/>
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
									<button
										type='submit'
										className='btn btn-info'
										onClick={newUsedArticle}
									>
										등록하기
									</button>
									<button type='button' className='btn btn-secondary'>
										목록으로
									</button>
								</form>
							</div>
							{/* /.panel-body */}
						</div>
						{/* /.panel */}
					</div>
					{/* /.col-lg-12 */}
				</div>
			</div>
			{/* /#page-wrapper */}
		</>
	);
};
export default Write;
